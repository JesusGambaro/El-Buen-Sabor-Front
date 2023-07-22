import { type MantineTheme } from "@mantine/core";
// 2. Add your color mode config in ts
export const mainColor: string = "#dd6b20";

export const mantineTheme = {
  components: {
    Input: {
      styles: (theme: MantineTheme) => ({
        input: {},
      }),
    },
  },
};
