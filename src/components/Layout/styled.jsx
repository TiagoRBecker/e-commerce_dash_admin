import styled from "styled-components";

export const Laytou = styled.div`
display: flex;
width: 100%;
height: 100vh;




`
export const Box = styled.div`
display: flex;
  background-color: #2D3142;
  min-height: 100vh;
  
`
export const Main = styled.main`

 width: 100%;
 height: calc(100vh );
 overflow-y: scroll;
 height: 100%;
 
 
`
export const Hamburguer = styled.div`

display: none;









@media screen and (max-width:860px) {
    display: flex;
    padding: 1rem 0;
}
button{
  display: flex;
  align-items: center;
  border-radius: 3px;
  gap: .1rem;
  outline: none;
  border: none;
 
  top: 15px;
left:10px;
z-index: 1001;
position: absolute;



 
  
}
 .active{
  color: white;
  background-color: #2D3142;
}
.inactive{
  color: #2D3142;
  background-color:#fff;
}

button svg{
  background-color: #2D3142;
  width: 1.4rem;
  color: #fff;
  border-radius:2px;
}
`
 