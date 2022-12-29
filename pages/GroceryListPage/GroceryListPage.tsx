import React from "react";
import { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { ScrollView } from "react-native";
import GroceryButton from "../../components/ui/inputs/groceryButton";
import { Grocery, Ingredient } from "../../utils/dataTypes";
import { groceries, buyGrocery, ingredients } from "../../utils/axios/planUsageCalls";

const Text = createText<Theme>();
const Box = createBox<Theme>();



const GroceryListPage = () => {
  const [groceryList, setGroceryList] = useState([] as Grocery[])
  const [ingredientInfo, setIngredientInfo] = useState([] as Ingredient[])

  // Fetch GroceryList
  useEffect(() => {
    groceries().then((groceries: Grocery[]) =>
      ingredients().then(
        (ingredients: Ingredient[]) => {
          // Horrible -> consider alternatives later
          const ingredientInfos: Ingredient[] = []
          for (let i = 0; i < groceries.length; i++) {
            for (let j = 0; j < ingredients.length; j++) {
              if (groceries[i].ingredientId === ingredients[j].ingredientId) {
                ingredientInfos.push(ingredients[j])
                break
              }
            }
          }
          setIngredientInfo(ingredients)
          setGroceryList(groceries)
        }
      ).catch(
        error => { console.error(error) }
      )
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          groceryList.map((elem: Grocery, index: number) => {
            return (
              <GroceryButton
                key={elem.ingredientId}
                ingredientId={elem.ingredientId}
                ingredientName={ingredientInfo[index].name}
                unit={ingredientInfo[index].unit}
                season={ingredientInfo[index].season}
                local={ingredientInfo[index].local}
                alternative={ingredientInfo[index].alternative}
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
