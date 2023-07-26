import Layout from "@/components/Layout";
import { Category } from "../../../models/Category";
import { mongooseConnect } from "../../../server/mongose";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter} from "next/router"
import Center from "@/components/Center";
import Swal from "sweetalert2";
import Api from "../../../utils/api";
import styled from "styled-components";
export const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;
export const BoxProperties = styled.div`
  width: 100%;
  text-align: left;
`;
export const Properties = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap:wrap;
  gap: 1rem;
  p {
    text-transform: uppercase;
    border: solid 1px #333;
    padding: 0.5rem;
    border-radius: 3px;
    font-size: 1rem;
    background-color: #ccc;
  }
`;
export const BoxActions = styled.div`
 button svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
  }
 .delet {
    padding: 4px 8px;
    background-color: #f00;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: all ease-in-out 0.9s;
  }
`;

const Id = ({ category }) => {
    const router = useRouter()
    const handleDelete = async (category) => {
        const del = await Swal.fire({
          title: "Tem certeza?",
          text: `Você quer deletar ${category?.name}?`,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Deletar",
          confirmButtonColor: "#d55",
        });
        if (del.isConfirmed) {
          try {
            //deleta a categoria e apos exibe  um modal Categoria deletada com sucesso!
            const delCategories = await Api.deleteCategory(category._id);
            await Swal.fire(
              "Categoria deletada com sucesso!!",
              "Clica no botão para continuar!",
              "success"
            );
  
            router.push('/categories')
          } catch (error) {
            //Exibe o modal de erro caso exista um
            await Swal.fire(
              "Erro ao deletar a categoria!",
              "Clica no botão para continuar!",
              "error"
            );
          }
        }
      };
  return (
    <Layout>
      <Center>
        <Box>
          <Title>{category.name}</Title>
          {category.properties.map((property, index) => (
            <BoxProperties key={index}>
              <Title>{property.name}</Title>
              <Properties>
                {property.values.map((value, index) => (
                  <p>{value}</p>
                ))}
              </Properties>
            </BoxProperties>
          ))}
          <BoxActions>
            <button
              className="delet"
              onClick={() => handleDelete(category)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </BoxActions>
        </Box>
      </Center>
    </Layout>
  );
};

export default Id;

export const getServerSideProps = async (context) => {
  await mongooseConnect();
  const session = await getServerSession(context.req, context.res, authOptions);
  const id = context.query.id;
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true, // Defina como true se esse redirecionamento deve ser permanente
      },
    };
  }
  const getCategory = await Category.findById({ _id: id });
  const category = await JSON.parse(JSON.stringify(getCategory));

  return {
    props: {
      session,
      category,
    },
  };
};
