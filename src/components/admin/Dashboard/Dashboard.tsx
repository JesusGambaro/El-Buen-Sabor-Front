import { useRef, useEffect } from "react";
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

import { TabList, Tab, Tabs, TabPanels, TabPanel } from "@chakra-ui/react";
type Props = {};
import { Container } from "@mantine/core";
//REGISTER CHARTS

const Dashboard = (props: Props) => {
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
  return (
    <Tabs
      isFitted
      variant="solid-rounded"
      colorScheme="orange"
      mt={10}
      size="lg"
    >
      <TabList mb="1em">
        <Tab>Ranking de comidas</Tab>
        <Tab>Ingresos</Tab>
        <Tab>Ranking de clientes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Container size={500}>
            <Doughnut data={dataDoughnut} />
          </Container>
        </TabPanel>
        <TabPanel>
          <Container size={1000}>
            <Line options={optionsLine} data={dataLine} />;
          </Container>
        </TabPanel>
        <TabPanel>
          <Container size={1000}>
            <Bar options={optionsBar} data={dataBar} />;
          </Container>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Dashboard;
