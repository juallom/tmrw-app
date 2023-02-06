import React from "react";
import { Flex, Spacer, Box, Text } from "@chakra-ui/react";
import { Task } from "../types";
import { useAuth } from "../../../providers/auth/hooks/useAuth";

export type WaitingProps = {
  tasks: Task[];
};

export const Waiting: React.FC<WaitingProps> = ({ tasks }) => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <Box mt={6}>
      {tasks.map((task) => {
        return (
          <Box
            key={task.id}
            mb={3}
            p={3}
            borderRadius="md"
            bgColor={user.id === task.data.createdBy ? "blue.100" : "gray.100"}
          >
            <Flex>
              <Text as="b">
                #{task.id} ({task.data.name})
              </Text>
              <Spacer />
              <Text>Created by: {task.data.createdByDisplay}</Text>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};
