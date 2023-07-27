import { mongooseConnect } from "../../../server/mongose";
import Order from "../../../models/Order";
import styled from "styled-components";
import Center from "@/components/Center";
import Head from "next/head";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import Layout from "@/components/Layout";
export const Box = styled.div`
  width: 100%;
   h1{
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
   }
  div {
   
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    p {
      margin-bottom: 1rem;
      color: #333;
      font-size: 1.1rem;
      text-transform: capitalize;
    }
  }

  .name {
    width: 30%;
  }
  .value {
    width: 70%;
  }
`;
export const BoxBtn = styled.div`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 100px;
    height: 25px;
    border-radius: 4px;
    border: 1px solid #333;
    background-color: #ccc;
  }
`;
const OrderId = ({ details }) => {
  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>
      <Layout>
      <Center>
        <Box>
          <h1>Detalhes do Pedido</h1>
          <div>
            <p className="name">Data</p>
            <p className="value">
              {new Date(details.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="name">Pagamento</p>
            <p className="value">{details.paid ? "Aprovado" : "Negado"}</p>
          </div>

          <div>
            <p className="name">Nome</p>
            <p className="value">{details.name}</p>
          </div>
          <div>
            <p className="name">E-mail</p>
            <p className="value">{details.email}</p>
          </div>
          <div>
            <p className="name">Cidade</p>
            <p className="value">{details.city}</p>
          </div>
          <div>
            <p className="name">Endereço</p>
            <p className="value">{details.adress}</p>
          </div>

          <div>
            <p className="name">Telefone</p>
            <p className="value">{details.phone}</p>
          </div>
        </Box>
        <BoxBtn>
          <Link href={"/orders"}>
            <button>Voltar</button>
          </Link>
        </BoxBtn>
      </Center>
      </Layout>
    </>
  );
};

export default OrderId;
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const session = await getServerSession(context.req, context.res, authOptions);

  const orderDetails = await Order.findById(id);
  const details = await JSON.parse(JSON.stringify(orderDetails));
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true, // Defina como true se esse redirecionamento deve ser permanente
      },
    };
  }

  return {
    props: {
      details,
      session,
    },
  };
}
