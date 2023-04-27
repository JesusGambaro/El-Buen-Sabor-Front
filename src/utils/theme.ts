// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import { ChakraProps } from '@chakra-ui/react';
// 2. Add your color mode config in ts
const config: any = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

// 3. extend the theme
const theme: any = extendTheme({ config });

export default theme;

export const btnStyle: ChakraProps = {
  bg: "orange",
  color: "white",
  _hover: {
    bg: "orange.400",
  },
};