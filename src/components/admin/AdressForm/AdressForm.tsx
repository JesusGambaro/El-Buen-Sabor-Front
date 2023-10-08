import { Container, Group, NumberInput, TextInput } from "@mantine/core";
import { type JSX } from "react";
import { type Direccion } from "types/types";

interface AdressFormProps {
  value: Direccion[];
  onChange: (value: Direccion[]) => void;
}

const AdressForm = ({ value, onChange }: AdressFormProps): JSX.Element => {
  const adressFormState = value[0] ?? {
    calleNombre: "",
    numeracion: 0,
    aclaracion: "",
    departamento: "",
    nroPiso: 0,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange([
      {
        ...value[0],
        [event.currentTarget.name]: event.currentTarget.value,
      },
    ]);
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        padding: "0",
      }}
    >
      <Group grow>
        <TextInput
          required
          placeholder="Calle"
          label="Calle"
          name="calleNombre"
          type="text"
          onChange={handleChange}
          value={adressFormState.calleNombre}
        />
        <NumberInput
          required
          placeholder="Número"
          label="Número"
          name="numeracion"
          type="number"
          maxLength={5}
          max={99999}
          value={adressFormState.numeracion}
          onChange={(value) => {
            handleChange({
              currentTarget: {
                name: "numeracion",
                value,
              },
            } as any);
          }}
        />
      </Group>
      <Group grow>
        <TextInput
          placeholder="Departamento"
          label="Departamento"
          name="departamento"
          type="text"
          onChange={handleChange}
          value={adressFormState.departamento}
        />
        <NumberInput
          placeholder="Piso"
          label="Piso"
          name="nroPiso"
          type="number"
          onChange={(value) => {
            handleChange({
              currentTarget: {
                name: "nroPiso",
                value,
              },
            } as any);
          }}
          value={adressFormState.nroPiso}
        />
      </Group>
      <TextInput
        placeholder="Aclaración"
        label="Aclaración"
        name="aclaracion"
        type="text"
        onChange={handleChange}
        value={adressFormState.aclaracion}
      />
    </Container>
  );
};

export default AdressForm;
