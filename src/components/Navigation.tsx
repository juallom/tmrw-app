import React from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Flex, Link, Spacer, Box, Button, Container } from "@chakra-ui/react";
import { AppRoute } from "../enums/AppRoute";
import { useAuth } from "../providers/auth/hooks/useAuth";
import { useMutation } from "react-query";
import { ApiRoute } from "../enums/ApiRoute";

export const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.get(ApiRoute.LOGOUT);
    },
    onSuccess: () => {
      logout();
      navigate("/", { replace: true });
    },
  });
  const onClick = () => {
    mutation.mutate();
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Box
        py={3}
        borderBottomColor={"gray.100"}
        borderBottomWidth={"2px"}
        mb={3}
      >
        <Container maxW={"container.lg"}>
          <Flex>
            <Link as={RouterLink} to={AppRoute.DASHBOARD}>
              Dashboard
            </Link>
            <Spacer />
            {user.role === "ROOT" && (
              <Link as={RouterLink} to={AppRoute.SYSTEM_SETTINGS} mr={6}>
                System settings
              </Link>
            )}
            <Button size={"xs"} onClick={onClick}>
              Logout
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
};
