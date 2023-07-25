import Head from "next/head"
import Layout from "@/components/Layout";
import styled from "styled-components";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
export const BoxConfig = styled.section`
 display: flex;
 justify-content: center;
 min-height: 100vh;
 padding: 3rem  3rem;
`
export default  function config (){

    return(
        <>
        <Head>
        <title>Config...</title>    
        </Head>
        <Layout>
            <BoxConfig>
             Página usada para adiconar funcionarios para manipular a dashboard em breve!
            
            </BoxConfig>
        </Layout>
        </>
    )
}
export async function getServerSideProps(context) {
 
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
        session,
      },
    };
  }
  