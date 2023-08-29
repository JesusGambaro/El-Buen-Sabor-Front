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
  useMantineColorScheme,
  ActionIcon,
  Transition,
} from "@mantine/core";
import { InputBase, RangeSlider, Title, Input } from "@mantine/core";
import { Category } from "types/types";
import { useEffect, useState } from "react";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { CategoriaFilter } from "./LeftFilters/CategoriaFilter";
import { useDisclosure } from "@mantine/hooks";
import { number } from "yup";
import { IconX } from "@tabler/icons-react";

type Props = {
  handleSetFilter: (_id_categoria?: number, _nombre_like?: string) => void;
  currentIdCategoria?: number;
  opened: boolean;
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
  
  const { data: categoria } = useApiQuery(
    "GET|categoria/" + props.currentIdCategoria,
    null
  ) as {
    data: Category;
    error: any;
    isLoading: boolean;
  };
  //console.log(baseCategories);
  //let baseCategories: Category[] = [];
  const [currentCategoriaName, setCurrentCategoriaName] = useState("");
  const [priceValues, serPriceValues] = useState({
    min: 1,
    max: 5000,
  });
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const useStyles = createStyles((theme) => ({
    dragging: {
      transform: "translate(-50%, -50%)",
    },

    text: {
      color: dark ? "white" : "black",
    },

    filterContainer: {
      background: dark ? "black" : "white",
    },
    filterTitle: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  }));
  const { classes } = useStyles();
  const RangeSliderStyle = createStyles((theme) => ({
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
  const { classes: RangeSliderClasses } = RangeSliderStyle();
  return (
    <Transition
      mounted={props.opened}
      transition="slide-right"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <Flex
            style={{ borderRadius: "10px" }}
            direction={"column"}
            p={"1rem"}
            gap={"1rem"}
            w={"15rem"}
          >
            <Flex mb={"1rem"}>
              {props.currentIdCategoria && categoria ? (
                <>
                  <Flex
                    w={"15rem"}
                    sx={{ borderRadius: "20px" }}
                    h={"2rem"}
                    p={"1rem"}
                    justify={"space-between"}
                    align={"center"}
                    bg={"orange"}
                  > 
                    <Title color="white" align="left" weight={"500"} order={4}>
                      {categoria?.nombre}
                    </Title>
                    <ActionIcon
                      sx={{
                        background: "white",
                        color: "orange",
                        borderRadius: "100%",
                        ":hover": {
                          background: "orange",
                          color: "white",
                        },
                        transition: "0.5s ease-in-out background",
                      }}
                      onClick={() => {
                        props.handleSetFilter(undefined);
                      }}
                    >
                      <IconX></IconX>
                    </ActionIcon>
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
              p={"1rem"}
              style={{ borderRadius: "10px" }}
              className={classes.filterContainer}
            >
              <Title className={classes.filterTitle + " " + classes.text}>
                En Oferta
              </Title>
              <Switch size="md" onLabel="SI" offLabel="NO" />
            </Flex>
            <Flex
              gap={"1rem"}
              w={"100%"}
              justify={"center"}
              align={"start"}
              p={"1rem"}
              direction={"column"}
              style={{ borderRadius: "10px" }}
              className={classes.filterContainer}
            >
              <Title className={classes.filterTitle + " " + classes.text}>
                Precio
              </Title>
              <Flex justify={"space-between"} display={"flex"} w={"100%"}>
                <Stack w={"4rem"}>
                  <Title
                    className={classes.filterTitle + " " + classes.text}
                    w={"100%"}
                    align="left"
                  >
                    Min
                  </Title>
                  <Input
                    w={"100%"}
                    type="number"
                    value={priceValues.min}
                    onChange={(e) => {
                      serPriceValues({
                        ...priceValues,
                        min: Number.parseInt(e.target.value),
                      });
                    }}
                  ></Input>
                </Stack>
                <Stack w={"4rem"}>
                  <Title
                    className={classes.filterTitle + " " + classes.text}
                    w={"100%"}
                    align="right"
                  >
                    Max
                  </Title>
                  <Input
                    w={"100%"}
                    type="number"
                    value={priceValues.max}
                    onChange={(e) => {
                      serPriceValues({
                        ...priceValues,
                        max: Number.parseInt(e.target.value),
                      });
                    }}
                  ></Input>
                </Stack>
              </Flex>
              <RangeSlider
                w={"100%"}
                size="xl"
                color="orange"
                labelAlwaysOn
                classNames={RangeSliderClasses}
                max={5000}
                min={1}
                value={[priceValues.min, priceValues.max]}
                onChange={(e) => {
                  serPriceValues({ min: e[0], max: e[1] });
                }}
                minRange={1000}
              ></RangeSlider>
            </Flex>
            {!props.currentIdCategoria && (
              <Flex
                gap={"1rem"}
                w={"100%"}
                justify={"space-between"}
                align={"center"}
                bg={dark ? "black" : "white"}
                p={"1rem"}
                direction={"column"}
                style={{ borderRadius: "10px" }}
              >
                <CategoriaFilter handleSetFilter={props.handleSetFilter} />
              </Flex>
            )}
          </Flex>
        </div>
      )}
    </Transition>
  );
};
export default CatalogueLeftFilters;
