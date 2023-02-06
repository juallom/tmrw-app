import React from "react";
import { Flex, Spacer, Box, Text, Progress } from "@chakra-ui/react";
import { Task } from "../types";

export type ActiveProps = {
  tasks: Task[];
};

export const Active: React.FC<ActiveProps> = ({ tasks }) => {
  return (
    <Box mt={6}>
      {tasks.map((task) => {
        return (
          <Box
            key={task.id}
            mb={3}
            p={3}
            borderWidth="2px"
            borderRadius="md"
            borderColor="green.400"
          >
            <Box mb={2}>
              <Flex>
                <Text as="b">
                  #{task.id} ({task.data.name})
                </Text>
                <Spacer />
                <Text>Created by: {task.data.createdByDisplay}</Text>
              </Flex>
            </Box>
            <Progress hasStripe isIndeterminate />
          </Box>
        );
      })}
    </Box>
  );
};
