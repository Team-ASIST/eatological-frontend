import React from "react";
import { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { RefreshControl, ScrollView } from "react-native";
import GroceryButton from "../../components/ui/inputs/groceryButton";
import { Grocery, Ingredient, LargeGrocery } from "../../utils/dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { getGroceries, getPlan, selectSortedGroceries, selectUpdatingPlan, updateGroceries } from "../../redux/slice/currentPlanSlice";
import { AppDispatch } from "../../redux/store";

const Text = createText<Theme>();
const Box = createBox<Theme>();

const GroceryListPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const groceries = useSelector(selectSortedGroceries)
  const updating = useSelector(selectUpdatingPlan)
  const [refreshing, setRefreshing] = React.useState(false)

  // Synchronize deviated states for both local and backend deviations
  useEffect(() => {
    //console.log(groceries)
    dispatch(getGroceries())
  }, [])

  const onRefresh = React.useCallback(() => {
    dispatch(getPlan())
    dispatch(getGroceries())
  }, []);

  // Handle Bought Grocery
  const buy = async (ingredientID: number) => {
    const largeGrocery = groceries.find(largeGrocery => largeGrocery.ingredientId === ingredientID)
    if (largeGrocery) {
      if (largeGrocery.grocery.bought !== largeGrocery.grocery.required) {
        const updatedGroceries: Grocery[] = []
        updatedGroceries.push({
          ingredientId: ingredientID,
          required: largeGrocery.grocery.required,
          bought: largeGrocery.grocery.required
        })
        
        dispatch(updateGroceries(updatedGroceries))
      }
    }
  };

  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={updating}
            onRefresh={onRefresh}
          />
        }>
        {
          groceries.map((elem: LargeGrocery) => {
            return (
              <GroceryButton
                key={elem.ingredientId}
                ingredientId={elem.ingredientId}
                grocery={elem.grocery}
                ingredient={elem.ingredient}
                onClick={buy}
              />
            )
          })
        }
      </ScrollView>
    </Box>
  );
}

export default GroceryListPage; 
