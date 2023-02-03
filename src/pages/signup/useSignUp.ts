import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { SignupUser } from "../../auth/types";

export const useSignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (signUpUser: SignupUser) => {
      return axios.post("/api/auth/signup", signUpUser);
    },
    onSuccess: () => {
      navigate("/");
      toast({
        position: "top-right",
        title: "Account created.",
        description: "We've created your account, proceed to login.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        position: "top-right",
        title: "Server error.",
        description: "Account failed to be created.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  const validateConfirmPassword = (value: string) => {
    return value !== watch("password") ? "Your passwords do no match" : true;
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    validateConfirmPassword,
  };
};
