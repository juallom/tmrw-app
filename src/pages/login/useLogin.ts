import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { LoginUser } from "../../auth/types";
import { useAuth } from "../../auth/useAuth";

export const useLogin = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { signin } = useAuth();
  const from = location.state?.from?.pathname || "/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (loginUser: LoginUser) => {
      return axios.post("/api/auth/login", loginUser);
    },
    onSuccess: ({ data: { access_token } }) => {
      signin(access_token);
      navigate(from, { replace: true });
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

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data as LoginUser);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
