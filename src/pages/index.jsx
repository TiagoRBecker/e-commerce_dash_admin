import Head from "next/head"
import { useSession } from "next-auth/react";
import { mongooseConnect } from "../../server/mongose";
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import Order from "../../models/Order";
import styled from "styled-components";
import Center from "@/components/Center";
import  { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"

export const BoxPerfil = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .perfil-name {
    text-transform: capitalize;
  }
  .mobile {
    @media screen and (max-width: 510px) {
      display: none;
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  span {
    color: #000;
    display: flex;
    font-size: 1.1rem;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
`;
export const BoxTable = styled.div`
  width: 100%;
  .sucess {
    color: green;
    font-size: 0.9rem;
  }
  .fail {
    color: red;
    font-size: 0.9rem;
  }
  h1 {
    padding: 2rem 0;
    color: #000;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    color: #000;
    font-size: 1rem;
  }

  th {
    background-color: #f2f2f2;
    color: #555;
  }
  .mobile {
    @media screen and (max-width: 510px) {
      display: none;
    }
  }
`;
export const Box = styled.div`
  background-color: #2d3142;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const Title = styled.div`
  color: #fff;
  margin-bottom: 0.9rem;
`;
export const Form = styled.form`
  border-radius: 5px;
  background-color: #adacb5;
  width: 400px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 1rem;
  .input-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    gap: 0.5rem;
    input {
      width: 100%;
      height: 2rem;
      border-radius: 5px;
      border: solid 1px #ccc;
      padding-left: 8px;
      outline: none;
      transition: all ease-in-out 0.7s;
      &:focus {
        border: solid 1px #333;
      }
    }
  }
  .error {
    color: red;
    font-size: 1rem;
  }
  .submit {
    width: 200px;
    height: 2rem;
    border-radius: 5px;
    background-color: #2d3142;
    border: none;
    color: #fff;
    cursor: pointer;
  }
`;
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.2rem;
  button {
    width: 10rem;
    padding: 0 0.6rem;
    border: none;
    cursor: pointer;
    background-color: #2d3142;
    border-radius: 5px;
    text-transform: uppercase;
    color: #fff;
    transition: all ease-in-out 0.8s;
    border: 1px solid #adacb5;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .google {
    background-color: #fff;
    color: gray;
  }
  .facebook {
    background-color: #3b5998;
    color: #fff;
  }
  img {
    max-width: 100%;
    height: 1.7rem;
  }
`;
export const Loading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Dashbord({ order }) {
  const option = { hour: "numeric", minute: "numeric", second: "numeric" };
  const { status, data: session } = useSession();
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
      {status === "authenticated" && (
        <Layout>
          <Center>
            <BoxPerfil>
              <div className="mobile">
                <h1 className="perfil-name">
                  Bem vindo! {session?.user?.name}{" "}
                </h1>
              </div>

              <div>
                <img src={session?.user.img} alt="Perfil" />
                <span className="perfil-name"> {session?.user?.name}</span>
              </div>
            </BoxPerfil>

            <BoxTable>
              <h1>Últimos Pedidos Adicionados</h1>
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th className="mobile">E-mail</th>
                    <th>Nome</th>
                    <th>Pagamento</th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString(
                          "pt-br",
                          option
                        )}
                      </td>
                      <td className="mobile">{item.email}</td>
                      <td>{item.name}</td>
                      <td className={item.paid ? "sucess" : "fail"}>
                        {item.paid ? "Aprovado" : "Não Aprovado"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </BoxTable>
          </Center>
        </Layout>
      )}
      {status === "loading" && (
        <Loading>
          <Spinner />
        </Loading>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const orders = await Order.find({}, null, { sort: { _id: -1 }, limit: 8 });
  const order = await JSON.parse(JSON.stringify(orders));
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true, // Defina como true se esse redirecionamento deve ser permanente
      },
    };
  }

  return {
    props: {
      order,
    },
  };
}

