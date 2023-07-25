import Link from "next/link";
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Order from "../../../models/Order";
import Layout from "@/components/Layout";
import Center from "@/components/Center";
import styled from "styled-components";
import Spinner from "@/components/Spinner";
import Input from "@/components/Input";
import { mongooseConnect } from "../../../server/mongose";

export const BoxSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  h1{
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
  @media screen and (max-width:720px){
  flex-direction: column;
  .search{
    width: 100%;
  }
  h1{
    width: 100%;
  }
}
`;

export const BoxOrders = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding-top: 1rem;
  min-height: 100vh;
`;
export const Table = styled.table`
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  @media screen and (max-width: 510px) {
    font-size: 0.8rem;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #4caf50;
    color: white;
  }
  .Sucess {
    font-size: 0.9rem;
    color: green;
    text-align: center;
  }
  .Fail {
    font-size: 0.9rem;
    color: red;
    text-align: center;
  }

  .mobile {
    display: none;
    text-align: center;
    border: none;
    margin: 0;
    button {
      background-color: transparent;
      border: none;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
      border-radius: 1px;
      cursor: pointer;
    }
    svg {
      width: 2rem;
      height: 1rem;
    }
    @media screen and (max-width: 610px) {
      display: block;
    }
  }
  .desktop {
    @media screen and (max-width: 610px) {
      display: none;
    }
  }
`;
export const Dados = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: column;
  gap: 0.4rem;
  padding: 15px 0;

  span {
    font-size: 1rem;
    color: green;
  }
`;
export const Colum = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5em;
`;
export const BoxSpinner = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
export default function Orders({ordersClient}) {

  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
   
  }, [search]);
  const filterOrders =ordersClient.filter((order) => order.paid === true);
 
  const searchOrders = async () => {
    await router.push({
      pathname: '/orders', 
      query: { search:search},
    });

    return;
  };

  return (
    <>
    <Head>
      <title>Pedidos</title>
    </Head>
    <Layout>
      <Center>
        <BoxSearch>
          <h1>Pedidos Aprovados</h1>
          <div className="search">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Pesquise por Nome,Marca ou Modelo do produto ..."}
            />
            <button onClick={searchOrders}>Filtrar</button>
          </div>
        </BoxSearch>
        <BoxOrders>
         
          {filterOrders?.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Pagamento</th>
                  <th className="desktop">Cliente</th>
                  <th className="desktop">Items</th>
                  <th className="mobile">Visualizar</th>
                </tr>
              </thead>
              <tbody>
                {filterOrders.map((dados, index) => (
                  <tr key={index}>
                    <td>{new Date(dados.createdAt).toLocaleString()}</td>
                    <td className={dados.paid ? "Sucess" : "Fail"}>
                      <p>{dados.paid ? "Aprovado" : "Negado"}</p>
                    </td>
                    <td className="desktop">
                      <Dados>
                        <p>
                          Nome: <span>{dados.name}</span>
                        </p>
                        <p>
                          Telefone: <span>{dados.phone}</span>
                        </p>
                        <p>
                          E-mail: <span>{dados.email}</span>
                        </p>
                        <p>
                          Rua: <span>{dados.adress}</span> N°:{" "}
                          <span>{dados.numberAdress}</span>
                        </p>
                        <p>
                          Cidade: <span>{dados.city}</span>
                        </p>
                      </Dados>
                    </td>

                    {dados.items.map((item, index) => (
                      <td className="desktop" key={index}>
                        <Colum>
                          {item.price_data?.product_data.name} Qtd:
                          {item.quantity}
                        </Colum>
                      </td>
                    ))}
                    <td className="mobile">
                      <Link href={`orders/${dados._id}`}>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )
          :
          (
            <p>Nenhum ordem de serviço encontrada com a busca!</p>
          )
        
        }
        </BoxOrders>
      </Center>
    </Layout>
    </>
  );
}
export const getServerSideProps = async (context)=>{
  await mongooseConnect()
  const session = await getServerSession(context.req, context.res,authOptions)
  const search = context.query.search || ""
 
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true, // Defina como true se esse redirecionamento deve ser permanente
      },
    };
  }
  let getOrders;

  if (search.trim() !== '') {
   
    getOrders = await  Order.find({ name: { $regex: search || "", $options: "i" } },).sort({createdAt:-1})
  } else {
   
    getOrders = await Order.find().sort({createdAt:-1});
  }


  const ordersClient = await JSON.parse(JSON.stringify(getOrders))
      return{
        props:{
          session,
          ordersClient
        }
      }
    }