import React from 'react'
import { useColorScheme, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import {
  persistStore
} from 'redux-persist'
import theme, { darkTheme } from './utils/theme'
import {
  useFonts,
  Fraunces_300Light,
  Fraunces_500Medium,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces'
import { TabNavigator } from './navigation/tabNavigator'

const App = () => {
  const colorTheme = useColorScheme()
  let [fontsLoaded] = useFonts({
    Fraunces_300Light,
    Fraunces_500Medium,
    Fraunces_700Bold,
  });

  let persistor = persistStore(store)

  if (!fontsLoaded) {
    return <Text>Fonts loading...</Text>
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={colorTheme === 'dark' ? darkTheme : theme}>
          <NavigationContainer>
            <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
              <TabNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App; 
