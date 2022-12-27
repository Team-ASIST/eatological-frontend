import React from 'react';
import { useColorScheme, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBox, ThemeProvider } from '@shopify/restyle';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import theme, { darkTheme, Theme } from './utils/theme';
import {
  useFonts,
  Fraunces_300Light,
  Fraunces_500Medium,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CurrentPlan from './pages/CurrentPlanPage/CurrentPlanPage';
import GroceryListPage from './pages/GroceryListPage/GroceryListPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import SwapMealsPage from './pages/SwapMealsPage/SwapMealsPage';
import { RootStackParamList, RootTabParamList } from './navigation/types';
import MealQuantityScreen from './pages/NewPlanPage/MealQuantity';
import LeftoversScreen from './pages/NewPlanPage/Leftovers';

const NewPlan = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();
const Box = createBox<Theme>();

const PlanStackScreen = () => {
  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
        <NewPlan.Navigator>
          <NewPlan.Screen name="MealQuantity" options={{ headerShown: false }} component={MealQuantityScreen} />
          <NewPlan.Screen name="LeftOvers" options={{ headerShown: false }} component={LeftoversScreen} />
          <NewPlan.Screen name="SwapMeals" options={{ headerShown: false }} component={SwapMealsPage} />
        </ NewPlan.Navigator>
      </SafeAreaView>
    </Box>
  );
}

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
        <NavigationContainer>
          <Tab.Navigator initialRouteName="CurrentPlan"
            screenOptions={
              ({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: string = "";

                  if (route.name === 'NewPlan') {
                    iconName = focused
                      ? 'add'
                      : 'add-outline'
                  } else if (route.name === 'GroceryList') {
                    iconName = focused
                      ? 'basket'
                      : 'basket-outline';
                  } else if (route.name === 'CurrentPlan') {
                    iconName = focused
                      ? 'ios-list'
                      : 'ios-list-outline';
                  } else if (route.name === 'Settings') {
                    iconName = focused
                      ? 'settings'
                      : 'settings-outline';
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                // Hide the following routes from the bottom-tabs
                tabBarButton: [
                  "NewPlan"
                ].includes(route.name)
                  ? () => {
                    return null;
                  }
                  : undefined,
                tabBarActiveTintColor: theme.colors.primaryButtonColor,
                tabBarInactiveTintColor: theme.colors.inactiveButtonColor,
              })}
          >
            <Tab.Screen
              name="NewPlan"
              component={PlanStackScreen}
              options={{ headerShown: false, tabBarStyle: { display: 'none' }, unmountOnBlur: true }}
            />
            <Tab.Screen name="GroceryList" options={{ headerShown: false }} component={GroceryListPage} />
            <Tab.Screen name="CurrentPlan" options={{ headerShown: false }} component={CurrentPlan} />
            <Tab.Screen name="Settings" options={{ headerShown: false }} component={SettingsPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 
