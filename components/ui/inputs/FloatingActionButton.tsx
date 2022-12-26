import { createText, createBox } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';


const Text = createText<Theme>()
const Box = createBox<Theme>()

type FloatingActionButtonProps = {
    route: string
    navigation: NavigationScreenProp<any, any>
}

export const FloatingActionButton = ({ route, navigation }: FloatingActionButtonProps) => {
    return (
        // TODO Fine Tune to match new React Navigation
        <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: 30, borderRadius: 50, elevation: 5 }} onPress={() => navigation.navigate(route)}>
            <Box
                // TODO apply accent color instead of primaryButton
                backgroundColor="primaryButtonColor"
                borderRadius={50}
                width={75}
                height={75}
                borderWidth={3}
                borderColor="navigationButtonColor"
                alignItems="center"
                justifyContent={"center"}
                //  ios - Android uses elevation in TouchableOpacity - produces ugly bug if defined in Box
                overflow='hidden'
                shadowRadius={5}
                shadowOpacity={1}
            >
                <Ionicons name="add-outline" size={60} color="white" />
            </Box>
        </TouchableOpacity >
    )
}