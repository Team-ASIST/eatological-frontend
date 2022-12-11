import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { Button, View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import React from 'react'
import NavigationButton from '../../components/ui/NavigationButton'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const LeftoversScreen = ({ navigation }: Props) => {
    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
            <Box marginVertical="l" marginHorizontal="xs" padding="m" flexGrow={1}>
                <Text variant="header">Do you have any leftovers?</Text>
                <Text variant="subheader">Here should be the create a new plan!</Text>
            </Box>
            <Box
                flexDirection="row"
                position="absolute"
                bottom={70}
                start={-13}
                end={-13}
                justifyContent="space-between">
                <NavigationButton onPress={() => navigation.navigate('Mealquantity')} text="Back" />
                <NavigationButton onPress={() => navigation.navigate('Leftovers')} text="Next" />
            </Box>
        </Box>
    )
}

export default LeftoversScreen
