import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useLogin } from "./useLogin";

export const Login = () => {
  const { handleSubmit, onSubmit, errors, register } = useLogin();
  return (
    <>
      <Container maxW={"container.md"}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Card mt={6}>
            <CardHeader>
              <Heading as="h1">Login</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={6}>
                <FormControl isRequired isInvalid={Boolean(errors.email)}>
                  <FormLabel htmlFor="email" aria-required={true}>
                    Email
                  </FormLabel>
                  <Input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Invalid email address",
                      },
                    })}
                    isInvalid={Boolean(errors.email)}
                  />
                  <FormErrorMessage>
                    <>{errors.email && errors.email.message}</>
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={Boolean(errors.password)}>
                  <FormLabel htmlFor="password" aria-required={true}>
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <FormErrorMessage>
                    <>{errors.password && errors.password.message}</>
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </CardBody>
            <CardFooter>
              <Flex w="100%">
                <Button
                  as={RouterLink}
                  to={"/signup"}
                  colorScheme="blue"
                  variant="outline"
                >
                  Sign up
                </Button>
                <Spacer />
                <Button type="submit" colorScheme="blue">
                  Login
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        </form>
      </Container>
    </>
  );
};
