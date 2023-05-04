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
import { useProducts } from "@hooks/useProducts";
import { useCategories } from "@hooks/useCategories";

const Landing = () => {
  const { data: products, isLoading: isLoadingProds } = useProducts();
  const { data: categories, isLoading } = useCategories();

  const items = categories?.map((category) => (
    <CategoryCard key={category.id} category={category} />
  ));  
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

  let carousel: any;
  return (
    <Container
      maxW="container.2xl"
      minH='100vh'
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
        <Box
          px="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            aria-label="Left"
            icon={<ChevronLeftIcon />}
            size="sm"
            borderRadius="2rem"
            bg="orange"
            color="white"
            _hover={{ bg: "orange.400" }}
            onClick={handlePrevClick}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <AliceCarousel
              mouseTracking
              items={items}
              responsive={responsive}
              disableDotsControls
              infinite
              ref={(el) => (carousel = el)}
              disableButtonsControls
            />
          )}
          <IconButton
            aria-label="Right"
            icon={<ChevronRightIcon />}
            size="sm"
            borderRadius="2rem"
            bg="orange"
            color="white"
            _hover={{ bg: "orange.400" }}
            onClick={handleNextClick}
          />
        </Box>
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
                  key={"landing-card-" + product.id_producto}
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
