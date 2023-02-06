import React from "react";
import { Container } from "@chakra-ui/react";

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Container maxW={"container.lg"}>
        {children}
      </Container>
    </>
  );
};
