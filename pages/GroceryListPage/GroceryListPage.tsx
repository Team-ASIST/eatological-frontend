import React from "react";
import { useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { ScrollView } from "react-native";
import GroceryButton from "../../components/ui/inputs/groceryButton";
import { Grocery, largeGrocery } from "../../utils/dataTypes";
import { getGroceries, buyGrocery } from "../../utils/axios/planUsageCalls";
import { useDispatch, useSelector } from "react-redux";
import { buyGroc, selectSortedGroceries } from "../../redux/slice/currentPlanSlice";

const Text = createText<Theme>();
const Box = createBox<Theme>();

const GroceryListPage = () => {
  const dispatch = useDispatch()
  const groceries = useSelector(selectSortedGroceries)

  // Synchronize deviated states for both local and backend deviations
  useEffect(() => {
    //console.log(groceries)
    getGroceries().then(
      backendGroceries => {
        // Collect all missing updates for backend
        const unsyncedGroceriesBackend: Grocery[] = []
        for (const grocery of backendGroceries) {
          const largeGrocery = groceries.find(largeGrocery => largeGrocery.ingredientId === grocery.ingredientId)
          if (largeGrocery) {
            // Local missing information from backend
            if (largeGrocery.grocery.bought < grocery.bought) {
              dispatch(buyGroc({ id: grocery.ingredientId }))
            }

            // Backend missing information from local
            if (largeGrocery.grocery.bought > grocery.bought) {
              unsyncedGroceriesBackend.push({ ingredientId: grocery.ingredientId, required: grocery.required, bought: grocery.required })
            }
          }
        }
        buyGrocery(unsyncedGroceriesBackend)
      }
    )
  }, [])

  // Handle Bought Grocery
  const buy = async (ingredientID: number) => {
    const largeGrocery = groceries.find(largeGrocery => largeGrocery.ingredientId === ingredientID)
    if (largeGrocery) {
      if (largeGrocery.grocery.bought !== largeGrocery.grocery.required) {
        dispatch(buyGroc({ id: ingredientID }))

        await buyGrocery([
          {
            ingredientId: ingredientID,
            required: largeGrocery.grocery.required,
            bought: largeGrocery.grocery.required
          } as Grocery
        ])
      }
    }
  };

  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          groceries.map((elem: largeGrocery) => {
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
