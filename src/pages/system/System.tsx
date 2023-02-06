import React, { ChangeEvent, FocusEvent, useState } from "react";
import { PageLayout } from "../../components/PageLayout";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Heading,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  TableContainer,
  Input,
  Flex,
  AlertDescription,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { ApiRoute } from "../../enums/ApiRoute";
import { User } from "../../providers/auth/types";

const PriorityChange: React.FC<{ user: User }> = ({ user }) => {
  const [priority, setPriority] = useState<number>(user.priority);
  const mutation = useMutation((priority: number) => {
    return axios.post(`${ApiRoute.USERS}/${user.id}`, { priority });
  });
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const n = parseInt(event.target.value);
    if (!isNaN(n)) {
      setPriority(n);
    } else {
      setPriority(user.priority);
    }
  };
  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    const n = parseInt(event.target.value);
    if (!isNaN(n)) {
      mutation.mutate(n);
    }
  };
  return (
    <Input type="number" value={priority} onBlur={onBlur} onChange={onChange} />
  );
};

export const System = () => {
  const { data, error } = useQuery("getUsers", () => {
    return axios.get(ApiRoute.USERS);
  });

  return (
    <>
      <PageLayout>
        <>
          <Heading as="h1" size="xl" mt={6} mb={3}>
            System settings
          </Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>There was an error retrieving users list.</AlertTitle>
            </Alert>
          )}
          {data && (
            <>
              <Alert status="info" mb={3}>
                <AlertIcon />
                <Flex>
                  <AlertDescription>
                    Priority value. It ranges from 1 (highest priority) to 100
                    (lowest priority).
                  </AlertDescription>
                </Flex>
              </Alert>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      <Th>Priority</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.data.map((user: User) => (
                      <Tr key={user.id}>
                        <Td>{user.id}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.role}</Td>
                        <Td>
                          <PriorityChange user={user} />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      </PageLayout>
    </>
  );
};
