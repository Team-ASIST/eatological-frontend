import React, { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import theme, { Theme } from "../../../utils/theme";


const Text = createText<Theme>();
const Box = createBox<Theme>();


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
                name={'checkmark'}
                size={50}
                color={theme.colors.white}
            />
        )
    } else {
        return (
            <Ionicons
                name={'close'}
                size={50}
                color={theme.colors.white}
            />
        )
    }
}

export const IngredientItem = ({ ingredientName, unit, season, local, alternative, bought, required }: IngredientItemProps) => {
    return (
        <Box
            backgroundColor={bought >= required ? 'navigationButtonColor' : 'mainBackground' }
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderColor={'black'}
            borderBottomWidth={0.75}
            height={75}
            paddingLeft={"s"}
            paddingRight={"xs"}
        >
            <Box flex={2}>
                <CheckIcon bought={(bought >= required)} />
            </Box>

            <Box flex={5}>
                <Text variant={"body"} color="primaryCardText">
                    {ingredientName}
                    {alternative === null ? "" : "\nAlt: [ " + alternative + " ]"}
                </Text>
            </Box>


            {/* Season, Amounts, Local */}
            <Box flexDirection={"column"} alignItems="flex-start" flex={5}>
                <Box flexDirection={"row"} alignItems="center">
                    <Ionicons
                        name={season ? 'checkmark-circle-outline' : 'close-circle-outline'}
                        size={15}
                        color={theme.colors.white}
                    />
                    <Text variant={"body"}> Season </Text>
                </Box>
                <Text variant={"body"} color="primaryCardText">
                    {bought.toFixed(2) >= required.toFixed(2) ? required.toFixed(2) : 0.0} / {required.toFixed(2)} {unit}
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