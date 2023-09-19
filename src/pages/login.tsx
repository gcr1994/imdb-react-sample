import { login } from "@/api/authentication";
import { FieldValues, useForm } from "react-hook-form";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    const result = login(data);
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
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
