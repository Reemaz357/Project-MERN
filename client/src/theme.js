import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
 
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '  linear-gradient(45deg,rgba(2, 0, 36, 1) 25%, rgba(9, 9, 121, 1) 100%)':'radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)',
        backgroundImage: props.colorMode === 'dark'
          ? "url('/dark.jpeg')"
          : "url('/light.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        minHeight: '100vh'
      },
    }),
  },
  colors: {
    brand: {
      50: '#582f0e',
      100: '#7f4f24',
      200: '#936639',
      300: '#a68a64',
      400: '#bda34dff',
      500: '#c2c5aa',
      600: '#4f610fff',
      700: '#656d4a',
      800: '#414833',
      900: '#333d29',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});

export default theme;