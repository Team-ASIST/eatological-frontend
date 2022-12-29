import React from "react";
import { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { ScrollView } from "react-native";
import GroceryButton from "../../components/ui/inputs/groceryButton";
import { Grocery } from "../../utils/dataTypes";
import { groceries, buyGrocery } from "../../utils/axios/planUsageCalls";

const Text = createText<Theme>();
const Box = createBox<Theme>();



const GroceryListPage = () => {
  const [groceryList, setGroceryList] = useState([] as Grocery[])

  // Fetch GroceryList
  useEffect(() => {
    groceries().then(
      (list: Grocery[]) => {
        setGroceryList(list)
      }
    ).catch(
      error => { console.error(error) }
    )
  }, [])

  // Handle Bought Grocery
  const buy = async (ingredientID: number) => {
    setGroceryList(await buyGrocery(ingredientID))
  };

  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
      <ScrollView>
        {
          groceryList.map((elem: Grocery) => {
            return (
            <GroceryButton
              ingredientID={elem.ingredientID}
              ingredientName=""
              bought={elem.bought}
              required={elem.required}
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
