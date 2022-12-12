import React from "react";
import { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { TouchableOpacity, ImageBackground, Image, Dimensions } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Text = createText<Theme>();
const Box = createBox<Theme>();

// TypeScript Setup

class Leftovers {
  id: number;
  name: string;
  amount: number;

  constructor(id: number, name: string, amount: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}

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

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

// Define Recipe Component here

const Recipe = (recipe: RecipeData, navigation: any) => {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity onPress={() => (navigation.navigate('CurrentPlan'))}>
      <Box
        height={0.25 * height}
        borderRadius={50}
        backgroundColor="primaryCardBackground"
      >

        <ImageBackground source={require('../../assets/adaptive-icon.png')} borderRadius={50} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
          <Box alignItems={"center"}>

            <Box paddingTop={"m"}>
              <Text variant="subheader">{recipe.name}</Text>
            </Box>

            <Box flexGrow={1} />

            <Box
              flexDirection={"row"}
              paddingBottom={"m"}
            >
              <Box flex={1} alignItems={"center"}><Text variant={"body"}>{recipe.name}</Text></Box>
            </Box>
          </Box>
        </ImageBackground>
      </Box>
    </TouchableOpacity>
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
          <Box paddingTop={"m"}>
            {
              Recipe(data.item, navigation)
            }
          </Box>
        )}
        renderHiddenItem={(data, rowMap) => (
          <Box height={0.25 * height} paddingTop={"m"} flexDirection={"row"}>

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