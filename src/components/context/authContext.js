import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const router = useRouter();

  const handleLogin = async (provider) => {
    await signIn(provider,{redirect:false});
    router.push('/')
   
  };

  const handleLogout = async () => {
      
      await signOut({callbackUrl:"/login"})
      return 
      
     
    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
