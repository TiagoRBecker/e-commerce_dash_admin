import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import styled from "styled-components";
import { signIn ,useSession} from "next-auth/react";
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
const Login = () => {
const router = useRouter();

  const [showError, setError] = useState({});
  const [errorCredential, setErrorCredential] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const schema = z.object({
    email: z.string().email({message:"Insira um e-mail válido"}).min(1, { message: "Necessário preencher campo e-mail" }),
    password: z
      .string()
      .min(1, { message: "Necessário preencher campo password" }),
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    setError({});
    setErrorCredential(false);
   
    try {
      const validateSchema = await schema.parse(values);
      const login = await signIn("credentials", { redirect: false, email:values.email ,password:values.password });
  
     if (login && login.ok) {
       router.push('/')
      } else {
        setErrorCredential(true);
      }
    } catch (error) {
      const fieldErrors = error.formErrors?.fieldErrors;
      setError(fieldErrors);
    
    }
  };
  return (
    <Box>
      <Title>
        <h1>Bem Vindo ao TecWish</h1>
      </Title>

      <Form onSubmit={handleLogin}>
        <div className="input-box">
          <label htmlFor="">E-mail</label>
          <input
            type="text"
            placeholder="Digite seu e-mail"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          {showError?.email && <p className="error">{showError.email}</p>}
        </div>
        <div className="input-box">
          <label htmlFor="">Senha</label>
          <input
            type="password"
            placeholder="Digite seu senha"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          {showError?.password && <p className="error">{showError.password}</p>}
        </div>
        {errorCredential && <p className="error">E-mail ou senha inválidos!</p>}
        <input type="submit" className="submit" value={"ENTRAR"} />
      </Form>
    </Box>
  );
};

export default Login;
