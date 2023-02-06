import React from "react";
import { Task } from "../types";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import { UseMutationResult } from "react-query";
import { AxiosResponse } from "axios";
import { useAuth } from "../../../providers/auth/useAuth";

export type NotificationsProps = {
  tasks: Task[];
  deleteMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
};

export const Notifications: React.FC<NotificationsProps> = ({
  tasks,
  deleteMutation,
}) => {
  const { user } = useAuth();
  return (
    <Box mt={6}>
      {tasks
        .filter((task) => task.data.createdBy === user.id)
        .map((task) => {
          return (
            <Alert status="success" key={task.id} mb={3}>
              <AlertIcon />
              <Flex>
                <AlertTitle>
                  #{task.id} ({task.data.name}) has been executed successfully.
                </AlertTitle>
                <Button
                  variant="link"
                  colorScheme="blue"
                  onClick={() => {
                    deleteMutation.mutate(task.id);
                  }}
                >
                  Acknowledge
                </Button>
                .
              </Flex>
            </Alert>
          );
        })}
    </Box>
  );
};
