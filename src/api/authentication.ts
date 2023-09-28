import { FieldValues } from "react-hook-form";
import axios from "axios";
import { User } from "@/types/user";

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_AUTH_URL });

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Caught a 401");
      window.location.href = "/logout";
    }
    return Promise.reject(error);
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
  if (result.data.body.image) {
    result.data.body.image =
      process.env.NEXT_PUBLIC_AUTH_URL + "/" + result.data.body.image;
  }

  return result.data as unknown as { token: string; body: User };
};

export const signup = async (data: FieldValues) => {
  const res = instance.post("/signup", {
    email: data.email,
    password: data.password,
  });
  const result = await res;
  return result;
};

export const putUser = async (user: User, file: File, token: string) => {
  const formDataBody = new FormData();
  formDataBody.append("image", file, file.name);
  formDataBody.append("email", user.email);

  const res = instance.put("/user/profile", formDataBody, {
    headers: {
      Authorization: "Bearer " + token,
      ContentType: "multipart/form-data",
    },
  });
  const result = (await res).data;
  return result;
};

export const addToFavorites = async (
  user: User,
  movieId: number,
  token: string
) => {
  const res = instance.post(
    "/user/favorites",
    { movieId, email: user.email },
    {
      headers: {
        Authorization: "Bearer " + token,
        ContentType: "multipart/form-data",
      },
    }
  );
  const result = (await res).data;
  return result;
};

export const removeFromFavorites = async (
  user: User,
  movieId: number,
  token: string
) => {
  const res = instance.post(
    "/user/favorites/remove",
    { movieId, email: user.email },
    {
      headers: {
        Authorization: "Bearer " + token,
        ContentType: "multipart/form-data",
      },
    }
  );
  const result = (await res).data;
  return result;
};
