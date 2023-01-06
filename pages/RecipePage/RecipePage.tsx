import React, { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../utils/theme';
import { Ingredient, largeGrocery, smallIngredient } from "../../utils/dataTypes";
import { RootTabParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated, ScrollView, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IngredientItem } from "./components/IngredientItem";
import DirectionList from "./components/DirectionList";
import InstructionItem from "./components/DirectionList";
import { useDispatch, useSelector } from "react-redux";
import { selectAllIngredients } from "../../redux/slice/ingredientSlice";
import { selectSortedGroceries } from "../../redux/slice/currentPlanSlice";
import IconButton from "../../components/ui/inputs/IconButton";
import TextButton from "../../components/ui/inputs/TextButton";


const Text = createText<Theme>();
const Box = createBox<Theme>();

const IMAGE_SCALE_MAX = 10;
const LABEL_HEADER_MARGIN = 48;

enum RecipeAction {
    Directions,
    Ingredients
}

type RecipePageProps = NativeStackScreenProps<RootTabParamList, 'Recipe'>;

const RecipePage = (props: RecipePageProps) => {
    const [currentAction, setCurrentAction] = useState<RecipeAction>(RecipeAction.Ingredients)
    const dispatch = useDispatch()
    const groceries = useSelector(selectSortedGroceries)

    const { recipe } = props.route.params;

    const pan = React.useRef(new Animated.ValueXY()).current;

    return (
        <Box flex={1}>
            {/* https://dev.to/reime005/image-scroll-zoom-in-react-native-29f7 */}
            <ScrollView
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: pan.y } } }],
                    {
                        useNativeDriver: false,
                    }
                )}>
                <Animated.Image
                    resizeMode="cover"
                    style={{
                        transform: [
                            {
                                translateY: pan.y.interpolate({
                                    inputRange: [-1000, 0],
                                    outputRange: [-50, 0],
                                    extrapolate: 'clamp',
                                }),
                            },
                            {
                                scale: pan.y.interpolate({
                                    inputRange: [-3000, 0],
                                    outputRange: [IMAGE_SCALE_MAX, 1],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                        height: 300,
                        justifyContent: 'flex-end',
                        width: '100%',
                        padding: 0
                    }} source={{ uri: recipe.imageUrl }} />
                <Animated.View
                    style={{
                        transform: [
                            {
                                translateY: pan.y.interpolate({
                                    inputRange: [-1000, 0],
                                    outputRange: [LABEL_HEADER_MARGIN * IMAGE_SCALE_MAX, 0],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    }}>
                    <Box flex={1} backgroundColor="mainBackground">
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
                                    <Text variant={"body"}>Prep Time</Text>
                                    <Text variant={"boldBody"}>{recipe.prepTime}m</Text>
                                </Box>
                                <Box>
                                    <Text variant={"body"}>Cook Time</Text>
                                    <Text variant={"boldBody"}>{recipe.totalTime}m</Text>
                                </Box>
                            </Box>
                        </Box>
                        <Box justifyContent={"space-evenly"} flexDirection="row" borderTopWidth={0.75}>
                            <Box padding={"m"} backgroundColor={currentAction == RecipeAction.Ingredients ? "primaryButtonColor" : "secondaryButtonColor"} flexDirection="row" flex={1} onTouchEnd={() => { setCurrentAction(RecipeAction.Ingredients) }}>
                                <Text variant={"subsubheader"}>Ingredients</Text>
                            </Box>
                            <Box padding={"m"} backgroundColor={currentAction == RecipeAction.Directions ? "primaryButtonColor" : "secondaryButtonColor"} flexDirection="row" flex={1} onTouchEnd={() => { setCurrentAction(RecipeAction.Directions) }}>
                                <Text variant={"subsubheader"}>Directions</Text>
                            </Box>
                        </Box>
                        {
                            currentAction == RecipeAction.Ingredients ?
                                recipe.items.map(
                                    (ingredient: smallIngredient, idx: number) => {

                                        const grocery = groceries.find((groc: largeGrocery) => groc.ingredientId === ingredient.id)

                                        if (grocery) {
                                            return <IngredientItem
                                                key={ingredient.id}
                                                ingredientName={grocery.ingredient.name}
                                                unit={grocery.ingredient.unit}
                                                season={grocery.ingredient.season}
                                                local={grocery.ingredient.local}
                                                alternative={grocery.ingredient.alternative}
                                                bought={grocery.grocery.bought}
                                                required={ingredient.smallestAmountNumber} />
                                        }
                                    }

                                )
                                :
                                <Box padding={"m"}>
                                    {
                                        recipe.steps.map(
                                            (step: string, idx: number) => (
                                                <InstructionItem stepNumber={idx + 1} stepInstruction={step} />
                                            )
                                        )
                                    }
                                    <Box>
                                        <TextButton icon={'checkmark'} size={30} label="Mark as cooked" />
                                    </Box>
                                </Box>
                        }
                    </Box>
                </Animated.View>
            </ScrollView>
        </Box >
    );
}

export default RecipePage; 