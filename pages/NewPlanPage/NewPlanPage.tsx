import React, { useState } from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MealQuantityScreen from './MealQuantity'
import LeftoversScreen from './Leftovers'
import { Theme } from '../../utils/theme';
import { createBox, createText } from '@shopify/restyle';
import { SafeAreaView } from 'react-native'
import SwapMealsPage from '../SwapMealsPage/SwapMealsPage'

export type NewPlanPageProps = {
    navigation: NavigationScreenProp<any, any>
}
const Stack = createNativeStackNavigator()
const Box = createBox<Theme>();

const NewPlanPage = ({ navigation }: NewPlanPageProps) => {
    return (
        <Box backgroundColor="mainBackground" flex={1}>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack.Navigator initialRouteName="Mealquantity" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Mealquantity" component={MealQuantityScreen} />
                    <Stack.Screen name="Leftovers" component={LeftoversScreen} />
                    <Stack.Screen name="SwapMeals" component={SwapMealsPage} />
                </Stack.Navigator>
            </SafeAreaView>
        </Box>

    )
}

export default NewPlanPage
