import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { LoginUser } from "../../providers/auth/types";
import { useAuth } from "../../providers/auth/hooks/useAuth";
import { ApiRoute } from "../../enums/ApiRoute";
import { AppRoute } from "../../enums/AppRoute";

export const useLogin = () => {
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || AppRoute.DASHBOARD;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: (loginUser: LoginUser) => {
      return axios.post(ApiRoute.LOGIN, loginUser);
    },
    onSuccess: ({ data: { User } }) => {
      login(User);
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
    mutate(data as LoginUser);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isLoading,
  };
};
