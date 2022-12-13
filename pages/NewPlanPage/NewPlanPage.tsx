import React, { useState } from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MealQuantityScreen from './MealQuantity'
import LeftoversScreen from './Leftovers'
import SwapMealsPage from '../SwapMealsPage/SwapMealsPage'

export type NewPlanPageProps = {
    navigation: NavigationScreenProp<any, any>
}
const Stack = createNativeStackNavigator()

const NewPlanPage = ({ navigation }: NewPlanPageProps) => {
    return (
        <Stack.Navigator initialRouteName="Mealquantity" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Mealquantity" component={MealQuantityScreen} />
            <Stack.Screen name="Leftovers" component={LeftoversScreen} />
            <Stack.Screen name="Swapmeals" component={SwapMealsPage} />
        </Stack.Navigator>
    )
}

export default NewPlanPage
