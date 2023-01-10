import React from "react";
import { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import RecipeCard from "../../components/ui/recipe/recipeCard";
import { HiddenCard } from "../../components/ui/recipe/hiddenCard";
import { ILeftOver, IMealAmount, resetPlanConfiguration, selectNewPlanConfiguration } from "../../redux/slice/newPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import { Meal, RecipeSwipeObject, FrontendPlan } from "../../utils/dataTypes";
import NewPlanNavigationBar from '../NewPlanPage/NavigationNewPlanBar'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createPlan, swipeleft, swiperight } from "../../utils/axios/planGenerationCalls";
import { AppDispatch } from "../../redux/store";
import { acceptPlan } from "../../redux/slice/currentPlanSlice";

const Text = createText<Theme>()
const Box = createBox<Theme>()

export type SwapMealsPageProps = {
  navigation: NavigationScreenProp<any, any>
};

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

type animationProps = {
  setupPhase: boolean
}

const Animation = (props: animationProps) => {
  const windowWidth = Dimensions.get('window').width;
  if (props.setupPhase) {
    return (
      <Box alignItems={"center"} flexGrow={1} flexDirection={"column"} justifyContent={"center"}>
        <Image
          style={{ width: windowWidth, height: 9 / 16 * windowWidth }}
          source={require('../../assets/animation.gif')} />
      </Box>
    )
  } else {
    return <Box />
  }
}

const SwapMealsPage = ({ navigation }: SwapMealsPageProps) => {
  // Initial State for Animation
  const [setupPhase, setSetupPhase] = useState(true)
  // Load Initial data for recipes
  const { mealAmount, leftovers, preferences } = useSelector(selectNewPlanConfiguration)
  // Track Progression of Individual Swipes
  const [swipeTracker, setSwipeTracker] = useState(Array(mealAmount.length).fill(0) as number[])
  // Current Plan
  const [recipeList, setRecipeList] = useState([] as RecipeSwipeObject[])
  // Manages Locking, Loading Animation
  const [loading, setLoading] = useState(false)
  // Sustainability Score for future animations
  const [sustainabilityScore, setSustainabilityScore] = useState(0)

  const dispatch = useDispatch<AppDispatch>()

  // Fetch Initial Plan on First Mounting
  useEffect(() => {
    createPlan(mealAmount.map((m: IMealAmount) => m.amount), leftovers.map((l: ILeftOver) => ({ id: l.id, quantity: (l.amount / l.smallestAmount) })), preferences).then(
      (initialPlan: FrontendPlan) => {
        setRecipeList(initialPlan.recipeSwipeObjects)
        setSwipeTracker(Array(initialPlan.recipeSwipeObjects.length).fill(0))
        setSustainabilityScore(initialPlan.sustainabilityScore)
        // Enter Swiping Phase
        setSetupPhase(false)
      }
    ).catch(
      error => { console.error(error) }
    )
  }, [])

  // Handle Swiping Input
  const swipeLeft = async (rowKey: any, rowMap: any) => {
    if (swipeTracker[rowKey] > 0 && !loading) {
      setLoading(true)
      const newPlan: FrontendPlan = await swipeleft(recipeList, rowKey)
      setRecipeList(newPlan.recipeSwipeObjects)
      setSustainabilityScore(newPlan.sustainabilityScore)

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
      const newPlan: FrontendPlan = await swiperight(recipeList, rowKey)
      setRecipeList(newPlan.recipeSwipeObjects)
      setSustainabilityScore(newPlan.sustainabilityScore)

      // Reset State and Update SwipeTracker
      swipeTracker[rowKey] += 1
      setSwipeTracker(swipeTracker)
      setLoading(false)
    }
    rowMap[rowKey].closeRow()
  };

  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
      <NewPlanNavigationBar
        onClickBack={
          () => navigation.navigate('FoodPreferences')}
        onClickNext={
          recipeList.length > 0 ?
            () => {
              dispatch(acceptPlan(recipeList.map((r: RecipeSwipeObject) => {
                return {
                  id: r.id,
                  recipe: r.recipe,
                  portions: r.portions
                } as Meal
              })))
              dispatch(resetPlanConfiguration())
              navigation.navigate('CurrentPlan')
            } :
            undefined
        }
        onClickAbort={
          () => {
            dispatch(resetPlanConfiguration())
            navigation.navigate('CurrentPlan')
          }
        }>
        <Box flexGrow={1} height="50%">
          <TopBar />
          <Animation setupPhase={setupPhase} />
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
                    cookingTime={data.item.recipe.prepTime}
                    recipeName={data.item.recipe.name}
                    persons={data.item.portions} />
                </Box>
              </TouchableOpacity>
            )}
            renderHiddenItem={(data, rowMap) => (
              <HiddenCard loading={loading} />
            )}
            leftOpenValue={50}
            rightOpenValue={-50}
          />
        </Box>
      </ NewPlanNavigationBar>
    </Box >
  );
}

export default SwapMealsPage; 
