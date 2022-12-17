import React from "react";
import { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { TouchableOpacity } from "react-native";
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
import Ionicons from 'react-native-vector-icons/Ionicons';

const Text = createText<Theme>()
const Box = createBox<Theme>()

// TypeScript Setup

export type SwapMealsPageProps = {
  navigation: NavigationScreenProp<any, any>
};

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

const TopBar = () => {
  return (
    <Box marginTop="l" marginHorizontal="xs" padding="m">
      <Text variant="subheader">Choose your Recipes...</Text>
      <Box flexDirection={"row"} flexGrow={1}>
        <Box flex={1} justifyContent={"flex-start"} alignItems={"center"} flexDirection={"row"}>
          <Ionicons name="arrow-back-circle-outline" size={20} color="black" />
          <Text paddingLeft={"xs"} variant={"body"} color={"secondaryCardText"}>
            Prev
          </Text>
        </Box>
        <Box flex={1} justifyContent={"flex-end"} alignItems={"center"} flexDirection={"row"}>
          <Text paddingRight={"xs"} variant={"body"} color={"secondaryCardText"}>
            Next
          </Text>
          <Ionicons name="arrow-forward-circle-outline" size={20} color="black" />
        </Box>
      </Box>
    </Box>
  )
}

const SwapMealsPage = ({ navigation }: SwapMealsPageProps) => {
  // Load Initial data for recipes
  const { mealAmount, leftovers, preferences } = useSelector(selectNewPlanConfiguration)
  const [swipeTracker, setSwipeTracker] = useState(Array(mealAmount.length).fill(0) as number[])
  const [recipeList, setRecipeList] = useState([] as RecipeSwipeObject[])
  const [loading, setLoading] = useState(false)
  const [lastLoadTimestamp, setLastLoadTimestamp] = useState(new Date())

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
  const swipeLeft = async (rowKey: any, rowMap: any) => {
    if (swipeTracker[rowKey] > 0 && !loading) {
      setLoading(true)
      const newPlan = await getListWithOldRecipe(recipeList, rowKey)
      setRecipeList(newPlan)

      // Reset State and Update SwipeTracker
      swipeTracker[rowKey] -= 1
      setSwipeTracker(swipeTracker)
      setLoading(false)
    }
    rowMap[rowKey].closeRow()
  };


  const swipeRight = async (rowKey: any, rowMap: any) => {
    if (!loading) {
      setLoading(true)
      const newPlan = await getListWithNewRecipe(recipeList, rowKey)
      setRecipeList(newPlan)

      // Reset State and Update SwipeTracker
      swipeTracker[rowKey] += 1
      setSwipeTracker(swipeTracker)
      setLoading(false)
    }
    rowMap[rowKey].closeRow()
  };

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <TopBar />

      <SwipeListView
        data={recipeList}
        keyExtractor={(data) => "" + data.id}
        useFlatList={true}

        disableLeftSwipe={loading}
        disableRightSwipe={loading}

        stopLeftSwipe={50}
        stopRightSwipe={-50}

        leftActivationValue={25}
        rightActivationValue={-25}
        leftActionValue={50}
        rightActionValue={-50}

        onLeftAction={swipeLeft}
        onRightAction={swipeRight}

        previewRowKey={"0"}
        previewDuration={1000}
        previewOpenValue={-50}

        showsVerticalScrollIndicator={false}

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
          <HiddenCard loading={loading} />
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
