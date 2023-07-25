import styled from "styled-components";

export const Box = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
export const Label = styled.label`
color:#2D3142;
font-size: 1.1rem;
`
export const Input = styled.input`
   width: 100%;
    height: 2rem;
    outline: none;
    padding: 0%.5rem;
    border:  solid 1px #D8D5DB;
    transition:  all ease-in-out 0.3s;
    font-size: 0.9rem;
    border-radius: .3rem;
   


:focus{
    border: solid 1px #2D3142;
}
`