import { mongooseConnect } from "../../../server/mongose";
import Order from "../../../models/Order";
import styled from "styled-components";
import Center from "@/components/Center";
import Head from "next/head";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
export const Box = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: blue;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .details {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  p {
    background-color: red;
    width: 100%;
  }
`;
const OrderId = ({ details }) => {
  return (
    <>
      <Head>
        <title>Pedidos</title>
      </Head>
      <Center>
        <Box>
          <h1>Detalhes</h1>
          <div>
            <span>Data</span>
            <p>{new Date(details.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <span>Pagamento</span>
            <p>{details.paid ? "Aprovado" : "Negado"}</p>
          </div>
          <div>
            <span>Dados</span>
            <div className="details">
              <p>{details.name}</p>
              <p>{details.email}</p>
              <p>{details.adress}</p>
              <p>{details.city}</p>
              <p>{details.phone}</p>
            </div>
          </div>
        </Box>
      </Center>
    </>
  );
};

export default OrderId;
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const session = await getServerSession(context.req,context.res, authOptions);

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
