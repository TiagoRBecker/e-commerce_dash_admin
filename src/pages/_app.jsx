import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/components/context/authContext";
import "@/styles/globals.css";
import { useSession } from "next-auth/react"


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}


