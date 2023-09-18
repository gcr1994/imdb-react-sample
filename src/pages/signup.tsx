import { signup } from "@/api/authentication";
import { FieldValues, useForm } from "react-hook-form";

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    const result = signup(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email:
          <input {...register("email")}></input>
        </label>
        <label>
          Password:
          <input type="password" {...register("password")}></input>
        </label>
      </form>
    </>
  );
};
