import styled from "styled-components";

export const MenuDesk = styled.aside`
width: 100%;
max-width: 290px;
background-color: #2D3142;
padding:  0 1rem;
@media screen and (max-width:860px) {
    display: none;
}


.logo{
    display: flex;
    gap: 1.6rem;
    margin: 2rem 0;
    align-items: center;
    
}
nav{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    
    
    .logout {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: .2rem 1rem;
    border-radius: .3rem;
    background-color: #2D3142;
    border: none;
    outline: none;
    cursor: pointer;
    font-size:1rem;
    color: white;
    }
    
    .logout svg{
    width: 2rem;
    height: 2rem;
    color: white;
}

}
a{
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: .2rem 1rem;
    border-radius: .3rem;
    
}
a svg{
    width: 2rem;
    height: 2rem;
    color: white;
}
.active{
    width: 100%;
    background-color: #ADACB5;
    
}
.inactive{
    background-color: none;
}


`
export const Title = styled.h3`
font-size:.9rem;
color: white;
width: 100%;

`
export const MenuMobile = styled.div`

display: none;
;

@media screen and (max-width:860px) {
    display: block;
   
    
}
.open{
width: 100%;
height: 100%;
color: white;
padding: 2rem;
display: flex;
flex-direction: column;
background-color: #2D3142;
position: fixed;
top: 0;
bottom: 0;
transform: translateX(-100%);
transition: all ease-in-out 1s;

}
.closed{
width: 100%;

color: white;
padding: 2rem;
display: flex;
flex-direction: column;
background-color: #2D3142;
position: fixed;
top: 0;
bottom: 0;
transform: translateX(0px);
transition: all ease-in-out 1s;

height: 100%;
}
.logo{
    display: flex;
    gap: 1.6rem;
    margin: 2rem 0;
    align-items: center;
    
}
nav{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding-top: 2rem;
    
    .logout {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: .2rem 1rem;
    border-radius: .3rem;
    background-color: #2D3142;
    border: none;
    outline: none;
    cursor: pointer;
    font-size:1rem;
    color: white;
    }
    
    .logout svg{
    width: 2rem;
    height: 2rem;
    color: white;
}

}
a{
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: .2rem 1rem;
    border-radius: .3rem;
    
}
a svg{
    width: 2rem;
    height: 2rem;
    color: white;
}
.active{
    width: 100%;
    background-color: #ADACB5;
    
}
.inactive{
    background-color: none;
}

`