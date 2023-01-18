import React from 'react'
import { useColorScheme, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from '@shopify/restyle'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useDispatch } from 'react-redux'
import { AppDispatch, store } from './redux/store'
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
import { getIngredients, getPlan } from './redux/slice/currentPlanSlice'
import SplashScreen from './pages/SplashScreen/SplashScreen'
import { addUser, getToken } from './redux/slice/userSlice'

//Wrapper component which enables the usage of useDispatch in App component
const AppWrapper = () => {
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
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}


const App = () => {
  //load ingredients and store them in redux store (ingredientSlice)
  const dispatch = useDispatch<AppDispatch>()

  // Load User
  const onBeforeLift = async () => {
    const name = store.getState().user.name

    // No Previous User persisted
    if (name === "") {
      await dispatch(addUser())
    } else {
      // Persisted User has been found
      await dispatch(getToken(name))
    }

    await dispatch(getIngredients())
    await dispatch(getPlan())
  }

  let persistor = persistStore(store)

  return (

    <PersistGate loading={<SplashScreen />} persistor={persistor} onBeforeLift={async () => await onBeforeLift()}>
      <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
        <TabNavigator />
      </SafeAreaView>
    </PersistGate>
  );
}

export default AppWrapper;  
