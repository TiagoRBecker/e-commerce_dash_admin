import Head from "next/head"
import Center from "@/components/Center";
import Layout from "@/components/Layout";
import Form from "@/components/Form/index";
import styled from "styled-components";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { mongooseConnect } from "../../../../server/mongose";
import { Category } from "../../../../models/Category";
export const Title = styled.h1`
text-align: center;
padding: 1rem  0;
color: #333;
`
const AddNewProduct = () => {
  return (
    <>
    <Head>
      <title>Adicionar Produ..</title>
    </Head>
    <Layout>
      <Center>
        <Title>Adicionar novo produto</Title>
        <Form 
        titleC={"Adicionar Novo Produto"} 
        BtnText={"Cadastrar"} 
        
         />
      </Center>
    </Layout>
  </>
  );
};

export default AddNewProduct;
export const getServerSideProps  = async (context)=>{
  await mongooseConnect()
  const session = await getServerSession(context.req,context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true, // Defina como true se esse redirecionamento deve ser permanente
      },
    };
  }
  const getCategory = await Category.find()
  const categories = await JSON.parse(JSON.stringify(getCategory))
  return{
    props:{
      session,
      categories
    }
  }

}