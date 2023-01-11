import React from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import { Restriction } from "../../../utils/dataTypes";
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type RestrictionButtonProps = {
    restriction: Restriction,
    setNewRestriction: (arg0: string) => void
}

export const RestrictionButton = ({ restriction, setNewRestriction }: RestrictionButtonProps) => {
    return (
        <Box
            backgroundColor={restriction.active ? 'accent' : 'inactiveButtonColor'}
            borderRadius={50}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={75}
            marginTop={"s"}
            paddingLeft={"m"}
            paddingRight={"xs"}
        >
            <Box flex={2}>
                <TouchableOpacity onPress={() => setNewRestriction(restriction.name)}>
                    {
                        restriction.active ?
                            <Ionicons
                                name={'checkmark-circle-outline'}
                                size={50}
                                color={theme.colors.white}
                            /> :
                            <Ionicons
                                name={'add-circle-outline'}
                                size={50}
                                color={theme.colors.white}
                            />

                    }
                </TouchableOpacity>
            </Box>

            <Box flex={8}>
                <Text variant={"subsubheader"} color="primaryCardText">
                    {restriction.name}
                </Text>
            </Box>

        </Box>
    )
}