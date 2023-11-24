import Loader from "@/components/Loader";
import "@/styles/globals.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
export const ContextApi = createContext();
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const data = Cookies.get("authUserData");
  const userData = data ? JSON.parse(data) : false;
  const [isLoading, setisLoading] = useState(false);

  const getRoutes = () => {
    if (
      userData &&
      (router.pathname == "/auth/login" || router.pathname == "/auth/register")
    ) {
      setisLoading(true);
      router.push("/");
    } else {
      return;
    }
  };
  useEffect(() => {
    getRoutes();
  }, []);
  useEffect(() => {
    getRoutes();
  }, [userData, router.pathname, isLoading]);
  setTimeout(() => {
    setisLoading(false);
  }, 2000);
  return (
    <ContextApi.Provider value={{ isLoading, setisLoading }}>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </ContextApi.Provider>
  );
}
