import React from "react";
import { Container } from "@chakra-ui/react";
import SidebarAdmin from "@admin/Sidebar/Sidebar";
interface Props {}

const IndexAdmin = () => {  
  return (
    <div>
      <Container maxW="100vw" bg="#f9f6f6" p="0" h="100vh">
        <SidebarAdmin />
      </Container>
    </div>
  );
};

export default IndexAdmin;
