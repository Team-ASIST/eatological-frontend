import React from "react";
import { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { TouchableOpacity, ImageBackground, Image, Dimensions } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { RecipeCardProps } from "../../components/ui/recipe/recipeCard";
import recipeCard from "../../components/ui/recipe/recipeCard";

import { Ingredient, Meal, Recipe, Plan } from "../../utils/dataTypes"
import { HiddenCard } from "../../components/ui/recipe/hiddenSwipeButtons";"../../components/ui/recipe/hiddenSwipeButtons"
import { getInitialPlan, getListWithOldRecipe, getListWithNewRecipe } from "./SwapMealsCalls"
import { RecipeSwipeElement }  from "./SwapMealsCalls"

const Text = createText<Theme>();
const Box = createBox<Theme>();

// TypeScript Setup

export type SwapMealsPageProps = {
  navigation: NavigationScreenProp<any, any>
};

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const SwapMealsPage = ({ navigation }: SwapMealsPageProps) => {
  // Load Initial data for recipes
  const meals = [{ id: 0, amount: 2 }, { id: 1, amount: 3 }]

  const [recipeList, setRecipeList] = useState([] as RecipeSwipeElement[])
  getInitialPlan(meals).then(
    recipes => {setRecipeList(recipes)}
  ).catch(
    error => {console.log(error)}
  )

  // Handle Swiping Input
  const swipeLeft = async (rowKey: any) => {
    console.log('onLeftAction', rowKey as number);
    //TODO Load previous recipe at rowKey in recipeList
    const newList = await getListWithOldRecipe(recipeList)
    setRecipeList(newList)

  };

  const swipeRight = async (rowKey: any) => {
    console.log('onRightAction', rowKey as number);
    //TODO Load new recipe at rowKey in recipeList
    const newList = await getListWithNewRecipe(recipeList)
    setRecipeList(newList)
  };

  const onRowDidOpen = async (rowKey: any, rowMap: any) => {
    await wait(1000)
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  return (
    <Box paddingTop={"l"} padding={"s"} backgroundColor="mainBackground" flex={1}>

      <SwipeListView
        data={recipeList} // recipeList new branch
        keyExtractor={(data) => "" + data.id}

        onRowDidOpen={onRowDidOpen}

        stopLeftSwipe={75}
        stopRightSwipe={-75}

        leftActivationValue={70}
        rightActivationValue={-70}
        leftActionValue={70}
        rightActionValue={-70}

        onLeftAction={swipeLeft}
        onRightAction={swipeRight}

        renderItem={(data, rowMap) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Box paddingTop={"m"}>
              {
                recipeCard({
                  imageSource: data.item.recipe.imageSource,
                  cookingTime: 10,
                  recipeName: data.item.recipe.name,
                  ready: true,
                  persons: data.item.portions
                } as RecipeCardProps)
              }
            </Box>
          </TouchableOpacity>
        )}
        renderHiddenItem={(data, rowMap) => (
          HiddenCard(swipeLeft, swipeRight, data.item.id)
        )}
        leftOpenValue={50}
        rightOpenValue={-50}
      />

    </Box >
  );
}

export default SwapMealsPage; 