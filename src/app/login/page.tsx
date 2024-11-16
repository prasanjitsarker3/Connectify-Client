/* eslint-disable react/no-unescaped-entities */

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { userLogin } from "@/components/ServerRendering/userLogin";
import { useAppDispatch } from "@/components/Redux/hooks";
import { setUser } from "@/components/Redux/ReduxSlice/authSlice";
import { useRouter } from "next/navigation";

interface IFormInput {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const toastId = toast.loading("Login in...");
    try {
      const loginRes = await userLogin(data);
      if (loginRes?.statusCode === 201) {
        dispatch(setUser({ accessToken: loginRes.data?.accessToken }));
        reset();
        router.push("/");
        toast.success(loginRes?.data?.message || "Login successful", {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.error(loginRes.data?.message || "Register failed", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
      console.error(err);
    }
  };
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <div className=" w-[32rem] bg-gray-50  mx-auto gap-8 md:px-0 px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full mx-auto p-10"
        >
          {/* Email */}
          <h1 className=" text-center text-slate-800 font-medium py-3">
            Login In Here...
          </h1>
          <div>
            <input
              placeholder="Email *"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:none focus:ring-indigo-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                placeholder="Password *"
                {...register("password", {
                  required: "Password is required",
                })}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:none focus:ring-indigo-600"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-300 text-slate-800 py-2 rounded-md ="
          >
            Login
          </button>
        </form>
        <div className="py-4 text-center">
          <p className="text-base text-gray-600">
            Don't have an account?
            <Link href="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
