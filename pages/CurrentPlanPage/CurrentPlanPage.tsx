import React from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import RecipeCard, { RecipeCardProps } from "../../components/ui/recipe/recipeCard";
import { SafeAreaView } from "react-native-safe-area-context";
import recipeCard from "../../components/ui/recipe/recipeCard";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectAllRecipes } from "../../redux/slice/currentPlanSlice";
import { RecipeSwipeObject } from "../../utils/dataTypes";
import { Meal } from "../../utils/dataTypes";
import { FloatingActionButton } from "../../components/ui/inputs/FloatingActionButton";
import { NavigationScreenProp } from 'react-navigation'

const Text = createText<Theme>();
const Box = createBox<Theme>();

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

type CurrentPlanProps = {
  navigation: NavigationScreenProp<any, any>
}

const CurrentPlan = ({ navigation }: CurrentPlanProps) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const recipes = useSelector(selectAllRecipes)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(250).then(() => setRefreshing(false));
  }, []);

  return (
    <Box backgroundColor="mainBackground" flex={1} zIndex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {
            recipes.map((el: Meal) => {
              return <RecipeCard key={el.id} imageSource={el.recipe.imageUrl} cookingTime={el.recipe.prepTime} recipeName={el.recipe.name} ready={Math.random() < 0.5} persons={el.portions} />
            })
          }
        </ScrollView>
        <FloatingActionButton route="NewPlan" navigation={navigation}/>
      </SafeAreaView >
    </Box>

  );
}

export default CurrentPlan; 