import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Input,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Button,
  Container,
  Flex,
  Spacer,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useSignUp } from "./useSignUp";

export const SignUp: FC = () => {
  const {
    handleSubmit,
    onSubmit,
    errors,
    register,
    validateConfirmPassword,
    isLoading,
  } = useSignUp();

  return (
    <>
      <Container maxW={"container.md"}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Card mt={6}>
            <CardHeader>
              <Heading as="h1">Sign up</Heading>
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
                <FormControl isRequired isInvalid={Boolean(errors.firstName)}>
                  <FormLabel htmlFor="firstName" aria-required={true}>
                    First name
                  </FormLabel>
                  <Input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  <FormErrorMessage>
                    <>{errors.firstName && errors.firstName.message}</>
                  </FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="lastName">Last name</FormLabel>
                  <Input {...register("lastName")} />
                </FormControl>
                <FormControl isRequired isInvalid={Boolean(errors.password)}>
                  <FormLabel htmlFor="password" aria-required={true}>
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 12,
                        message: "Password must be at least 12 characters long",
                      },
                      pattern: {
                        value:
                          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                        message:
                          "Password must include lowercase, uppercase, number and special characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    <>{errors.password && errors.password.message}</>
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.confirmPassword)}
                >
                  <FormLabel htmlFor="confirmPassword" aria-required={true}>
                    Confirm password
                  </FormLabel>
                  <Input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: validateConfirmPassword,
                    })}
                  />
                  <FormErrorMessage>
                    <>
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </>
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </CardBody>
            <CardFooter>
              <Flex w="100%">
                <Button
                  as={RouterLink}
                  to={"/"}
                  colorScheme="blue"
                  variant="outline"
                >
                  Back to login
                </Button>
                <Spacer />
                <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                  Sign up
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        </form>
      </Container>
    </>
  );
};
