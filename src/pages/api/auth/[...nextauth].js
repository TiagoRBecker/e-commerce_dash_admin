import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions =  {
  secret: process.env.AUTH_SECRET,
  session:{
    strategy:"jwt"
  },
  
  pages:{
    signIn: "/login",
    
  },
  providers: [
    CredentialsProvider({
      
      name: "Credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
     
      async authorize(credentials, req) {
        if (
          credentials?.email === "teste@gmail.com" &&
          credentials?.password === "12345"
        ) {
          const user = {
            id: "1",
            name: "Tiago",
            email: "teste@gmail.com",
            img:"/user.png"
          };
          return user;
        } else {
          return null;
        }
      },
      
      
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token ;
      return session;
    },
  },
 
 

 
};

export default NextAuth(authOptions)
