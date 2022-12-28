import { createText, createBox } from '@shopify/restyle'
import theme, { Theme } from '../../../utils/theme'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'


const Text = createText<Theme>()
const Box = createBox<Theme>()

type FloatingActionButtonProps = {
    route: string
    navigation: NavigationScreenProp<any, any>
}

export const FloatingActionButton = ({ route, navigation }: FloatingActionButtonProps) => {
    return (
        <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: 30, borderRadius: 50, elevation: 3 }} onPress={() => navigation.navigate(route)}>
            <Box
                backgroundColor="white"
                borderRadius={50}
                width={60}
                height={60}
                borderWidth={3}
                borderColor="accent"
                alignItems="center"
                justifyContent={"center"}
                //  ios - Android uses elevation in TouchableOpacity - produces ugly bug if defined in Box
                shadowColor={"black"}
                shadowOffset={{width: 0, height: 3}}
                shadowRadius={3}
                shadowOpacity={0.5}
            >
                <Text variant={"header"} color={"accent"}>+</Text>
            </Box>
        </TouchableOpacity >
    )
}