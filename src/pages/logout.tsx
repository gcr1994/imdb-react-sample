import useStore from "@/utils/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Logout = () => {
  const store = useStore();
  const router = useRouter();

  useEffect(() => {
    store.setToken(null);
    store.setUser(null);
    store.setPlaylists(null);
    router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default Logout;
