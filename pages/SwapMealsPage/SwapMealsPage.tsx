import React from "react";
import { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Text = createText<Theme>();
const Box = createBox<Theme>();

// TypeScript Setup

class MealData {
  id: number;
  amount: number;

  constructor(id: number, amount: number) {
    this.id = id;
    this.amount = amount;
  }
}

class RecipeData {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  keyExtractor = (): number => {
    return this.id;
  }
}

export type SwapMealsPageProps = {
  navigation: NavigationScreenProp<any, any>
};

const wait = (timeout : number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

// Define Recipe Component here

const Recipe = (recipe: RecipeData) => {
  const height = Dimensions.get('window').height;
  return (
    <Box
      height={0.25 * height}
      borderRadius={50}
      alignItems="center"
      backgroundColor="primaryCardBackground"
    >

      <Box flexGrow={1} justifyContent={"center"}>
        <Image source={require('../../assets/favicon.png')} />
      </Box>

      <Box
        flexDirection={"row"}
        paddingBottom={"m"}
        alignItems={"stretch"}
      >
        <Text variant={"body"}>{recipe.name}</Text>
      </Box>
    </Box>
  );
};

const getListWithNewRecipe = async (currentList: RecipeData[]): Promise<RecipeData[]> => {
  //TODO Call Backend for SwipeRight
  const recipes = [new RecipeData(0, "Kimbap"), new RecipeData(1, "Ramen"), new RecipeData(2, "Teriyaki"), new RecipeData(3, "Tonkatsu"), new RecipeData(4, "Sashimi")]
  return recipes
}

const getListWithOldRecipe = async (currentList: RecipeData[]): Promise<RecipeData[]> => {
  //TODO Call Backend for SwipeLeft
  const recipes = [new RecipeData(0, "Sushi"), new RecipeData(1, "Ramen"), new RecipeData(2, "Teriyaki"), new RecipeData(3, "Tonkatsu"), new RecipeData(4, "Sashimi")]
  return recipes
}

const getInitialPlan = (data: MealData[]): RecipeData[] => {
  const recipes = [new RecipeData(0, "Sushi"), new RecipeData(1, "Ramen"), new RecipeData(2, "Teriyaki"), new RecipeData(3, "Tonkatsu"), new RecipeData(4, "Sashimi")]
  return recipes
};

const SwapMealsPage = ({ navigation }: SwapMealsPageProps) => {
  // Load Initial data for recipes
  const meals = [new MealData(0, 2), new MealData(1, 1)]
  const [recipeList, setRecipeList] = useState(getInitialPlan(meals))

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

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  return (
    <Box paddingTop={"l"} padding={"s"} backgroundColor="mainBackground" flex={1}>

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
          <Box paddingTop={"l"}>
            {
              Recipe(data.item)
            }
          </Box>
        )}
        renderHiddenItem={(data, rowMap) => (
          <Box height={0.25 * height} paddingTop={"l"} flexDirection={"row"}>

            <Box flex={1}>
              <TouchableOpacity onPress={() => swipeLeft(data.item.id)}>
                <Box
                  height={0.25 * height}
                  borderBottomLeftRadius={50}
                  borderTopLeftRadius={50}
                  alignItems={"flex-start"}
                  justifyContent={"center"}
                  paddingLeft={"s"}
                  backgroundColor="mainForeground"
                >
                  <Ionicons name="arrow-undo-outline" size={40} color="white" />
                </Box>
              </TouchableOpacity>
            </Box>

            <Box flex={1}>
              <TouchableOpacity onPress={() => swipeRight(data.item.id)}>
                <Box
                  height={0.25 * height}
                  borderBottomRightRadius={50}
                  borderTopRightRadius={50}
                  alignItems={"flex-end"}
                  justifyContent={"center"}
                  paddingRight={"s"}
                  backgroundColor="secondaryCardBackground"
                >
                  <Ionicons name="arrow-redo-outline" size={40} color="white" />
                </Box>
              </TouchableOpacity>
            </Box>

          </Box>
        )}
        leftOpenValue={50}
        rightOpenValue={-50}
      />

    </Box >
  );
}

export default SwapMealsPage; 