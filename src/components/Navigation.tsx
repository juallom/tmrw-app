import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Link } from "@chakra-ui/react";
import { AppRoute } from "../enums/AppRoute";

export type NavigationProps = {};

export const Navigation: React.FC<NavigationProps> = ({}) => {
  return (
    <>
      <Flex>
        <Link to={AppRoute.CREATE_TASK} as={RouterLink}>
          Create new task
        </Link>
      </Flex>
    </>
  );
};
