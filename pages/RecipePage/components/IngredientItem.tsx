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

export const IngredientItem = ({ ingredientName, unit, season, local, alternative, bought, required }: IngredientItemProps) => {
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