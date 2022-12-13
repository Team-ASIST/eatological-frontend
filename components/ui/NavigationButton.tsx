import { createText, createBox } from '@shopify/restyle'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Theme } from '../../utils/theme'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type NavigationButtonProps = {
    onPress: () => void
    text: String
}

const NavigationButton = ({ onPress, text }: NavigationButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Box
                padding="xs"
                backgroundColor="mainBackground"
                borderRadius={50}
                width={100}
                borderWidth={2}
                borderColor="navigationButtonColor"
                alignItems="center">
                <Text variant="navigationButton">{text}</Text>
            </Box>
        </TouchableOpacity>
    )
}

type NavigationButtonContainerProps = {
    onPressLeft: () => void
    onPressRight: () => void
    textLeft: String
    textRight: String
}

const NavigationButtonContainer = ({
    onPressLeft,
    onPressRight,
    textLeft,
    textRight,
}: NavigationButtonContainerProps) => {
    return (
        <Box
            flexDirection="row"
            position="absolute"
            bottom={70}
            start={-13}
            end={-13}
            justifyContent="space-between">
            <NavigationButton onPress={onPressLeft} text={textLeft} />
            <NavigationButton onPress={onPressRight} text={textRight} />
        </Box>
    )
}

export { NavigationButtonContainer, NavigationButton }
