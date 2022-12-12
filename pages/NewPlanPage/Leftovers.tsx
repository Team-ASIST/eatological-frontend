import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import React from 'react'
import NavigationButton from '../../components/ui/NavigationButton'
import SearchBar from '../../components/ui/SearchBar'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const LeftoversScreen = ({ navigation }: Props) => {
    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
            <Box marginVertical="l" marginHorizontal="xs" padding="m" flexGrow={1}>
                <Text variant="subheader">Do you have any leftovers?</Text>
                <SearchBar></SearchBar>
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
