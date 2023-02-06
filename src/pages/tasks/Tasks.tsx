import React from "react";
import { Heading, Flex, Button } from "@chakra-ui/react";
import { PageLayout } from "../../components/PageLayout";
import { useTaskModal } from "./hooks/useTaskModal";
import { TaskModal } from "./components/TaskModal";
import { Notifications } from "./components/Notifications";
import { Active } from "./components/Active";
import { Waiting } from "./components/Waiting";
import { useTasks } from "./hooks/useTasks";

export const Tasks: React.FC = () => {
  const {
    isModalOpen,
    onModalClose,
    onModalOpen,
    register,
    errors,
    onSubmit,
    deleteMutation,
    isLoading,
  } = useTaskModal();

  const { completed, active, waiting } = useTasks();

  return (
    <>
      <PageLayout>
        <>
          <Flex mt={6} alignItems="center">
            <Heading as="h1" size="xl" flexGrow={1}>
              Tasks
            </Heading>
            <Button colorScheme="blue" size="md" onClick={onModalOpen}>
              Create new task
            </Button>
          </Flex>
          <TaskModal
            isModalOpen={isModalOpen}
            onModalClose={onModalClose}
            register={register}
            errors={errors}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
          <Notifications tasks={completed} deleteMutation={deleteMutation} />
          <Active tasks={active} />
          <Waiting tasks={waiting} />
        </>
      </PageLayout>
    </>
  );
};
