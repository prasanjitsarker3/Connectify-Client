"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { imgUrlCreate } from "@/components/UtlitiFunction/imageUpload";
import { userRegister } from "@/components/ServerRendering/userRegister";
import { toast } from "sonner";
import { userLogin } from "@/components/ServerRendering/userLogin";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/components/Redux/hooks";
import { setUser } from "@/components/Redux/ReduxSlice/authSlice";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  profilePicture: FileList;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string>("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const file = data.profilePicture[0];
    if (!file) {
      return;
    }

    const imgUrl = await imgUrlCreate(file);
    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
      profile: imgUrl,
    };
    const loginData = {
      email: data.email,
      password: data.password,
    };
    const toastId = toast.loading("Register in...");
    try {
      const res = await userRegister(registerData);
      if (res?.statusCode === 201) {
        const loginRes = await userLogin(loginData);
        if (loginRes?.statusCode === 201) {
          dispatch(setUser({ accessToken: loginRes.data?.accessToken }));
          reset();
          router.push("/");
          toast.success(loginRes?.data?.message || "Login successful", {
            id: toastId,
            duration: 2000,
          });
        }
      } else {
        toast.error(res?.data?.message || "Register failed", {
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result?.toString() || "");
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-[100vh] w-full flex items-center justify-center bg-gray-50">
      <div className=" flex items-center justify-center w-full gap-8 md:px-0 px-8">
        <div className=" md:w-1/2   hidden md:flex justify-end">
          <Image
            src="/Photo/Chat.png"
            alt="Chat Image"
            width={500}
            height={500}
          />
        </div>

        <div className=" w-full md:w-1/2 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-full md:w-96"
          >
            {/* Name */}
            <div>
              <input
                placeholder="Name *"
                {...register("name", { required: "Name is required" })}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <input
                type="file"
                placeholder="Profile *"
                accept="image/*"
                {...register("profilePicture")}
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:none focus:ring-indigo-600"
              />
              {filePreview && (
                <div className="mt-4">
                  <Image
                    src={filePreview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-300 text-slate-800 py-2 rounded-md ="
            >
              Register
            </button>
          </form>
          <div className="mt-4 md:text-left text-center">
            <p className="text-base text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
