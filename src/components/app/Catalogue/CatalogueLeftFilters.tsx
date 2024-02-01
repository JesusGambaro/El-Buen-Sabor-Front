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
import { Categoria } from "types/types";
import { useEffect, useState } from "react";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { CategoriaFilter } from "./LeftFilters/CategoriaFilter";
import { useDisclosure } from "@mantine/hooks";
import { number } from "yup";
import { IconX } from "@tabler/icons-react";
import useCatalogueStore from "@store/catalogueStore";
import useMainStore from "@store/mainStore";

type Props = {
  handleSetFilter: (
    precioMin: number,
    precioMax: number,
    descuento: boolean,
    _id_categoria?: number | null,
    _nombre_like?: string | null
  ) => void;
  currentIdCategoria?: number | undefined | null;
  opened: boolean;
};
type NestedAccordionProps = {
  categories: Categoria[];
  isRecursive: boolean;
};
type QueryProps = {
  data: Categoria[];
  error: any;
  isLoading: boolean;
};

const CatalogueLeftFilters = (props: Props) => {
  const {
    data: baseCategories,
    error,
    isLoading,
  } = useApiQuery("GET|categoria/allWOPage", null) as QueryProps;

  const [categoria, setcategoria] = useState<Categoria | null | undefined>();
  //props.currentIdCategoria

  useEffect(() => {
    if (props.currentIdCategoria) {
      setcategoria(
        baseCategories?.find((x) => x.id == props.currentIdCategoria)
      );
    } else {
      setcategoria(null);
    }

    return () => {};
  }, [baseCategories, props.currentIdCategoria]);

  const [currentCategoriaName, setCurrentCategoriaName] = useState("");
  const [priceValues, serPriceValues] = useState({
    min: 1,
    max: 5000,
  });

  useEffect(() => {
    if (Number.isNaN(priceValues.min) || Number.isNaN(priceValues.max)) return;
    props.handleSetFilter(
      priceValues.min,
      priceValues.max,
      filter.descuento,
      filter.id_categoria,
      filter.nombre_like
    );
  }, [priceValues]);

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
  const { filter } = useCatalogueStore();
  const { isMobile } = useMainStore();
  return (
    <Transition
      mounted={props.opened}
      transition="slide-right"
      duration={200}
      timingFunction="ease"
      
    >
      {(styles) => (
        <div  style={{...styles,zIndex: isMobile ? 999 : 0,position:isMobile ? "absolute" : "unset"}} >
          <Flex
            direction={"column"}
            p={"1rem"}
            gap={"1rem"}
            w={"15rem"}
            pos={isMobile ? "fixed" : "unset"}
            bg={isMobile ? "#b44509" : ""}
            style={{ borderRadius: "10px"}}
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
                        props.handleSetFilter(
                          filter.precioMin,
                          filter.precioMax,
                          filter.descuento,
                          null,
                          filter.nombre_like
                        );
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
              <Switch
                size="md"
                onLabel="SI"
                offLabel="NO"
                checked={filter.descuento}
                onChange={(e) => {
                  
                  props.handleSetFilter(
                    filter.precioMin,
                    filter.precioMax,
                    e.target.checked,
                    filter.id_categoria,
                    filter.nombre_like
                  );
                }}
              />
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
                    onBlur={(e) => {
                      if (e.target.value == "") {
                        serPriceValues({
                          ...priceValues,
                          min: 1,
                        });
                      }
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
                    onBlur={(e) => {
                      if (e.target.value == "") {
                        serPriceValues({
                          ...priceValues,
                          max: 5000,
                        });
                      }
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
