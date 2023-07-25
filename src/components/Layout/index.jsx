
import Navigation from "../../components/navigation/index.jsx";
import * as L from "./styled.jsx";
import { useState } from "react";


const Layout = ({ children }) => {
  
  const [show, setShow] = useState(false);
  const handleCLoseMenu = () => {
    setShow(false)
  };
  const handleOpenMenu = ()=>{
   setShow(!show)
  }
 
  return (
    <L.Laytou>
      <Navigation show={show}  closedMenu={handleCLoseMenu}/>

      <L.Main>
        <L.Hamburguer onClick={handleOpenMenu} >
        <button  className={show?"active":"inactive"}  >
          
            
            
          
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          
        
        
          </button>
        </L.Hamburguer>

        {children}
      </L.Main>
      
    </L.Laytou>
  );
};

export default Layout;
