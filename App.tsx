import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import theme, { darkTheme } from './utils/theme';
import React from 'react';
import ThemeExample from './pages/themeExample/themeExample';
import { useColorScheme } from 'react-native';
import {
  useFonts,
  Fraunces_300Light,
  Fraunces_500Medium,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';

const App = () => {
  const colorTheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    Fraunces_300Light,
    Fraunces_500Medium,
    Fraunces_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Fonts loading</Text>
  }

  return (
    <ThemeProvider theme={colorTheme === 'dark' ? darkTheme : theme}>
      <ThemeExample />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default App; 
