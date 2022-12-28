import React from 'react';
import { useColorScheme, Text } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import theme, { darkTheme, Theme } from './utils/theme';
import {
  useFonts,
  Fraunces_300Light,
  Fraunces_500Medium,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import { TabNavigator } from './navigation/tabNavigator';

const App = () => {
  const colorTheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    Fraunces_300Light,
    Fraunces_500Medium,
    Fraunces_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Fonts loading...</Text>
  }
  return (
    <Provider store={store}>
      <ThemeProvider theme={colorTheme === 'dark' ? darkTheme : theme}>
        <TabNavigator />
      </ThemeProvider>
    </Provider>
  );
}

export default App; 
