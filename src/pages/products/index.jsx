import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { Laytou } from "@/components/Layout/styled";
import { Product } from "../../../models/Product";
import Layout from "@/components/Layout";
import Swal from "sweetalert2";
import styled from "styled-components";
import Center from "@/components/Center";
import Api from "../../../utils/api";
import Input from "@/components/Input/index";
import Table from "@/components/Table";
import Spinner from "@/components/Spinner";
import { mongooseConnect } from "../../../server/mongose";

export const BoxSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  h1 {
    color: #333;
    font-size: 2rem;
    width: 50%;
    text-align: left;
  }
  .search {
    width: 50%;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    button {
      cursor: pointer;
      outline: none;
      background-color: #2d3142;
      color: #fff;
      border: none;
      padding: 0.4rem 2rem;
    }
  }
  @media screen and (max-width: 720px) {
    flex-direction: column;
    .search {
      width: 100%;
    }
    h1 {
      width: 100%;
    }
  }
`;

export const Box = styled.section`
  padding-top: 1rem;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const BoxPagination = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.6rem;
  button {
    width: 1.4rem;
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .active {
    border: solid 1px #4544;
    background-color: #ccc;
  }
`;
export const BoxSpinner = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const BoxError = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    color: #333;
    font-size: 2rem;
  }
`;
export default function products({ products }) {
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(5);
  const [active, setActive] = useState(0);
  const [ loading ,setLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {}, [search, active]);

  // Classe para as funcçoes do produto , exibir , deletar , paginção
  class HandlerProProducts {
    //exibe os produtos via paginaçao
    static handleProducts = async (active) => {
      setLoading(true)
      await router.push({
        pathname: "/products",
        query: { pg: active },
      });
      setLoading(false)
    };
    // localiza os produtos cadastrados
    static searchProducts = async () => {
      await router.push({
        pathname: "/products",
        query: { search: search },
      });
    };
    //deleta o produto pelo id , exibe o modal para sucesso e erro ao deletar
    static handleDelete = async (product) => {
      const del = await Swal.fire({
        title: "Tem certeza?",
        text: `Você quer deletar ${product?.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Deletar",
        confirmButtonColor: "#d55",
      });
      if (del.isConfirmed) {
        try {
          const delProduct = await Api.deleteProduct(product._id);
          await Swal.fire(
            "Produto apagado com sucesso!",
            "Clica no botão para continuar!",
            "success"
          );
          
          await router.push({
            pathname: router.pathname,
          });
        } catch (error) {
          await Swal.fire(
            "Erro ao apagar o produto!",
            "Clica no botão para continuar!",
            "error"
          );
        }
      }
    };
  }

 

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <Layout>
        <Center>
          <BoxSearch>
            <h1>Produtos Cadastrados</h1>
            <div className="search">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Pesquise por Nome,Marca ou Modelo do produto ..."}
              />
              <button onClick={HandlerProProducts.searchProducts}>
                Filtrar
              </button>
            </div>
          </BoxSearch>

          <Box>
            {loading && 
              <BoxSpinner>
                <Spinner/>
              </BoxSpinner>}
            {products.length >= 0 && (
              <>
                <Table
                  products={products}
                  handleDelete={HandlerProProducts.handleDelete}
                />

                <BoxPagination>
                  {Array(total)
                    .fill(0)
                    .map((value, index) => (
                      <button
                        key={index}
                        onClick={() => HandlerProProducts.handleProducts(index)}
                        className={index === active ? "active" : ""}
                      >
                        {index + 1}
                      </button>
                    ))}
                </BoxPagination>
              </>
            )}
          </Box>
        </Center>
      </Layout>
    </>
  );
}
export const getServerSideProps = async (context) => {
  await mongooseConnect();
  const session = await getServerSession(context.req, context.res, authOptions);
  const pg = context.query.pg || 1;
  const search = context.query.search;
  const limit = 7;
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true, // Defina como true se esse redirecionamento deve ser permanente
      },
    };
  }

  let getProdutcs;
  if (pg) {
    getProdutcs = await Product.find()
      .skip(pg * limit)
      .limit(limit);
  } else {
    getProdutcs = await Product.find({
      $or: [
        { name: { $regex: search || "", $options: "i" } },
        { brand: { $regex: search || "", $options: "i" } },
      ],
    });
  }
  const products = await JSON.parse(JSON.stringify(getProdutcs));

  return {
    props: {
      session,
      products,
    },
  };
};
