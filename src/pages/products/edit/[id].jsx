import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Form from "@/components/Form/index";
import Layout from "@/components/Layout";
import Center from "@/components/Center";
import Api from "../../../../utils/api";
import styled from "styled-components";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { Product } from "../../../../models/Product";
import { mongooseConnect } from "../../../../server/mongose";
export const Title = styled.h1`
text-align: center;
padding: 1rem  0;
color: #333;
`

const Edit = ({product}) => {
  



  return (
    <>
    <Head>
      <title>Editar Produ..</title>
    </Head>
    <Layout>
      <Center>
         <Title>Editar Produto</Title>
       
       {product && (
        <Form {...product} />
      )}
    
      </Center>
    </Layout>
    </>
  );
};

export default Edit;

export const getServerSideProps  = async (context)=>{
  await mongooseConnect();
  const id = context.query.id

  const session = await getServerSession(context.req,context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true, 
      },
    };
  }

  const productId =  await  Product.findById({_id:id})
  const product = await JSON.parse(JSON.stringify(productId))
 
  return{
    props:{
      session,
      product
    }
  }

}