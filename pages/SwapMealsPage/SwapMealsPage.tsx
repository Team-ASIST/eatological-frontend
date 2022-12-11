import React from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { TouchableOpacity, ScrollView, Image, Dimensions, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';

const Text = createText<Theme>();
const Box = createBox<Theme>();

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
}

export type SwapMealsPageProps = {
  navigation: NavigationScreenProp<any, any>
};

// Define Recipe Component here

const Recipe = (recipe: RecipeData) => {
  const height = Dimensions.get('window').height;
  return (
    <Box height={0.25 * height} alignItems="center" backgroundColor="primaryCardBackground">

      <Box flexGrow={1}>
        <Image source={require('../../assets/favicon.png')} />
      </Box>

      <Text variant={"body"}>{recipe.name}</Text>
    </Box>
  );
};



const getInitialPlan = (data: MealData[]): RecipeData[] => {
  const recipes = [new RecipeData(0, "Sushi"), new RecipeData(1, "Ramen"), new RecipeData(2, "Teriyaki"), new RecipeData(3, "Tonkatsu"), new RecipeData(4, "Sashimi")]
  return recipes
};

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}





const SwapMealsPage = ({ navigation }: SwapMealsPageProps) => {
  const meals = [new MealData(0, 2), new MealData(1, 1)]
  const recipeList = getInitialPlan(meals)

  // Handle Swiping Input
  const [refreshing, setRefreshing] = React.useState(false);

  const swipeLeft = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const swipeRight = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  return (
    <Box paddingTop={"l"} padding={"s"} backgroundColor="mainBackground" flex={1}>

      <SwipeListView
        data={recipeList}
        renderItem={(data, rowMap) => (
          <Box paddingTop={"l"}>
            {
              Recipe(data.item)
            }
          </Box>
        )}
        renderHiddenItem={(data, rowMap) => (
          <Box height={0.5 * height} paddingTop={"l"} flexDirection={"row"}>

            <Box flex={1}>
              <TouchableOpacity onPress={() => swipeLeft()}>
                <Box height={height} alignItems={"flex-start"} paddingLeft={"s"} backgroundColor="mainForeground">
                  <Text variant={"body"} color={"primaryCardText"}>SwipeLeft</Text>
                </Box>
              </TouchableOpacity>
            </Box>

            <Box flex={1}>
              <TouchableOpacity onPress={() => swipeRight()}>
                <Box height={height} alignItems={"flex-end"} paddingRight={"s"} backgroundColor="secondaryCardBackground">
                  <Text variant={"body"} color={"primaryCardText"}>SwipeRight</Text>
                </Box>
              </TouchableOpacity>
            </Box>

          </Box>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />

    </Box >
  );
}

export default SwapMealsPage; 