import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { NavBarAdmin } from "@components/admin/NavBarAdmin/NavBarAdmin";
import { Grid } from "@mantine/core";
import { TopHeader } from "@components/admin/Header/Header";

const AdminPage = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/dashboard/rankingComidas");
    }
  }, [location.pathname]);

  return (
    <Grid maw="100%" columns={2} mah="100vh" m={0}>
      <Grid.Col span="content">
        <NavBarAdmin />
      </Grid.Col>
      <Grid.Col span="auto" mah="100vh">
        <Grid maw="100" m={0}>
          <Grid.Col h={60}>
            <TopHeader />
          </Grid.Col>
          <Grid.Col mah="calc(100vh - 60px)">
            <Outlet />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};
export default AdminPage;
