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
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  //load ingredients and store them in redux store (ingredientSlice)
  const dispatch = useDispatch<AppDispatch>()

  const onBeforeLift = () => {
    const name = store.getState().user.name

    if (name == "") {
      dispatch(addUser("")).then(
        () => dispatch(getToken(store.getState().user.name)).then(
          () => {
            dispatch(getIngredients())
            dispatch(getPlan())
          }
        )
      )
    } else {
      dispatch(getToken(name)).then(
        () => {
          dispatch(getIngredients())
          dispatch(getPlan())
        }
      )
    }
  }

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
      <PersistGate loading={<SplashScreen />} persistor={persistor} onBeforeLift={onBeforeLift}>
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
