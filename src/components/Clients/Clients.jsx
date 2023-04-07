import {useEffect, useState} from "react";
import {API_SPRING} from "../../utils/utils";
import "./clients.scss";
import axios from "axios";
import {
  CardHeader,
  Card,
  CardBody,
  SimpleGrid,
  Text,
  Heading,
  CardFooter,
  Button,
  Highlight,
} from "@chakra-ui/react";
const Clients = () => {
  const [clients, setClients] = useState([]);
 /*  useEffect(() => {
    axios
      .get(API_SPRING)
      .then(({data}) => {
        setClients(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); */

  return (
    <div className="clients-container">
      <h1>{"Clients"}</h1>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {clients.map((client) => {
          return (
            <Card
              key={client.id}
              bg="gray.200"
              borderRadius="10px"
              backdropBlur={10}
            >
              <CardHeader>
                <Heading size="md">Cliente</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Nombre:
                  <Highlight
                    query={client.nombre}
                    styles={{px: "1", py: "1", bg: "orange.100"}}
                  >
                    {client.nombre}
                  </Highlight>
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </div>
  );
};
export default Clients;
