import React from "react";
import { Container } from "@chakra-ui/react";
import SidebarAdmin from "@admin/Sidebar/Sidebar";
interface Props {}
import { useAuth0 } from "@auth0/auth0-react";

const IndexAdmin = () => {
  const { user } = useAuth0();
  if (!user) return <div>Loading...</div>;
  console.log(user['http://example.com/roles']);
  const roles = user['http://example.com/roles'];
  console.log(roles);
  
  return (
    <div>
      <Container maxW="100vw" bg="#f9f6f6" p="0" h="100vh">
        <SidebarAdmin />
      </Container>
    </div>
  );
};

export default IndexAdmin;
