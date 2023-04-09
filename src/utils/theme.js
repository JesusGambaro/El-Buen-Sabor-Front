// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({ config })

export default theme

export const btnStyle = {
  bg: "orange",
  color: "white",
  _hover: {
    bg: "orange.400",
  },
};