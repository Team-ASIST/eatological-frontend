import React from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import RecipeCard, { RecipeCardProps } from "../../components/ui/recipe/recipeCard";
import { SafeAreaView } from "react-native-safe-area-context";
import recipeCard from "../../components/ui/recipe/recipeCard";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

const Text = createText<Theme>();
const Box = createBox<Theme>();

const currentPlan: RecipeCardProps[] = [
  {
    imageSource: 'https://images.unsplash.com/photo-1588276552401-30058a0fe57b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2023&q=80',
    cookingTime: 35,
    recipeName: 'Paella',
    ready: true,
    persons: 4
  },
  {
    imageSource: 'https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    cookingTime: 60,
    recipeName: 'Lasagne',
    ready: true,
    persons: 2
  },
  {
    imageSource: 'https://images.unsplash.com/photo-1626804475315-9644b37a2fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    cookingTime: 45,
    recipeName: 'Pad Thai',
    ready: false,
    persons: 1
  },
  {
    imageSource: 'https://images.unsplash.com/photo-1618889482923-38250401a84e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    cookingTime: 30,
    recipeName: 'Ramen',
    ready: false,
    persons: 2
  }
]

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const CurrentPlan = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(250).then(() => setRefreshing(false));
  }, []);

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <SafeAreaView>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        {
          currentPlan.map((el: RecipeCardProps) => {
            return <RecipeCard imageSource={el.imageSource} cookingTime={el.cookingTime} recipeName={el.recipeName} ready={el.ready} persons={el.persons} />

          })
        }
        </ScrollView>
      </SafeAreaView>

    </Box>
  );
}

export default CurrentPlan; 