import Layout from "@/components/Layout";
import styled from "styled-components";
export const Box  = styled.div`
width: 100%;
height: 100vh;
display: flex;
align-items:center;
justify-content: center;
h1{
    color: #333;
    font-size: 2rem;
}
`
    

const Error500 = () => {
    return ( <>
    
    <Layout>
        <Box>

        <h1> Erro no servidor!Tente novamente mais tarde.</h1>
        </Box>
    </Layout>
    </> );
}
 
export default Error500;