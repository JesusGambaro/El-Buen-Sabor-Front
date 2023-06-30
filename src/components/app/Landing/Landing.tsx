import { SimpleGrid, Title as Heading, Flex, Stack, Box } from "@mantine/core";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./landing.scss";
import Loader from "@app/Loader/Loader";
import { LandingCard } from "./Cards/LandingProductCard";
import { CategoryCard } from "./Cards/CategoryCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Product, Category } from "types/types";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
const Landing = () => {
  type QueryProps = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };
  type QueryPropsCategorias = {
    data: Category[];
    error: any;
    isLoading: boolean;
  };
  //--Temporal
  // let products: Product[] = [];
  // let isLoading: boolean = false;
  // let categories: Category[] = [];
  //--
  const { filter, setFilter, setProductos, productos } = useCatalogueStore();
  let isLoadingProds = false;
  const {
    data: products,
    error,
    isLoading,
  } = useApiQuery(
    "GET|producto/search" +
      `?${filter.id_categoria ? `id=${filter.id_categoria}&` : ""}${
        filter.nombre_like ? "nombre=" + filter.nombre_like : ""
      }`,
    filter
  ) as QueryProps;
  const { data: categories } = useApiQuery(
    "GET|categoria/all",
    null
  ) as QueryPropsCategorias;
  useEffect(() => {
    if (products) {
      setProductos(products);
    }
  }, [products]);
  const slides = categories
    ?.filter((category) => {
      return category.subCategoria?.length == 0;
    })
    .map((category) => (
      <Carousel.Slide key={category.id}>
        <CategoryCard key={category.id} category={category} />
      </Carousel.Slide>
    ));
  const mobile = useMediaQuery(`(max-width: 700px)`);
  return (
    <Flex
      maw="container.2xl"
      miw={"100vh"}
      display="flex"
      dir="column"
      c="start"
      align="center"
      bg="#f9f6f6"
    >
      <Heading order={1} size="xl" mb="2rem">
        El Buen Sabor
      </Heading>
      <Stack spacing={3} w="100%">
        <Heading order={3} size="lg" mb="1rem">
          Categorías
        </Heading>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Carousel
              slideSize="20%"
              maw={"100%"}
              height={60}
              align="start"
              slideGap="xl"
              controlSize={25}
              dragFree
              //withIndicators
              draggable
              slidesToScroll={1}
              inViewThreshold={0}
              loop
              px={"3rem"}
              styles={{
                // indicator: {
                //   top: "5rem",
                //   width: rem(12),
                //   height: rem(4),
                //   transition: "width 250ms ease",
                //   background: "orange",
                //   "&[data-active]": {
                //     width: rem(40),
                //   },
                // },
                control: {
                  // "&[data-inactive]": {
                  //   opacity: 0,
                  //   cursor: "default",
                  // },
                  background: "#fd7e14",
                  color: "white",
                  width: "2rem",
                  height: "2rem",
                  boxShadow: "none",
                  border: "none",
                  marginTop: "-0.55rem",
                },
              }}
            >
              {slides}
            </Carousel>
          </>
        )}
        <Box>
          <Heading order={3} size="lg">
            Productos destacados
          </Heading>
          {isLoadingProds ? (
            <Loader />
          ) : (
            <SimpleGrid
              w="100%"
              mt={4}
              spacing={3}
              breakpoints={[
                { maxWidth: "62rem", cols: 3, spacing: "md" },
                { maxWidth: "48rem", cols: 2, spacing: "sm" },
                { maxWidth: "36rem", cols: 1, spacing: "sm" },
              ]}
            >
              {productos?.map((product) => (
                <LandingCard
                  key={"landing-card-" + product.id}
                  product={product}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
        <Box>
          <Heading order={3} size="lg" mb="1rem">
            Ofertas
          </Heading>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Landing;
