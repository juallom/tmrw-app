import React from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";

export type TaskModalProps = {
  isModalOpen: boolean;
  onModalClose: VoidFunction;
  register: UseFormRegister<FieldValues>;
  errors: FormState<FieldValues>["errors"];
  onSubmit: VoidFunction;
  isLoading: boolean;
};

export const TaskModal: React.FC<TaskModalProps> = ({
  isModalOpen,
  onModalClose,
  register,
  errors,
  onSubmit,
  isLoading,
}) => {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form noValidate onSubmit={onSubmit}>
            <ModalHeader>Create new task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired isInvalid={Boolean(errors.name)}>
                <FormLabel htmlFor="name" aria-required={true}>
                  Task name
                </FormLabel>
                <Input
                  {...register("name", {
                    required: "Task name is required",
                  })}
                  isInvalid={Boolean(errors.name)}
                />
                <FormErrorMessage>
                  <>{errors.name && errors.name.message}</>
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                variant="outline"
                mr={3}
                onClick={onModalClose}
              >
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Create task
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
