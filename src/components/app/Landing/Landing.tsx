import {
  SimpleGrid,
  Heading,
  Container,
  Stack,
  Box,
  IconButton,
} from "@chakra-ui/react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./landing.scss";
import Loader from "@app/Loader/Loader";
import { LandingCard } from "./Cards/LandingProductCard";
import { CategoryCard } from "./Cards/CategoryCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Product, Category } from "Types/types";
import useCatalogueStore from "@store/catalogueStore";
import { useApiMutation, useApiQuery } from "@hooks/useQueries";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { Flex, rem } from "@mantine/core";
const Landing = () => {
  type QueryProps = {
    data: Product[];
    error: any;
    isLoading: boolean;
  };
  //--Temporal
  // let products: Product[] = [];
  // let isLoading: boolean = false;
  // let categories: Category[] = [];
  //--
  let isLoadingProds = false;
  const {
    data: products,
    error,
    isLoading,
  } = useApiQuery("GET|producto", null) as QueryProps;
  const { data: categories } = useApiQuery(
    "GET|categoria/all",
    null
  ) as QueryProps;

  // const items = categories?.map((category) => (
  //   <CategoryCard key={category.id} category={category} />
  // ));
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 4 },
  };
  const handlePrevClick = () => {
    carousel.slidePrev();
  };

  const handleNextClick = () => {
    carousel.slideNext();
  };

  let carousel: any;
  const slides = categories?.map((category) => (
    <Carousel.Slide key={category.id}>
      <CategoryCard key={category.id} category={category} />
    </Carousel.Slide>
  ));
  const mobile = useMediaQuery(`(max-width: 700px)`);
  return (
    <Container
      maxW="container.2xl"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      bg="#f9f6f6"
    >
      <Heading as="h1" size="xl" mb="2rem">
        El Buen Sabor
      </Heading>
      <Stack spacing={3} w="100%">
        <Heading as="h2" size="lg" mb="1rem">
          Categorías
        </Heading>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Carousel
              slideSize="30%"
              maw={"100%"}
              height={70}
              align="center"
              slideGap="xl"
              controlSize={25}
              dragFree
              withIndicators
              slidesToScroll={1}
              inViewThreshold={0}
              loop
              styles={{
                indicator: {
                  top: "5rem",
                  width: rem(12),
                  height: rem(4),
                  transition: "width 250ms ease",
                  background: "orange",
                  "&[data-active]": {
                    width: rem(40),
                  },
                },
                control: {
                  // "&[data-inactive]": {
                  //   opacity: 0,
                  //   cursor: "default",
                  // },
                  background: "orange",
                  color: "white",
                  width: "2rem",
                  height: "2rem",
                  boxShadow: "none",
                  border: "none"
                },
              }}
            >
              {slides}
            </Carousel>
          </>
        )}
        <Box>
          <Heading as="h2" size="lg">
            Productos destacados
          </Heading>
          {isLoadingProds ? (
            <Loader />
          ) : (
            <SimpleGrid
              w="100%"
              mt={4}
              spacing={3}
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
            >
              {products?.map((product) => (
                <LandingCard
                  key={"landing-card-" + product.id}
                  product={product}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb="1rem">
            Ofertas
          </Heading>
        </Box>
      </Stack>
    </Container>
  );
};
export default Landing;
