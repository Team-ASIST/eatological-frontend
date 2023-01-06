import React, { useEffect, useState } from 'react'
import { useColorScheme, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useDispatch } from 'react-redux'
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
import { ingredientAdded } from './redux/slice/ingredientSlice';
import { Ingredient } from './utils/dataTypes';
import { ingredients } from './utils/axios/planUsageCalls';
//Wrapper component which enables the usage of useDispatch in App component
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  //load ingredients and store them in redux store (ingredientSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    ingredients()
      .then(ingredients => {
        ingredients.map((item: Ingredient) => dispatch(ingredientAdded(item)))
      })
      .catch((error) => console.error(error))
  }, []
  )

  const colorTheme = useColorScheme();
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

export default AppWrapper; 
