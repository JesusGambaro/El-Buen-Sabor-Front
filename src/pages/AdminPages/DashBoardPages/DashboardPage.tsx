import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement
);
import { Paper, Tabs } from "@mantine/core";

type Props = {};
import { Container } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { ChartPie, ReportMoney, Users } from "tabler-icons-react";
//REGISTER CHARTS

const DashboardPage = (props: Props) => {
  const dataDoughnut = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const labelsLine = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataLine = {
    labels: labelsLine,
    datasets: [
      {
        label: "Dataset 1",
        data: labelsLine.map(() => Math.floor(Math.random() * 1000) - 1000),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labelsLine.map(() => Math.floor(Math.random() * 1000) - 1000),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const labelsBar = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: "Dataset 1",
        data: labelsBar.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labelsBar.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const navigate = useNavigate();
  const { tabValue } = useParams();
  return (
    <Tabs
      color="orange"
      variant="default"
      radius="md"
      keepMounted={false}
      value={tabValue}
      onTabChange={(value) => navigate(`/admin/dashboard/${value}`)}
    >
      <Tabs.List grow position="center" h={50} mt="md">
        <Tabs.Tab
          value="rankingComidas"
          icon={<ChartPie size="1.2rem" />}
          fz="lg"
        >
          Ranking de comidas
        </Tabs.Tab>
        <Tabs.Tab value="ingresos" icon={<ReportMoney size="1.2rem" />} fz="lg">
          Ingresos
        </Tabs.Tab>
        <Tabs.Tab
          value="rankingClientes"
          icon={<Users size="1.2rem" />}
          fz="lg"
        >
          Ranking de clientes
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="rankingComidas" mt="xl">
        <Container size={500}>
          <Doughnut data={dataDoughnut} />
        </Container>
      </Tabs.Panel>
      <Tabs.Panel value="ingresos" mt="xl">
        <Container size={1000}>
          <Line options={optionsLine} data={dataLine} />
        </Container>
      </Tabs.Panel>
      <Tabs.Panel value="rankingClientes" mt="xl">
        <Container size={1000}>
          <Bar options={optionsBar} data={dataBar} />
        </Container>
      </Tabs.Panel>
    </Tabs>
  );
};

export default DashboardPage;
