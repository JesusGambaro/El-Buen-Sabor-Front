import { Container, Flex, Loader as Spinner, Text } from "@mantine/core";
const Loader = () => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      mih="50vh"
      h="100%"
      w="100%"
    >
      <Spinner color="orange" variant="bars" size="lg" />
      <Text size="xs" align="center">
        Cargando...
      </Text>
    </Flex>
  );
};
export default Loader;
