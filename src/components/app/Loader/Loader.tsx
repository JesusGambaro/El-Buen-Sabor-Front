import { Container, Spinner, Text } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Container
      maxW="container.2xl"
      p="2rem"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gridGap="1rem"
    >
      <Spinner
        thickness=".3rem"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange"
        size="xl"
      />
      <Text fontSize="md" color="orange">
        Cargando...
      </Text>
    </Container>
  );
};
export default Loader;
