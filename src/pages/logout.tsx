import useStore from "@/utils/store";
import { useEffect } from "react";

export const Logout = () => {
  const store = useStore();

  useEffect(() => {
    store.setToken(null);
    store.setUser(null);
    window.location.href = "/movies";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default Logout;
