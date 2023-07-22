import {
  Accordion,
  Box,
  Container,
  Text,
  Flex,
  Checkbox,
  Button,
  UnstyledButton,
  Drawer,
  Switch,
  Stack,
  rem,
  createStyles,
} from "@mantine/core";
import { InputBase, RangeSlider, Title, Input } from "@mantine/core";
import { Category } from "types/types";
import { useEffect, useState } from "react";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { CategoriaFilter } from "./LeftFilters/CategoriaFilter";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  handleSetFilter: (_id_categoria?: number, _nombre_like?: string) => void;
  currentIdCategoria?: number;
};
type NestedAccordionProps = {
  categories: Category[];
  isRecursive: boolean;
};
type QueryProps = {
  data: Category[];
  error: any;
  isLoading: boolean;
};

const CatalogueLeftFilters = (props: Props) => {
  const {
    data: baseCategories,
    error,
    isLoading,
  } = useApiQuery("GET|categoria/all", null) as QueryProps;
  //console.log(baseCategories);
  //let baseCategories: Category[] = [];
  const [currentCategoriaName, setCurrentCategoriaName] = useState("");
  const [minMaxPrice, setMinMaxPrice] = useState({
    min: 0,
    max: 10000,
  });
  const [opened, { open, close }] = useDisclosure(false);
  const useStyles = createStyles((theme) => ({
    label: {
      top: 0,
      height: rem(28),
      lineHeight: rem(28),
      width: rem(34),
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 700,
      backgroundColor: "transparent",
    },

    thumb: {
      backgroundColor: "orange",
      height: rem(28),
      width: rem(34),
      border: "none",
    },

    dragging: {
      transform: "translate(-50%, -50%)",
    },
  }));
  const { classes } = useStyles();

  return (
    // <Container margin={0} borderRadius="md" minW={"15rem"} maxWidth={"20rem"}>
    //   <Flex marginBottom={"1rem"}>
    //     {props.currentIdCategoria && (
    //       <Box
    //         color={"white"}
    //         background={"orange"}
    //         padding={"0.5rem 0.7rem"}
    //         minW={"10rem"}
    //         borderRadius={"20px"}
    //       >
    //         <Flex
    //           w={"100%"}
    //           justifyContent={"space-between"}
    //           alignItems={"center"}
    //           gap={"1rem"}
    //         >
    //           {
    //             baseCategories.find((c) => {
    //               return c.id == props.currentIdCategoria;
    //             })?.nombre
    //           }
    //           <Button
    //             w={"1rem"}
    //             borderRadius={"50%"}
    //             colorScheme="orange"
    //             onClick={() => {
    //               props.handleSetFilter(undefined);
    //             }}
    //           >
    //             X
    //           </Button>
    //         </Flex>
    //       </Box>
    //     )}
    //   </Flex>
    //   <Flex gap={"1rem"} className="ofertaFilter">
    //     <Title order={3}>En Oferta</Title>
    //     <Checkbox colorScheme="orange" defaultChecked />
    //   </Flex>
    //   <br></br>
    //   <Flex flexDir={"column"} gap={".5rem"}>
    //     <Title order={3}>Filtro por precio min-max</Title>
    //     <Flex gap={"1rem"}>
    //       <Input
    //         value={minMaxPrice.min}
    //         onChange={(e) => {
    //           let _min = parseFloat(e.target.value);
    //           if (_min >= 0 && minMaxPrice.max - _min >= 1000) {
    //             setMinMaxPrice({ ...minMaxPrice, min: _min });
    //           }
    //         }}
    //       />
    //       <Input
    //         value={minMaxPrice.max}
    //         onChange={(e) => {
    //           let _max = parseFloat(e.target.value);
    //           if (_max >= 0 && _max - minMaxPrice.min >= 1000) {
    //             setMinMaxPrice({ ...minMaxPrice, max: _max });
    //           }
    //         }}
    //       />
    //     </Flex>
    //     <RangeSlider
    //       color="orange"
    //       size="lg"
    //       min={0}
    //       max={10000}
    //       defaultValue={[0, 10000]}
    //       value={[minMaxPrice.min, minMaxPrice.max]}
    //       label={null}
    //       minRange={1000}
    //       onChange={(e: any) => {
    //         //console.log(e[0], e[1]);
    //         setMinMaxPrice({ ...minMaxPrice, min: e[0], max: e[1] });
    //       }}
    //     />
    //   </Flex>
    //   <br></br>
    //   <Flex flexDir={"column"} gap={".5rem"}>
    //     <Title order={3}>Categorias</Title>
    //     <NestedAccordion categories={baseCategories} isRecursive={false} />
    //   </Flex>
    // </Container>
    <>
      <Flex direction={"column"} p={"1rem"} gap={"1rem"} w={"25rem"}>
        <Title order={2}>Filtros</Title>
        <Flex mb={"1rem"}>
          {props.currentIdCategoria ? (
            <>
              <Flex
                w={"15rem"}
                sx={{ borderRadius: "20px" }}
                h={"4rem"}
                p={"1rem"}
                justify={"space-between"}
                align={"center"}
                bg={"orange"}
              >
                <Title color="white" align="left" weight={"500"} order={4}>
                  {
                    baseCategories?.find((c) => {
                      return c.id == props.currentIdCategoria;
                    })?.nombre
                  }
                </Title>
                <Button
                  w={"3.5rem"}
                  h={"3.5rem"}
                  sx={{
                    background: "white",
                    color: "orange",
                    borderRadius: "100%",
                    ":hover": {
                      background: "orange",
                      color: "white",
                      border: "4px solid white",
                    },
                  }}
                  onClick={() => {
                    props.handleSetFilter(undefined);
                  }}
                >
                  X
                </Button>
              </Flex>
            </>
          ) : (
            <></>
          )}
        </Flex>
        <Flex
          gap={"1rem"}
          w={"100%"}
          justify={"space-between"}
          align={"center"}
          bg={"white"}
          p={"1rem"}
          style={{ borderRadius: "10px" }}
        >
          <Title weight={"500"} order={3}>
            En Oferta
          </Title>
          <Switch size="md" onLabel="SI" offLabel="NO" />
        </Flex>
        <Flex
          gap={"1rem"}
          w={"100%"}
          justify={"center"}
          align={"center"}
          bg={"white"}
          p={"1rem"}
          direction={"column"}
          style={{ borderRadius: "10px" }}
        >
          <Title w={"100%"} align="left" weight={"500"} order={3}>
            Precio
          </Title>
          <Flex justify={"space-between"} display={"flex"} w={"100%"}>
            <Stack w={"5rem"}>
              <Title w={"100%"} align="left" weight={"400"} order={4}>
                Min
              </Title>
            </Stack>
            <Stack w={"5rem"}>
              <Title w={"100%"} align="right" weight={"400"} order={4}>
                Max
              </Title>
            </Stack>
          </Flex>
          <RangeSlider
            w={"100%"}
            size="xl"
            color="orange"
            labelAlwaysOn
            classNames={classes}
          ></RangeSlider>
        </Flex>
        {!props.currentIdCategoria && (
          <Flex
            gap={"1rem"}
            w={"100%"}
            justify={"space-between"}
            align={"center"}
            bg={"white"}
            p={"1rem"}
            direction={"column"}
            style={{ borderRadius: "10px" }}
          >
            <CategoriaFilter handleSetFilter={props.handleSetFilter} />
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default CatalogueLeftFilters;
