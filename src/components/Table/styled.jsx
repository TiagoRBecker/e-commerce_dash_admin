import styled from "styled-components";

export const Table = styled.table`
width: 100%;
padding: 1rem 0;

.mobile{
  

  @media screen and (max-width:615px) {
    display: none;
   
    
  }
}
`
    
export const Thead = styled.thead`
background-color: #2d3142;
text-align: left;
color: #fff;
font-size: 1.5rem;
`
export const Tbody = styled.tbody`
td{
    width:30%;
    padding: .4rem 0;
    border-bottom: 1px solid #ccc;
    p{
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size:1.2rem;
    }
   
}

`

export const BoxButtons = styled.div`
display: flex;
gap: 1rem;
 button svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
  }
  .edit {
    padding: 4px 6px;
    background-color: #2d3142;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: all ease-in-out 0.9s;
  }
   .delet {
    padding: 4px 6px;
    background-color: #f00;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: all ease-in-out 0.9s;
  }
  .edit:hover {
    background-color: #adacb5;
  }
  .delet:hover {
    background-color: #a30000;
  }
`
export const Button = styled.button`
  margin-top: 2rem;
  width: 10rem;
  padding: 0.6rem 0;
  background-color: #2d3142;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.8rem;
  color: #ccc;
  border-radius: 4px;
`;
export const teste = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 580px) {
    padding: 0 0.8rem;
  }
  .mobile {
    @media screen and (max-width: 435px) {
      display: none;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    @media screen and (max-width: 580px) {
      font-size: 0.8rem;
    }
  }
  .description-cell {
    max-width: 200px; /* Define a largura máxima da célula de descrição */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 580px) {
      max-width: 130px;
    }
  }
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    color: #555;
  }

  .actions {
    display: flex;
    justify-content: space-around;
  }
  a svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
  }
  button svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
  }



  
`;
