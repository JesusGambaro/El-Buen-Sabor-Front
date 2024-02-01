import { Box, Center, Flex, SimpleGrid, Text, useMantineColorScheme } from "@mantine/core";
import "./footer.scss";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
export const Footer = () => {
  const mobile = useMediaQuery(`(max-width: 700px)`);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Flex
      mih={`${mobile ? "10rem" : "10rem"}`}
      bg="rgb(253, 126, 20)"
      color="white"
      p={5}
      pos="fixed"
      bottom="0"
      maw={`calc(100vw - ${mobile ? "0rem" : "8rem"})`}
      w={"100vw"}
      left={mobile ? "0" : "8rem"}
      justify="center"
      align="center"
      gap={"5rem"}
      wrap={"wrap"}
    >
      <Flex direction={"column"} gap={"0.3rem"}>
        <Text color={dark ? "white" : "black" }>
          <i
            className="fa-solid fa-location-dot"
            style={{ fontSize: "1.2rem" }}
          ></i>
          &nbsp; Luzuriaga 1413, Godoy Cruz, Mendoza
        </Text>

        <Text color={dark ? "white" : "black" }>
          <i
            className="fa-brands fa-whatsapp"
            style={{ fontSize: "1.2rem" }}
          ></i>
          &nbsp; +542615166191
        </Text>
        <Text color={dark ? "white" : "black" }>
          <i
            className="fa-solid fa-envelope"
            style={{ fontSize: "1.2rem" }}
          ></i>
          &nbsp; elbuensabor@gmail.com
        </Text>
      </Flex>
      {/* <Flex direction={"column"} align={"center"} justify={"center"}>
        <Text>Métodos De Pago</Text>
        <SimpleGrid cols={2}>
          <Flex w={"3rem"} h={"1.5rem"} align={"center"} justify={"center"}>
            <i className="fa-brands fa-cc-mastercard"></i>
          </Flex>
          <Flex w={"3rem"} h={"1.5rem"} align={"center"} justify={"center"}>
            <i className="fa-brands fa-cc-mastercard"></i>
          </Flex>
          <Flex w={"3rem"} h={"1.5rem"} align={"center"} justify={"center"}>
            <i className="fa-brands fa-cc-mastercard"></i>
          </Flex>
          <Flex w={"3rem"} h={"1.5rem"} align={"center"} justify={"center"}>
            <i className="fa-brands fa-cc-mastercard"></i>
          </Flex>
        </SimpleGrid>
      </Flex>

      <Flex direction={"column"} gap={"0.3rem"}>
        <Text>
          ¿Tienes alguna queja?&nbsp;
          <Link to={""}>Click aqui para dejar la queja</Link>
        </Text>
        <Text>
          ¿Tienes alguna queja?&nbsp;
          <Link to={""}>Click aqui para dejar la queja</Link>
        </Text>
        <Text>
          ¿Tienes alguna queja?&nbsp;
          <Link to={""}>Click aqui para dejar la queja</Link>
        </Text>
      </Flex> */}
    </Flex>
  );
};
