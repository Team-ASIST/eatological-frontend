import React, { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../utils/theme';
import { smallIngredient } from "../../utils/dataTypes";
import { RootTabParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated, ScrollView, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


const Text = createText<Theme>();
const Box = createBox<Theme>();

const IMAGE_SCALE_MAX = 10;
const LABEL_HEADER_MARGIN = 48;

enum RecipeAction {
    Directions,
    Ingredients
}

export type CheckIconProps = {
    bought: boolean
}

export type IngredientItemProps = {
    ingredientName: string,
    unit: string,
    season: boolean,
    local: boolean,
    alternative: string,
    bought: number,
    required: number,
}

const CheckIcon = ({ bought }: CheckIconProps) => {
    if (bought) {
        return (
            <Ionicons
                name={'checkmark-circle-outline'}
                size={50}
                color={theme.colors.white}
            />
        )
    } else {
        return (
            <Ionicons
                name={'add-circle-outline'}
                size={50}
                color={theme.colors.white}
            />
        )
    }
}

const IngredientItem = ({ ingredientName, unit, season, local, alternative, bought, required }: IngredientItemProps) => {
    return (
        <Box
            backgroundColor={bought === required ? 'inactiveButtonColor' : 'accent'}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderColor={'black'}
            borderTopWidth={1.5}
            height={75}
            paddingLeft={"s"}
            paddingRight={"xs"}
        >
            <Box flex={2}>
                <CheckIcon bought={(required === bought)} />
            </Box>

            <Box flex={6}>
                <Text variant={"body"} color="primaryCardText">
                    {ingredientName}
                    {alternative === null ? "" : "\nAlt: [ " + alternative + " ]"}
                </Text>
            </Box>


            {/* Season, Amounts, Local */}
            <Box flexDirection={"column"} alignItems="flex-start" flex={4}>
                <Box flexDirection={"row"} alignItems="center">
                    <Ionicons
                        name={season ? 'checkmark-circle-outline' : 'close-circle-outline'}
                        size={15}
                        color={theme.colors.white}
                    />
                    <Text variant={"body"}> Season </Text>
                </Box>
                <Text variant={"body"} color="primaryCardText">
                    {bought} / {required} {unit}
                </Text>
                <Box flexDirection={"row"} alignItems="center">
                    <Ionicons
                        name={local ? 'checkmark-circle-outline' : 'close-circle-outline'}
                        size={15}
                        color={theme.colors.white}
                    />
                    <Text variant={"body"}> Local </Text>
                </Box>
            </Box>
        </Box>
    )
}

type RecipePageProps = NativeStackScreenProps<RootTabParamList, 'Recipe'>;

const RecipePage = (props: RecipePageProps) => {
    const [currentAction, setCurrentAction] = useState<RecipeAction>(RecipeAction.Ingredients)
    const { recipe } = props.route.params;

    console.log(recipe)

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
                                numberOfLines={2}
                                variant="header">
                                {recipe.name ?? ''}
                            </Text>
                            <Text
                                numberOfLines={2}
                                variant="subsubheader">
                                {'The healthy and sustainable fries'}
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
                            <View style={{
                                borderWidth: 0.5,
                                borderColor: 'black',
                                margin: 10,
                            }} />
                        </Box>
                        <Box justifyContent={"space-evenly"} flexDirection="row">
                            <Box padding={"m"} backgroundColor={currentAction == RecipeAction.Ingredients ? "accent" : "lightAccent"} flexDirection="row" flex={1} onTouchEnd={() => { setCurrentAction(RecipeAction.Ingredients) }}>
                                <Text variant={"subsubheader"}>Ingredients</Text>
                            </Box>
                            <Box padding={"m"} backgroundColor={currentAction == RecipeAction.Directions ? "accent" : "lightAccent"} flexDirection="row" flex={1} onTouchEnd={() => { setCurrentAction(RecipeAction.Directions) }}>
                                <Text variant={"subsubheader"}>Directions</Text>
                            </Box>
                        </Box>
                        {
                            currentAction == RecipeAction.Ingredients ?
                                recipe.items.map(
                                    (ingredient: smallIngredient, idx: number) => <IngredientItem
                                        key={ingredient.id}
                                        ingredientName={"testName"}
                                        unit={"testUnit"}
                                        season={true}
                                        local={false}
                                        alternative={"testAlt"}
                                        bought={2}
                                        required={2} />
                                )
                                :
                                <Box padding={"m"}>
                                    {
                                        recipe.steps.map(
                                            (step: string, idx: number) => (<Box>
                                                <Text paddingBottom={"m"} variant={"subsubheader"}>{idx + 1}. Schritt</Text>
                                                <Text paddingBottom={"m"} variant={"body"}>{step}</Text>
                                            </Box>)
                                        )
                                    }
                                </Box>
                        }
                    </Box>
                </Animated.View>
            </ScrollView>
        </Box >
    );
}

export default RecipePage; 