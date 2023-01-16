import { createBox } from '@shopify/restyle';
import { Theme } from '../utils/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { SafeAreaView } from 'react-native';
import MealQuantityScreen from '../pages/NewPlanPage/MealQuantity';
import LeftoversScreen from '../pages/NewPlanPage/LeftOvers';
import SwapMealsPage from '../pages/SwapMealsPage/SwapMealsPage';
import FoodPreferencesScreen from '../pages/NewPlanPage/FoodPreferences';

const NewPlan = createNativeStackNavigator<RootStackParamList>();
const Box = createBox<Theme>();

export const PlanStackScreen = () => {
    return (
      <Box backgroundColor="mainBackground" flex={1}>
        <SafeAreaView style={{ flex: 1 }}>
          <NewPlan.Navigator>
            <NewPlan.Screen name="MealQuantity" options={{ headerShown: false }} component={MealQuantityScreen} />
            <NewPlan.Screen name="LeftOvers" options={{ headerShown: false }} component={LeftoversScreen} />
            <NewPlan.Screen name="FoodPreferences" options={{ headerShown: false }} component={FoodPreferencesScreen} />
            <NewPlan.Screen name="SwapMeals" options={{ headerShown: false }} component={SwapMealsPage} />
          </ NewPlan.Navigator>
        </SafeAreaView>
      </Box>
    );
  }