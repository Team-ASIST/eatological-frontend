import React from 'react';
import { useColorScheme, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@shopify/restyle';
import theme, { darkTheme } from './utils/theme';
import {
  useFonts,
  Fraunces_300Light,
  Fraunces_500Medium,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';ç

import Ionicons from 'react-native-vector-icons/Ionicons';
import CurrentPlan from './pages/CurrentPlanPage/CurrentPlanPage';
import NewPlanPage from './pages/NewPlanPage/NewPlanPage';
import GroceryListPage from './pages/GroceryListPage/GroceryListPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { RootStackParamList, RootTabParamList } from './navigation/types';

const NewPlan = createNativeStackNavigator<RootStackParamList>();

const PlanStackScreen = () => {
  return (
    <NewPlan.Navigator>
      <NewPlan.Screen name="MealQuantity" options={{ headerShown: false}} component={NewPlanPage} />
      <NewPlan.Screen name="Leftovers" options={{ headerShown: false}} component={NewPlanPage} />
    </NewPlan.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

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
    <ThemeProvider theme={colorTheme === 'dark' ? darkTheme : theme}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="CurrentPlan"
            screenOptions={
              ({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName : string = "";

                  if (route.name === 'NewPlan') {
                    iconName = focused
                      ? 'add'
                      : 'add-outline'
                  } else if (route.name === 'CurrentPlan') {
                    iconName = focused
                      ? 'basket'
                      : 'basket-outline';
                  } else if (route.name === 'GroceryList') {
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
                tabBarActiveTintColor: theme.colors.primaryButtonColor,
                tabBarInactiveTintColor: theme.colors.inactiveButtonColor,
              })}
          >
            <Tab.Screen
              name="NewPlan"
              component={PlanStackScreen}
              options={{ headerShown: false, tabBarStyle: { display: 'none' } }}
            />
            <Tab.Screen name="CurrentPlan" options={{ headerShown: false}} component={CurrentPlan} />
            <Tab.Screen name="GroceryList" options={{ headerShown: false}} component={GroceryListPage} />
            <Tab.Screen name="Settings" options={{ headerShown: false}} component={SettingsPage} />
          </Tab.Navigator>
        </NavigationContainer>
    </ThemeProvider>
  );
}

export default App; 