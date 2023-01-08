import React from "react";
import { createBox } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import RecipeCard from "../../components/ui/recipe/recipeCard";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getGroceries, getPlan, selectAllRecipes, selectUpdatingPlan } from "../../redux/slice/currentPlanSlice";
import { Meal } from "../../utils/dataTypes";
import { FloatingActionButton } from "../../components/ui/inputs/FloatingActionButton";
import { NavigationScreenProp } from 'react-navigation'
import { AppDispatch } from "../../redux/store";

const Box = createBox<Theme>()

type CurrentPlanProps = {
  navigation: NavigationScreenProp<any, any>
}

const CurrentPlan = ({ navigation }: CurrentPlanProps) => {
  const recipes = useSelector(selectAllRecipes)
  const updating = useSelector(selectUpdatingPlan)
  const dispatch = useDispatch<AppDispatch>()
  
  const onRefresh = React.useCallback(() => {
    dispatch(getPlan())
    dispatch(getGroceries())
  }, []);

  return (
    <Box backgroundColor="mainBackground" flex={1}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={updating}
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
    </Box>

  );
}

export default CurrentPlan; 