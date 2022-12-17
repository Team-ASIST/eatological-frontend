import React from "react";
import { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { TouchableOpacity} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import RecipeCard, { RecipeCardProps } from "../../components/ui/recipe/recipeCard";
import { HiddenCard, HiddenCardProps } from "../../components/ui/recipe/hiddenCard"; "../../components/ui/recipe/hiddenSwipeButtons"
import { getInitialPlan, getListWithOldRecipe, getListWithNewRecipe } from "./SwapMealsCalls"
import { RecipeSwipeObject } from "./SwapMealsCalls"
import { IMealAmount, resetPlanConfiguration, selectNewPlanConfiguration } from "../../redux/slice/newPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigationButtonContainer } from "../../components/ui/inputs/NavigationButton";
import { updateRecipes } from "../../redux/slice/currentPlanSlice";
import { Meal, Recipe } from "../../utils/dataTypes";

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
  const [loading, setLoading] = useState(false)

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

    setLoading(true)
    setRecipeList(await getListWithOldRecipe(recipeList, rowKey))
    swipeTracker[rowKey] -= 1
    setSwipeTracker(swipeTracker)
    setLoading(false)
  };

  const swipeRight = async (rowKey: any) => {
    setLoading(true)
    setRecipeList(await getListWithNewRecipe(recipeList, rowKey))

    swipeTracker[rowKey] += 1
    setSwipeTracker(swipeTracker)
    setLoading(false)
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

        leftActivationValue={50}
        rightActivationValue={-50}
        leftActionValue={50}
        rightActionValue={-50}

        onLeftAction={swipeLeft}
        onRightAction={swipeRight}

        previewRowKey={"0"}
        previewDuration={1000}
        previewOpenValue={-50}

        renderItem={(data, rowMap) => (
          <TouchableOpacity activeOpacity={1}>
            <Box paddingTop={"m"}>
              <RecipeCard
                imageSource={data.item.recipe.imageUrl}
                cookingTime={10}
                recipeName={data.item.recipe.name}
                persons={data.item.portions}
                ready={false} />
            </Box>
          </TouchableOpacity>
        )}
        renderHiddenItem={(data, rowMap) => (
          <HiddenCard loading={loading}/>
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
          dispatch(updateRecipes({
            recipes: recipeList.map((r: RecipeSwipeObject) => {
              return {
                id: r.id,
                recipe: r.recipe,
                portions: r.portions
              } as Meal
            })
          }))
          dispatch(resetPlanConfiguration())
          navigation.navigate('CurrentPlan')
        }}
        textRight="Finish" />
    </Box >
  );
}

export default SwapMealsPage; 
