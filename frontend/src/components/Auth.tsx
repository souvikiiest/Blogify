import { signupSchema } from "@souvikg734/medium-common";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config.js";
interface InputType {
  type: "signin" | "signup";
}

export const Auth: React.FC<InputType> = ({ type }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupSchema>({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`,
        postInputs
      );
      if (type == "signup") {
        toast.success("Signup successfull, please login !", {
          theme: "light",
        });
        navigate("/signin");
      } else {
        localStorage.setItem("token", "Bearer " + response.data.jwt);
        navigate("/blog");
        toast.success("Signin successfull", {
          theme: "light",
        });
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.msg)
        toast.error(err.response.data.msg, {
          theme: "light",
        });
      else
        toast.error("An unexpected error occured", {
          theme: "light",
        });
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl font-extrabold">
          {type == "signup" ? "Create an account" : "Sigin to your account"}
        </div>
        <div>
          {type == "signup"
            ? "Already have an account?"
            : "Donot have an account?"}
          <Link
            to={type == "signup" ? "/signin" : "/signup"}
            className="underline"
          >
            {type == "signup" ? "singin" : "signup"}
          </Link>
        </div>
        <div className="flex w-[50%] flex-col items-start">
          {type == "signup" && (
            <LabelledInput
              label={"Username"}
              placeholder={"Enter your username"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                })
              }
            />
          )}
          <LabelledInput
            label={"Email"}
            placeholder={"m@example.com"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              })
            }
          />
          <LabelledInput
            label={"Password"}
            type="password"
            placeholder={""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              })
            }
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded my-4"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  placeholder,
  onChange,
  type,
}) => {
  return (
    <>
      <div className="block text-sm font-medium pt-4 p-2">{label}</div>
      <input
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-2 border border-green-300 shadow-sm  rounded-lg"
      ></input>
    </>
  );
};
