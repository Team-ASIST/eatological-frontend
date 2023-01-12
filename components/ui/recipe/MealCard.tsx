import React, { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../../utils/theme';
import { Ingredient, LeftOver, RecipeSwipeObject, smallIngredient } from "../../../utils/dataTypes";
import { ScrollView, View, Image } from "react-native";
import { IngredientItem } from "./IngredientItem";
import InstructionItem from "./DirectionList";
import { useSelector } from "react-redux";
import { selectAllIngredients } from "../../../redux/slice/currentPlanSlice";
import { selectAllLeftovers } from "../../../redux/slice/newPlanSlice";

const Text = createText<Theme>();
const Box = createBox<Theme>();

enum RecipeAction {
    Directions,
    Ingredients
}

interface MealPageProps {
    recipe: RecipeSwipeObject
}

const MealCard = (props: MealPageProps) => {
    const [currentAction, setCurrentAction] = useState<RecipeAction>(RecipeAction.Ingredients)
    const ingredients = useSelector(selectAllIngredients)
    const leftovers = useSelector(selectAllLeftovers)

    const recipe = props.recipe.recipe

    return (
        <Box flex={1} width="100%">
            <ScrollView bounces={false}>
                <Image resizeMode="cover" source={{ uri: recipe.imageUrl }} style={{
                    height: 250, justifyContent: 'flex-end',
                    width: '100%',
                    padding: 0
                }} />
                <Box padding={"m"}>
                    <Text
                        variant="subheader">
                        {recipe.name ?? ''}
                    </Text>
                    <View style={{
                        borderWidth: 0.5,
                        borderColor: 'black',
                        margin: 10,
                    }} />
                    <Box justifyContent={"space-evenly"} flexDirection="row">
                        <Box>
                            <Text variant={"body"}>Prep Time</Text>
                            <Text variant={"boldBody"}>{recipe.prepTime}m</Text>
                        </Box>
                        <Box>
                            <Text variant={"body"}>Cook Time</Text>
                            <Text variant={"boldBody"}>{recipe.totalTime}m</Text>
                        </Box>
                    </Box>
                </Box>
                <Box justifyContent={"space-evenly"} flexDirection="row">
                    <Box
                        padding={"m"}
                        backgroundColor={
                            currentAction == RecipeAction.Ingredients ?
                                "secondaryButtonColor" :
                                "primaryButtonColor"
                        }
                        borderBottomColor={
                            currentAction == RecipeAction.Ingredients ?
                                "white" :
                                "secondaryButtonColor"
                        }
                        borderBottomWidth={
                            currentAction == RecipeAction.Ingredients ?
                                5 :
                                0
                        }
                        flexDirection="row"
                        flex={1}
                        onTouchEnd={() => { setCurrentAction(RecipeAction.Ingredients) }}
                    >
                        <Text variant={"subsubheader"}>Ingredients</Text>
                    </Box>
                    <Box
                        padding={"m"}
                        backgroundColor={
                            currentAction == RecipeAction.Directions ?
                                "secondaryButtonColor" :
                                "primaryButtonColor"
                        }
                        borderBottomColor={
                            currentAction == RecipeAction.Directions ?
                                "white" :
                                "secondaryButtonColor"
                        }
                        borderBottomWidth={
                            currentAction == RecipeAction.Directions ?
                                5 :
                                0
                        }
                        flexDirection="row"
                        flex={1}
                        onTouchEnd={() => { setCurrentAction(RecipeAction.Directions) }}
                    >
                        <Text variant={"subsubheader"}>Directions</Text>
                    </Box>
                </Box>
                {
                    currentAction == RecipeAction.Ingredients ?
                        recipe.items.map(
                            (item: smallIngredient) => {
                                const ingredient = ingredients.find((ingr: Ingredient) => ingr.id === item.id)

                                const leftover = leftovers.find((lo: LeftOver) => lo.id === item.id)

                                if (ingredient) {
                                    return <IngredientItem
                                        key={ingredient.id}
                                        ingredientName={ingredient.name}
                                        unit={ingredient.unit}
                                        season={ingredient.season}
                                        local={ingredient.local}
                                        alternative={ingredient.alternative}
                                        bought={leftover ? leftover.quantity : 0}
                                        required={item.quantity} 
                                        smallestAmount={ingredient.smallestAmount} />
                                }
                            }
                        )
                        :
                        <Box padding={"m"}>
                            {
                                recipe.steps.map(
                                    (step: string, idx: number) => (
                                        <InstructionItem key={idx + 1} stepNumber={idx + 1} stepInstruction={step} />
                                    )
                                )
                            }
                        </Box>
                }
            </ScrollView>
        </Box >
    );
}

export default MealCard; 
