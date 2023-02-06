import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ApiRoute } from "../../enums/ApiRoute";

export const useSignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: (signUpUser: FieldValues) => {
      return axios.post(ApiRoute.SIGNUP, signUpUser);
    },
    onSuccess: () => {
      navigate("/");
      toast({
        title: "Account created.",
        description: "We've created your account, proceed to login.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Server error.",
        description: "Account failed to be created.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutate(data);
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
    isLoading,
  };
};
