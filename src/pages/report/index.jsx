import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import { mongooseConnect } from "../../../server/mongose";
import Order from "../../../models/Order";
import Chart from "@/components/Chart";
import Center from "@/components/Center";
import styled from "styled-components";
import Api from "../../../utils/api";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export const Title = styled.h1`
  width: 100%;
`;
export const BoxHome = styled.section`
  display: flex;
  align-items: center;
  min-height: 100vh;

  flex-direction: column;

  color: #ffffff;
`;

export const BoxRelatorio = styled.div`
  padding: 2rem 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
  align-items: center;
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
export const Box = styled.div`
  width: 100%;
  max-width: 290px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffff;
  padding: 0.8rem 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 2px 5px rgba(0, 0, 0, 0.1);
  h3 {
    font-size: 1rem;
    color: #000;
  }
  div {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      color: #000;
      font-size: 1.1rem;
      font-weight: 700;
    }
  }
`;
export const BoxChart = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 100%;

  gap: 1rem;
  @media screen and (max-width: 940px) {
    grid-template-columns: 1fr;
  }

  h1 {
    color: #000;
  }
  div {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

export default function Home({ order, resOrder }) {
  const [daySales, setDaySales] = useState(null);
  const [monthsales, setMonthSales] = useState(null);
  const [yearSales, setYearSales] = useState(null);
  const [loading, setLoading] = useState(true);
  // Monta o compentente e exibe as vendas diarias , mensal, anual
  useEffect(() => {
    getSalesDay();
    getSalesMonth();
    getSalesYear();
  }, []);

  const notAproved = resOrder.filter((item) => item.paid === false); // filtra os nao aprovados
  const aproved = resOrder.filter((item) => item.paid === true); // filtra os aprovados
  const date = new Date();
  const currentYear = date.getFullYear(); // exibe o ano atual das ordens de pedidos
  //retorna as vendas diarias
  const getSalesDay = async () => {
    const day = await Api.getSalesDay();
    setDaySales(day.total);
    setLoading(false);
    return;
  };
  //vendas mensal
  const getSalesMonth = async () => {
    const day = await Api.getSalesMonth();
    setMonthSales(day.total);
    setLoading(false);
    return;
  };
  //vendas anual
  const getSalesYear = async () => {
    const day = await Api.getSalesYear();
    setYearSales(day.total);
    setLoading(false);
    return;
  };
  return (
    <>
      <Head>
        <title>Relátorio</title>
      </Head>
      <Layout>
        <Center>
          <Title>Relatório de Vendas</Title>
          <BoxHome>
            <BoxRelatorio>
              <Box>
                <h3>Diárias</h3>

                <div>
                  {daySales !== null ? (
                    <p>
                      {daySales.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </Box>
              <Box>
                <h3>Mensal</h3>

                <div>
                  {monthsales !== null ? (
                    <p>
                      {monthsales.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </Box>
              <Box>
                <h3>Anual</h3>

                <div>
                  {yearSales !== null ? (
                    <p>
                      {yearSales.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </Box>
            </BoxRelatorio>
            <BoxChart>
              <div>
                <h1>Relatório Ordens de Pedidos</h1>
                <span>Mes: {new Date().toLocaleDateString("pt-br")}</span>
                <Chart
                  day={aproved.length}
                  month={notAproved.length}
                  sales={order.length}
                  name_1={"Aprovadas"}
                  name_2={"Negadas"}
                  name_3={"Total"}
                  title={"Total de Pedidos"}
                  bg_1={"rgb(0,128,0)"}
                  bg_2={"rgb(255,0,0)"}
                  bg_3={"rgba(54, 162, 235, 0.8)"}
                />
              </div>
              <div>
                <h1>Relatório Vendas</h1>
                <span>Ano: {currentYear}</span>
                <Chart
                  name_1={"Diaria"}
                  name_2={"Mensal"}
                  name_3={"Anual"}
                  day={daySales}
                  month={monthsales}
                  sales={yearSales}
                  title={"Vendas"}
                  bg_1={"rgb(255, 99, 132)"}
                  bg_2={"rgb(54, 162, 235)"}
                  bg_3={"rgb(255, 205, 86)"}
                />
              </div>
            </BoxChart>
          </BoxHome>
        </Center>
      </Layout>
    </>
  );
}

// verifica se o usuario tem sessao para acessar a pagina caso  nao tenha retorna para login
//pega as ordens de pedidos para a  manter o mais atualizado
export async function getServerSideProps(context) {
  await mongooseConnect();
  const session = await getServerSession(context.req, context.res, authOptions);
  const orders = await Order.find({}, null, { sort: { _id: -1 }, limit: 5 });
  const order = await JSON.parse(JSON.stringify(orders));
  const getOrders = await Order.find({});
  const resOrder = await JSON.parse(JSON.stringify(getOrders));
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
      order,
      resOrder,
    },
  };
}
