import React from "react";
import { Container } from "@chakra-ui/react";
import { Navigation } from "./Navigation";

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container maxW={"container.lg"}>{children}</Container>
    </>
  );
};
