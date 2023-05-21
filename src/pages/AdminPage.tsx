import { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import InvalidAuthDialog from "@app/InvalidAuthDialog/InvalidAuthDialog";
import { Outlet } from "react-router-dom";
import NavBarAdmin from "@components/admin/NavBarAdmin/NavBarAdmin";
import SidebarAdmin from "@components/admin/Sidebar/Sidebar";

const AdminPage = () => {
  const { isAuthenticated }: any = useAuth0();

  useEffect(() => {
    // console.clear();
  }, [isAuthenticated]);

  return (
    <Container maxW="100vw" bg="#f9f6f6" p="0" h="100vh">
      <NavBarAdmin />
      <InvalidAuthDialog />
      <Container
        overflowY="auto"
        p={3}
        h="calc(100vh - 5.5rem)"
        position="fixed"
        maxW="calc(100vw - 20rem)"
        top="5.5rem"
        left="20rem"
        zIndex={2}
      >
        <Outlet />
      </Container>
      <SidebarAdmin />
    </Container>
  );
};
export default AdminPage;
