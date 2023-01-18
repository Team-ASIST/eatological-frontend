import React from "react";
import { createBox } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import RecipeCard from "../../components/ui/recipe/RecipeCard";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getGroceries, getPlan, selectAllGroceries, selectAllRecipes, selectUpdatingPlan } from "../../redux/slice/currentPlanSlice";
import { Meal, smallIngredient } from "../../utils/dataTypes";
import { FloatingActionButton } from "../../components/ui/inputs/FloatingActionButton";
import { NavigationScreenProp } from 'react-navigation'
import { AppDispatch } from "../../redux/store";

const Box = createBox<Theme>()

type CurrentPlanProps = {
  navigation: NavigationScreenProp<any, any>
}

// Returns the CurrentPlanPage containing the current Plan including all recipes
const CurrentPlan = ({ navigation }: CurrentPlanProps) => {
  const recipes = useSelector(selectAllRecipes)
  const updating = useSelector(selectUpdatingPlan)
  const groceries = useSelector(selectAllGroceries)
  const dispatch = useDispatch<AppDispatch>()

  /** 
   * Determines whether all required ingredients in the recipes were bought in GroceryListPage
   * @param items required items in the recipe
   * @returns boolean stating whether recipe is cookable
   */
  const checkIfCookable = (items: smallIngredient[]) => {
    let isReady = true

    for (const inrd of items) {
      let largeGrocery = groceries.find(largeGrocery => largeGrocery.ingredientId === inrd.id)

      if (largeGrocery) {
        if (Number(largeGrocery.grocery.bought.toPrecision(2)) < Number(inrd.quantity.toPrecision(2))) {
          isReady = false
          break
        }
      }
    }

    return isReady
  }

  // Fetches the current Plan and Groceries from the Backend if user drags the List down
  const onRefresh = React.useCallback(() => {
    dispatch(getPlan())
    dispatch(getGroceries())
  }, []);

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={updating}
          onRefresh={onRefresh}
        />
      }>
        {
          recipes.map((el: Meal) => {
            return <RecipeCard
              key={el.id}
              imageSource={el.recipe.imageUrl}
              cookingTime={el.recipe.prepTime}
              recipeName={el.recipe.name}
              ready={el.cooked || checkIfCookable(el.recipe.items)}
              cooked={el.cooked}
              persons={el.portions}
              onClick={() => { navigation.navigate('Recipe', { mealId: el.id }) }}
            />
          })
        }
      </ScrollView>
      <FloatingActionButton route="NewPlan" navigation={navigation} />
    </Box>

  );
}

export default CurrentPlan; 