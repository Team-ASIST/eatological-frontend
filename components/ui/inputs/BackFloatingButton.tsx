import { createText, createBox } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


const Text = createText<Theme>()
const Box = createBox<Theme>()

type BackFloatingButtonProps = {
    onClick: Function
    closingTag: '✕' | '<'
}

export const BackFloatingButton = ({ closingTag, onClick }: BackFloatingButtonProps) => {
    return (
        <TouchableOpacity style={{ position: 'absolute', top: 20, left: 30, borderRadius: 50, elevation: 3 }} onPress={() => onClick()}>
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
                <Text variant={"header"} color={"accent"}>{closingTag}</Text>
            </Box>
        </TouchableOpacity >
    )
}