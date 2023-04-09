import React from "react";
import {
  SimpleGrid,
  Heading,
  Container,
  Stack,
  Box,
  Card,
  IconButton
} from "@chakra-ui/react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import "./landing.scss";
import { useEffect } from "react";
import { getCategories, getLandingProducts } from "@redux/reducers/mainReducer"
import { useDispatch, useSelector } from "react-redux";
import Loader from "@components/Loader/Loader";
import { LandingCard } from "./Cards/LandingProductCard";
import { CategoryCard } from "./Cards/CategoryCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Landing = () => {
  const dispatch = useDispatch();
  const { loading, landingProducts: products, categories } = useSelector((state) => state.landing);

  useEffect(() => {
    dispatch(getLandingProducts());
    dispatch(getCategories());
  }, []);

  const items = categories.map((category) => (
    <CategoryCard key={category.id} category={category} />)
  );

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 6 },
  };
  const handlePrevClick = () => {
    carousel.slidePrev();
  };

  const handleNextClick = () => {
    carousel.slideNext();
  };

  let carousel;
  return (
    <Container maxW="container.xl"
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="xl" mb="2rem">
        El Buen Sabor
      </Heading>
      <Stack spacing={3} w="100%" >
        <Heading as="h2" size="lg" mb="1rem">
          Categorías
        </Heading>
        <Box px="1rem" display="flex" justifyContent="space-between" alignItems="center"
        >
          <IconButton aria-label="Left" icon={<ChevronLeftIcon />} size="sm"
            borderRadius="2rem" bg="orange" color="white" _hover={{ bg: "orange.400" }}
            onClick={handlePrevClick}
          />
          {loading ? (
            <Loader />) :
            <AliceCarousel
              mouseTracking
              items={items}
              responsive={responsive}
              disableDotsControls
              infinite
              ref={(el) => (carousel = el)}
              disableButtonsControls
            />
          }
          <IconButton aria-label="Right" icon={<ChevronRightIcon />} size="sm"
            borderRadius="2rem" bg="orange" color="white" _hover={{ bg: "orange.400" }}
            onClick={handleNextClick}
          />
        </Box>
        <Box >
          <Heading as="h2" size="lg">
            Productos destacados
          </Heading>
          {loading ? (
            <Loader />) : (
            <SimpleGrid
              w="100%"
              mt={4}
              spacing={3} columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
              {products.map((product) => (
                <LandingCard key={product.id} product={product} />
              )
              )}
            </SimpleGrid>)}
        </Box>
        <Box bg='pink.100'>
          <Heading as="h2" size="lg" mb="1rem">
            Ofertas
          </Heading>
        </Box>
      </Stack>

    </Container >
  );
};
export default Landing;
