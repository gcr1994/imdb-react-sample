import useStore from "@/utils/store";

export const Logout = () => {
  const store = useStore();
  store.setToken(null);
  store.setUser(null);
  window.location.href = "/";
  return <></>;
};
