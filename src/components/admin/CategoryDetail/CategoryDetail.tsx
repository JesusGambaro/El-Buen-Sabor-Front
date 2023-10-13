import { useApiQuery } from "@hooks/useQueries";
import { Container, Textarea } from "@mantine/core";
import { type Categoria } from "types/types";
import { useParams } from "react-router-dom";

interface QueryProps {
  data: Categoria;
  error: any;
  isLoading: boolean;
}

const CategoryDetail = (): JSX.Element => {
  const { id } = useParams();

  const {
    data: category,
    error,
    isLoading,
  } = useApiQuery("GET|categoria/" + id) as QueryProps;
  return (
    <Container>
      <h1>CategoryDetail</h1>
      <Textarea
        label="JSON"
        placeholder="JSON"
        minRows={20}
        value={JSON.stringify(category, null, 2)}
      />
    </Container>
  );
};

export default CategoryDetail;
