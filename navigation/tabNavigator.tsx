import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts, Theme } from '../utils/theme';
import GroceryListPage from '../pages/GroceryListPage/GroceryListPage';
import CurrentPlan from '../pages/CurrentPlanPage/CurrentPlanPage';
import { PlanStackScreen } from './newPlanNavigator';
import RecipePage from '../pages/RecipePage/RecipePage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import { useTheme } from '@shopify/restyle';


const Tab = createBottomTabNavigator<RootTabParamList>();

export const TabNavigator = () => {
    const theme = useTheme<Theme>()

    return (
        <Tab.Navigator initialRouteName="CurrentPlan"
            screenOptions={
                ({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = "";

                        if (route.name === 'GroceryList') {
                            iconName = focused
                                ? 'cart'
                                : 'cart-outline';
                        } else if (route.name === 'CurrentPlan') {
                            iconName = focused
                                ? 'list'
                                : 'list-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused
                                ? 'settings'
                                : 'settings-outline';
                        }

                        return <Ionicons name={iconName} size={route.name === 'CurrentPlan' ? size : size} color={color} />;
                    },
                    // Hide the following routes from the bottom-tabs
                    tabBarButton: [
                        "NewPlan", "Recipe"
                    ].includes(route.name)
                        ? () => {
                            return null;
                        }
                        : undefined,

                    tabBarActiveTintColor: theme.colors.accent,
                    tabBarInactiveTintColor: theme.colors.navigationButtonColor,
                    tabBarLabelStyle: {
                        fontFamily: fonts.light,
                        fontSize: 12,
                    }
                })}
        >
            <Tab.Screen
                name="NewPlan"
                component={PlanStackScreen}
                options={{ headerShown: false, tabBarStyle: { display: 'none' }, unmountOnBlur: true }}
            />
            <Tab.Screen name="GroceryList" options={{ headerShown: false, title: "Einkaufsliste", unmountOnBlur: true }} component={GroceryListPage} />
            <Tab.Screen name="CurrentPlan" options={{ headerShown: false, title: "Aktueller Plan" }} component={CurrentPlan} />
            <Tab.Screen name="Recipe" options={{ headerShown: false, title: "Rezept", unmountOnBlur: true }} component={RecipePage} />
            <Tab.Screen name="Settings" options={{ headerShown: false, title: "Einstellungen" , unmountOnBlur: true }} component={SettingsPage} />
        </Tab.Navigator>
    )
}