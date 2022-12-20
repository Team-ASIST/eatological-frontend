import React from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import RecipeCard, { RecipeCardProps } from "../../components/ui/recipe/recipeCard";
import { SafeAreaView } from "react-native-safe-area-context";
import recipeCard from "../../components/ui/recipe/recipeCard";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectAllRecipes } from "../../redux/slice/currentPlanSlice";
import { RecipeSwipeObject } from "../SwapMealsPage/SwapMealsCalls";
import { Meal } from "../../utils/dataTypes";

const Text = createText<Theme>();
const Box = createBox<Theme>();

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const CurrentPlan = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const recipes = useSelector(selectAllRecipes)

  console.log(recipes)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(250).then(() => setRefreshing(false));
  }, []);

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {
            recipes.map((el: Meal) => {
              return <RecipeCard key={el.id} imageSource={el.recipe.imageUrl} cookingTime={el.recipe.prepTime} recipeName={el.recipe.name} ready={Math.random() < 0.5} persons={el.portions} />
            })
          }
        </ScrollView>
      </SafeAreaView >
    </Box>

  );
}

export default CurrentPlan; 