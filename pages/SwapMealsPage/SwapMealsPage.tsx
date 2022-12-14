import React from "react";
import { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { TouchableOpacity, ImageBackground, Image, Dimensions } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import RecipeCard, { RecipeCardProps } from "../../components/ui/recipe/recipeCard";
import recipeCard from "../../components/ui/recipe/recipeCard";
import { HiddenCard } from "../../components/ui/recipe/hiddenSwipeButtons"; "../../components/ui/recipe/hiddenSwipeButtons"
import { getInitialPlan, getListWithOldRecipe, getListWithNewRecipe } from "./SwapMealsCalls"
import { RecipeSwipeObject } from "./SwapMealsCalls"
import { IMealAmount, resetPlanConfiguration, selectNewPlanConfiguration } from "../../redux/slice/newPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigationButtonContainer } from "../../components/ui/inputs/NavigationButton";

const Text = createText<Theme>()
const Box = createBox<Theme>()

// TypeScript Setup

export type SwapMealsPageProps = {
  navigation: NavigationScreenProp<any, any>
};

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const SwapMealsPage = ({ navigation }: SwapMealsPageProps) => {
  // Load Initial data for recipes
  const { mealAmount, leftovers, preferences } = useSelector(selectNewPlanConfiguration)
  const [swipeTracker, setSwipeTracker] = useState(Array(mealAmount.length).fill(0) as number[])
  const [recipeList, setRecipeList] = useState([] as RecipeSwipeObject[])
  const dispatch = useDispatch()

  useEffect(() => {
    getInitialPlan(mealAmount.map((m: IMealAmount) => m.amount), leftovers, preferences).then(
      (recipes: RecipeSwipeObject[]) => {
        setRecipeList(recipes)
        setSwipeTracker(Array(recipes.length).fill(0))
      }
    ).catch(
      error => { console.error(error) }
    )
  }, [])

  // Handle Swiping Input
  const swipeLeft = async (rowKey: any) => {
    if (swipeTracker[rowKey] <= 0) {
      //TODO handle error
      return
    }

    setRecipeList(await getListWithOldRecipe(recipeList, rowKey))

    swipeTracker[rowKey] -= 1
    setSwipeTracker(swipeTracker)
  };

  const swipeRight = async (rowKey: any) => {
    // Fix this Hack
    const tempRecipes = recipeList
    setRecipeList(await getListWithNewRecipe(recipeList, rowKey))

    swipeTracker[rowKey] += 1
    setSwipeTracker(swipeTracker)
  };

  const onRowDidOpen = async (rowKey: any, rowMap: any) => {
    await wait(1000)
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  return (
    <Box paddingTop={"l"} backgroundColor="mainBackground" flex={1}>

      <SwipeListView
        data={recipeList}
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
          <TouchableOpacity activeOpacity={1}>
            <Box paddingTop={"m"}>
              <RecipeCard
                imageSource={data.item.recipe.imageUrl}
                cookingTime={10}
                recipeName={data.item.recipe.name}
                ready={true}
                persons={data.item.portions}
              />
            </Box>
          </TouchableOpacity>
        )}
        renderHiddenItem={(data, rowMap) => (
          HiddenCard(swipeLeft, swipeLeft, data.item.id)
        )}
        leftOpenValue={50}
        rightOpenValue={-50}
      />
      <NavigationButtonContainer
        onPressLeft={() => {
          dispatch(resetPlanConfiguration())
          navigation.navigate('CurrentPlan')
        }}
        textLeft="Cancel"
        onPressRight={() => {
          dispatch(resetPlanConfiguration())
          navigation.navigate('CurrentPlan')
        }}
        textRight="Finish" />
    </Box >
  );
}

export default SwapMealsPage; 
