import React from "react";
import { createBox, createText, useTheme } from '@shopify/restyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from "../../../utils/theme";
import TagItem from "../common/TagItem";
import IconButton from "../inputs/IconButton";
import { Modal, Pressable } from "react-native";
import Tooltip from "rn-tooltip";


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
    alternative?: string,
    bought: number,
    required: number,
    smallestAmount: number
}

const CheckIcon = ({ bought }: CheckIconProps) => {
    const theme = useTheme<Theme>()

    if (bought) {
        return (
            <Ionicons
                name={'checkmark'}
                size={50}
                color={theme.colors.secondaryCardText}
            />
        )
    } else {
        return (
            <Ionicons
                name={'close'}
                size={50}
                color={theme.colors.secondaryCardText}
            />
        )
    }
}

export const IngredientItem = ({ ingredientName, unit, season, local, alternative, bought, required, smallestAmount }: IngredientItemProps) => {
    const theme = useTheme<Theme>()
    const isBought = Number((bought * smallestAmount).toFixed(2)) >= Number((required * smallestAmount).toFixed(2))

    return (
        <Box
            backgroundColor={isBought ? 'inactiveButtonColor' : 'mainBackground'}
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
                <CheckIcon bought={isBought} />
            </Box>

            <Box flex={5} flexDirection="row" alignItems={"center"} flexWrap="wrap">
                <Text variant={"body"} color={"secondaryCardText"} marginRight="xs">
                    {ingredientName}
                </Text>
                {alternative ?
                    <Tooltip width={200} height={"auto"} actionType="press" backgroundColor={theme.colors.accent} popover={<Text variant="body">{alternative}</Text>}>
                            <Ionicons color={theme.colors.secondaryCardText} name={"information-circle-outline"} size={30} />
                    </Tooltip> : <></>}
            </Box>


            {/* Season, Amounts, Local */}
            <Box flexDirection={"column"} alignItems="flex-end" flex={5} marginRight="m">
                <Text variant={"body"} color="secondaryCardText">
                    {Math.min(Number((bought * smallestAmount).toFixed(2)), Number((required * smallestAmount).toFixed(2))).toString().replace(/\.?0*$/,'')} / {(required * smallestAmount).toFixed(2).replace(/\.?0*$/,'')} {unit}
                </Text>
                <Box flexDirection={"row"} alignItems="center">
                    {season ? <TagItem text={"Season"} backgroundColor={"accent"} /> : <></>}
                    {local ? <TagItem text={"Lokal"} backgroundColor={"alert"} /> : <></>}
                </Box>
            </Box>
        </Box>
    )
}