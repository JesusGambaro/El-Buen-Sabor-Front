import { Card, Heading, CardBody, Image, IconButton } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Category } from "Types/types";

export const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Card
      w="10rem"
      key={"category" + category.id}
      borderRadius="2rem"
      size="sm"
      my="1rem"
      boxShadow="md"
    >
      <CardBody
        display="flex"
        flexDirection="column"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Image
          src={category.img}
          alt={category.name}
          borderRadius="50%"
          boxSize="4rem"
          objectFit="cover"
          m="auto"
        />
        <Heading size="sm" mt="4">
          {category.name}
        </Heading>
        <IconButton
          aria-label="Go to category"
          icon={<ChevronRightIcon />}
          size="sm"
          mt="1rem"
          borderRadius="2rem"
          bg="orange"
          color="white"
          _hover={{ bg: "orange.400" }}
        />
      </CardBody>
    </Card>
  );
};
