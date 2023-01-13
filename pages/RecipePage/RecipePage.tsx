import React, { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { Ingredient, LargeGrocery, Meal, smallIngredient } from "../../utils/dataTypes";
import { RootTabParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated, ScrollView, Image, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { planCook, selectAllIngredients, selectAllRecipes, selectSortedGroceries } from "../../redux/slice/currentPlanSlice";
import TextButton from "../../components/ui/inputs/TextButton";
import { AppDispatch } from "../../redux/store";
import { BackFloatingButton } from "../../components/ui/inputs/BackFloatingButton";
import { IngredientItem } from "../../components/ui/recipe/IngredientItem";
import InstructionItem from "../../components/ui/recipe/DirectionList";

const Text = createText<Theme>();
const Box = createBox<Theme>();

enum RecipeAction {
    Directions,
    Ingredients
}

type RecipePageProps = NativeStackScreenProps<RootTabParamList, 'Recipe'>

const RecipePage = (props: RecipePageProps) => {
    const [currentAction, setCurrentAction] = useState<RecipeAction>(RecipeAction.Ingredients)
    const dispatch = useDispatch<AppDispatch>()
    const groceries = useSelector(selectSortedGroceries)
    const ingredients = useSelector(selectAllIngredients)
    const { mealId } = props.route.params;
    const meal = useSelector(selectAllRecipes).find((meal: Meal) => meal.id === mealId)

    if (!meal) {
        props.navigation.navigate('CurrentPlan')
        return
    }

    const recipe = meal!.recipe

    return (
        <Box flex={1}>
            {/* https://dev.to/reime005/image-scroll-zoom-in-react-native-29f7 */}
            <ScrollView bounces={false}>
                <Image resizeMode="cover" source={{ uri: recipe.imageUrl }} style={{
                    height: 250, justifyContent: 'flex-end',
                    width: '100%',
                    padding: 0
                }} />

                <Box padding="m">
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
                            <Text variant={"body"} color={"secondaryCardText"}>Prep Time</Text>
                            <Text variant={"boldBody"} color={"secondaryCardText"}>{recipe.prepTime}m</Text>
                        </Box>
                        <Box>
                            <Text variant={"body"} color={"secondaryCardText"}>Cook Time</Text>
                            <Text variant={"boldBody"} color={"secondaryCardText"}>{recipe.totalTime}m</Text>
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
                        <Text variant={"subsubheader"} color={"secondaryCardText"}>Directions</Text>
                    </Box>
                </Box>
                {
                    currentAction == RecipeAction.Ingredients ?
                        (
                            !meal.cooked ?
                                recipe.items.map(
                                    (item: smallIngredient) => {
                                        const grocery = groceries.find((groc: LargeGrocery) => groc.ingredientId === item.id)

                                        if (grocery) {
                                            return <IngredientItem
                                                key={item.id}
                                                ingredientName={grocery.ingredient.name}
                                                unit={grocery.ingredient.unit}
                                                season={grocery.ingredient.season}
                                                local={grocery.ingredient.local}
                                                alternative={grocery.ingredient.alternative}
                                                bought={grocery.grocery.bought}
                                                required={item.quantity}
                                                smallestAmount={grocery.ingredient.smallestAmount} />
                                        }
                                    }
                                ) :
                                recipe.items.map(
                                    (item: smallIngredient) => {
                                        const ingredient = ingredients.find((ingr: Ingredient) => ingr.id === item.id)

                                        if (ingredient) {
                                            return <IngredientItem
                                                key={ingredient.id}
                                                ingredientName={ingredient.name}
                                                unit={ingredient.unit}
                                                season={ingredient.season}
                                                local={ingredient.local}
                                                alternative={ingredient.alternative}
                                                bought={item.quantity}
                                                required={item.quantity}
                                                smallestAmount={ingredient.smallestAmount} />
                                        }
                                    }
                                )
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
                            <Box>
                                <TextButton disabled={meal.cooked} icon={'checkmark'} color={"black"} size={30} label={meal.cooked ? "Marked as cooked" : "Mark as cooked"} onPress={() => dispatch(planCook(meal.recipe.id))} />
                            </Box>
                        </Box>
                }
            </ScrollView>
            <BackFloatingButton closingTag="<" onClick={() => props.navigation.navigate("CurrentPlan")} />
        </Box >
    );
}

export default RecipePage; 