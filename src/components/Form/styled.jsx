import styled from "styled-components";
export const BoxProducts = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
export const Form = styled.form`
width: 70%;
height: 100%;
padding: 1rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap: 0.9rem;
background-color: #D8D5DB;
border-radius: 5px;
.inputPrice{
    width: 100%;
    height: 2rem;
    margin-bottom: 0.9rem;
    outline: none;
    padding: 0%.5rem;
    border:  solid 1px #D8D5DB;
    transition:  all ease-in-out 0.3s;
    font-size: 0.9rem;
    border-radius: .3rem;


:focus{
    border: solid 1px #2D3142;
}
}
@media screen and (max-width:580px) {
    width: 100%;
    
}
.error{
    color: red;
    font-size: .8rem;
}
`
export const  InputBoxFiles  = styled.div`
display: flex;

flex-direction: column;

width: 40vw;
@media screen and (max-width:580px) {
    width: 100%;
    
}
.flex{
    display: flex;
    align-items: center;
}
label{
color:#2D3142;
font-size: 1.6rem;
padding: .2rem 0;
}
.input-img{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.3rem;
   
   
}
.box-img{
    width: 100px;
    height: 100px;
    padding: .5rem;
   background-color: white;
   border-radius: 5px;
   box-shadow: 1px 1px 1px 1px rgba(0,0,0,0,0.6);
   display: flex;
   align-items: center;
   justify-content: center;
}
.box-img img{
    max-width: 100%;
    height: 100%;
     object-fit: contain;
   
}
.upload{
    cursor: pointer;
    
   
}
.upload svg{
    width: 5rem;
    height: 5rem;
   
}
.delete{
    background-color: red;
    border: none;
    
}
.delete svg{
    cursor: pointer;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
   
}
`

export const InputBox = styled.div`
display: flex;
flex-direction: column;
width: 100%;
@media screen and (max-width:580px) {
    width: 100%;
    
}


label{
color:#2D3142;
font-size: 1.1rem;
}
select{
    width: 100%;
    height:2rem ;
    outline: none;
    border: none;
    padding: 0%.5rem;
    font-size: 0.9rem;
    border:  solid 1px #D8D5DB;
    color: gray;
    margin-bottom: 15px;
}
textarea{
    resize: none;
    width: 100%;
    height: 150px;
    outline: none;
    padding: 0%.5rem;
    border:  solid 1px #D8D5DB;
    transition:  all ease-in-out 0.3s;
    border-radius: .3rem;
    padding: .5rem;
    font-size: .9rem;
}



.submit{
    background-color:#2D3142 ;
    color:#D8D5DB ;
    border: solid 1px #D8D5DB;
    transition: all ease-in-out 0.9s;
    outline: none;
    cursor: pointer;
}
.submit:hover{
    background-color:#D8D5DB;
    color: #2D3142;
    border: solid 1px #2D3142;
}


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