import React from "react";
import { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../utils/theme';
import { NavigationScreenProp } from "react-navigation";
import { getRestrictions, setRestrictions } from "../../utils/axios/userManagementCalls";
import { Restriction } from "../../utils/dataTypes";
import { ScrollView } from "react-native";
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconButton from "../../components/ui/inputs/IconButton";

const Text = createText<Theme>()
const Box = createBox<Theme>()

export type RestrictionsPageProps = {
    navigation: NavigationScreenProp<any, any>
};

const RestrictionsPage = ({ navigation }: RestrictionsPageProps) => {
    const [currentRestrictions, setCurrentRestrictions] = useState([] as Restriction[])

    // Fetch available restrictions
    useEffect(() => {
        getRestrictions().then(
            (availableRestrictions: Restriction[]) => {
                setCurrentRestrictions(availableRestrictions)
            }
        )
    }, [])

    const setNewRestriction = async (restriction: string) => {
        const success: boolean = await setRestrictions(restriction)
        if (success) {
            const current = currentRestrictions.map((x) => x)
            for (const restr of current) {
                if (restr.active) {
                    restr.active = false
                }
                if (!restr.active && restr.name === restriction) {
                    restr.active = true
                }
            }
            setCurrentRestrictions(current)
        }
    }

    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
            <Box marginTop="l" marginHorizontal="xs" padding="m">
                <Text variant="subheader">Select desired Dietary Restriction:</Text>
            </Box>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    currentRestrictions.map((elem: Restriction) => {
                        return (
                            <Box
                                key={elem.name}
                                backgroundColor={elem.active ? 'accent' : 'inactiveButtonColor'}
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
                                    <TouchableOpacity onPress={() => setNewRestriction(elem.name)}>
                                        {
                                            elem.active ?
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
                                        {elem.name}
                                    </Text>
                                </Box>

                            </Box>
                        )
                    })
                }
            </ScrollView>
            <Box alignItems="center">
                <IconButton
                    onPress={() => navigation.navigate("User")}
                    icon={'chevron-back-circle-outline'}
                    size={60}
                    color={theme.colors.inactiveButtonColor} />
            </Box>
        </Box>
    );
}

export default RestrictionsPage;
