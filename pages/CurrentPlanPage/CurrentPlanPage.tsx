import React from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import RecipeCard from "../../components/ui/recipe/recipeCard";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectAllRecipes } from "../../redux/slice/currentPlanSlice";
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
    <Box backgroundColor="mainBackground" flex={1}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          {
            recipes.map((el: Meal) => {
              return <RecipeCard key={el.id} imageSource={el.recipe.imageUrl} cookingTime={el.recipe.prepTime} recipeName={el.recipe.name} ready={Math.random() < 0.5} persons={el.portions} onClick={() => {navigation.navigate('Recipe', { recipe: el.recipe})}} />
            })
          }
        </ScrollView>
        <FloatingActionButton route="NewPlan" navigation={navigation}/>
    </Box>

  );
}

export default CurrentPlan; 