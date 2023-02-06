import axios, {AxiosResponse} from "axios";
import { useDisclosure, useToast } from "@chakra-ui/react";
import {
  FieldValues,
  useForm,
  UseFormRegister,
  FormState,
} from "react-hook-form";
import {useMutation, UseMutationResult} from "react-query";
import { ApiRoute } from "../../../enums/ApiRoute";

export type UseTasksReturn = {
  isModalOpen: boolean;
  onModalOpen: VoidFunction;
  onModalClose: VoidFunction;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  onSubmit: VoidFunction;
  deleteMutation: UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>;
  isLoading: boolean;
};

export const useTaskModal = (): UseTasksReturn => {
  const toast = useToast();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: (task: FieldValues) => {
      return axios.post(ApiRoute.TASKS, task);
    },
    onSuccess: () => {
      toast({
        title: "Task created successfully.",
        description: "You will be notified once your task is completed.",
        status: "success",
        duration: 3000,
      });
      onModalClose();
      reset();
    },
    onError: () => {
      toast({
        title: "Server error.",
        description: "Task creation failed, try again later.",
        status: "error",
        duration: 3000,
      });
    },
  });

  const deleteMutation = useMutation((id: string) => {
    return axios.delete(`${ApiRoute.TASKS}/${id}`);
  });

  const onSubmit = handleSubmit((data: FieldValues) => {
    mutate(data);
  });

  return {
    isModalOpen,
    onModalOpen,
    onModalClose,
    register,
    errors,
    onSubmit,
    deleteMutation,
    isLoading,
  };
};
