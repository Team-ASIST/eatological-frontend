import React, { useState } from 'react';
import { useColorScheme, Text, View, Button } from 'react-native';
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
} from '@expo-google-fonts/fraunces';

import Ionicons from 'react-native-vector-icons/Ionicons';


// All Screens
const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const NewPlanScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>New Plan!</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate('Current Plan')}
      />
    </View>
  );
}

const CurrentPlan = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Current Plan!</Text>
    </View>
  );
}

const List = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Shopping List!</Text>
    </View>
  );
}

// Stack Navigator for new Plans
const NewPlan = createNativeStackNavigator();

const PlanStackScreen = () => {
  return (
    <NewPlan.Navigator>
      <NewPlan.Screen name="MealQuantity" component={NewPlanScreen} />
      <NewPlan.Screen name="Leftovers" component={NewPlanScreen} />
    </NewPlan.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

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
        <Tab.Navigator initialRouteName="Current Plan"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'New Plan') {
                iconName = focused
                  ? 'add'
                  : 'add-outline'
              } else if (route.name === 'Current Plan') {
                iconName = focused
                  ? 'basket'
                  : 'basket-outline';
              } else if (route.name === 'Shopping List') {
                iconName = focused
                  ? 'ios-list'
                  : 'ios-list-outline';
              } else if (route.name === 'Settings') {
                iconName = focused
                  ? 'settings'
                  : 'settings-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="New Plan"
            component={PlanStackScreen}
            options={{ headerShown: false, tabBarStyle: { display: 'none' } }}
          />
          <Tab.Screen name="Current Plan" component={CurrentPlan} />
          <Tab.Screen name="Shopping List" component={List} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App; 