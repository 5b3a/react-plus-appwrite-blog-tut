import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
    <form onSubmit={handleSubmit(login)}>
      <Input
        label="Enter your Email: "
        placeholder="Enter your Email: "
        type="email"
        {...register("email", {
          required: true,
          validate: {
            matchPatern: (value) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Email address must be a valid address",
          },
        })}
      />
      <Input
        label="password"
        placeholder="Enter Password"
        type="password"
        {...register("password", {
          required: true,
        })}
      />
      <Button type="sumbit">Sign In</Button>
    </form>;
  };
  return <div>Login</div>;
}

export default Login;
