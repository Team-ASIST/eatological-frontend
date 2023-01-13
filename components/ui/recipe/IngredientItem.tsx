import React from "react";
import { createBox, createText } from '@shopify/restyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import theme, { Theme } from "../../../utils/theme";
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
    if (bought) {
        return (
            <Ionicons
                name={'checkmark'}
                size={50}
                color={theme.colors.black}
            />
        )
    } else {
        return (
            <Ionicons
                name={'close'}
                size={50}
                color={theme.colors.black}
            />
        )
    }
}

export const IngredientItem = ({ ingredientName, unit, season, local, alternative, bought, required, smallestAmount }: IngredientItemProps) => {
    return (
        <Box
            backgroundColor={bought >= required ? 'navigationButtonColor' : 'mainBackground'}
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

            <Box flex={5} flexDirection="row" alignItems={"center"}>
                <Text variant={"body"} color={"secondaryCardText"} marginRight="xs">
                    {ingredientName}
                </Text>
                {alternative ?
                    <Tooltip width={200} height={"auto"} actionType="press" backgroundColor={theme.colors.accent} popover={<Text variant="body">{alternative}</Text>}>
                            <Ionicons color={theme.colors.black} name={"information-circle-outline"} size={30} />
                    </Tooltip> : <></>}
            </Box>


            {/* Season, Amounts, Local */}
            <Box flexDirection={"column"} alignItems="flex-start" flex={5}>
                <Text variant={"body"} color="secondaryCardText">
                    {(bought * smallestAmount).toFixed(2)} / {(required * smallestAmount).toFixed(2)} {unit}
                </Text>
                <Box flexDirection={"row"} alignItems="center">
                    {season ? <TagItem text={"Season"} backgroundColor={"accent"} /> : <></>}
                    {local ? <TagItem text={"Lokal"} backgroundColor={"alert"} /> : <></>}
                </Box>
            </Box>
        </Box>
    )
}