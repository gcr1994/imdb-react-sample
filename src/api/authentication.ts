import { FieldValues } from "react-hook-form";
import axios from "axios";
import { User } from "@/types/user";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_AUTH_URL });

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Caught a 401");
      // window.location.href = "/logout";
    }
    // return Promise.reject(error);
  }
);

export const login = async (
  data: FieldValues
): Promise<{ token: string; body: User }> => {
  const res = instance.post("/login", {
    email: data.email,
    password: data.password,
  });

  const result = await res;
  console.log(result);
  console.log(result.data);
  if (result.data.body.image) {
    result.data.body.image =
      process.env.NEXT_PUBLIC_AUTH_URL + "/" + result.data.body.image;
  }

  console.log(result.data.body);
  return result.data as unknown as { token: string; body: User };
};

export const signup = async (data: FieldValues) => {
  const res = instance.post("/signup", {
    email: data.email,
    password: data.password,
  });
  const result = await res;
  console.log(result);
  return result;
};

export const putUser = async (user: User, file: File, token: string) => {
  console.log(user, token);
  console.log(!!user.image);
  console.log(JSON.stringify(user));

  const formDataBody = new FormData();
  formDataBody.append("image", file, file.name);
  formDataBody.append("email", user.email);

  const res = instance.put("/user/profile", formDataBody, {
    headers: {
      Authorization: "Bearer " + token,
      ContentType: "multipart/form-data",
    },
  });
  const result = await res;
  console.log(result.data);
  return result;
};
