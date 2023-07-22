//import { Button, Container, Heading, Image, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/error-page.scss";
export const ErrorPage: React.FC = () => {
  const error = useRouteError() as any;
  const navigate = useNavigate();
  console.error(error);

  const randomizeImage = (): string => {
    const base = "/logo-error-";
    const images = ["2.gif", "4.jpg", "5.gif", "7.gif"];
    return base + images[Math.floor(Math.random() * images.length)];
  };
  return (
    // <Container
    //   maxW="container.2xl"
    //   textAlign="center"
    //   p="10"
    //   h="100%"
    //   display="flex"
    //   flexDirection="column"
    //   justifyContent="center"
    //   alignItems="center"
    //   color="black"
    //   userSelect={"none"}
    //   minH='100vh'
    //   bg="#f9f6f6"
    // >
    //   <Image
    //     onDragStart={(e) => e.preventDefault()}
    //     src={randomizeImage()}
    //     alt="404"
    //     mb="5"
    //     className="error-page__logo"
    //   />
    //   <Heading as="h1" size="4xl" color="orange.500" mb="2">
    //     {error?.status || "404"}
    //     <br />
    //     <Heading
    //       fontSize="4xl"
    //       as="h2"
    //       style={{
    //         color: "transparent",
    //         WebkitTextStroke: ".1rem #dd6b20",
    //       }}
    //     >
    //       ERROR
    //     </Heading>
    //   </Heading>
    //   <Text mb="1">
    //     ¡Lo sentimos! Pero la página que estás buscando no existe.
    //   </Text>
    //   <Text mb="10">
    //     Si el error persiste, no dudes en contactarte con nosotros.
    //   </Text>
    //   <Button onClick={() => navigate("/")} colorScheme="orange" size="lg">
    //     Volver al inicio
    //   </Button>
    // </Container>
    <></>
  );
};
