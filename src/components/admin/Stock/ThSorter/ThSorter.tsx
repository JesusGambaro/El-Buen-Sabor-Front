import { Center, Group, Text, UnstyledButton } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
import { useMantineTheme } from "@utils/theme";

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  width?: number | string;
  onSort: () => void;
}

const Th = ({
  children,
  reversed,
  sorted,
  onSort,
  width,
}: ThProps): JSX.Element => {
  const { classes } = useMantineTheme();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;

  return (
    <th className={classes.th} style={{ width }}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
};

export default Th;
