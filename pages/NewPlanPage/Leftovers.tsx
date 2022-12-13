import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import React from 'react'
import SearchBar from '../../components/ui/SearchBar'
import { NavigationButtonContainer } from '../../components/ui/NavigationButton'

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
            <NavigationButtonContainer
                onPressLeft={() => navigation.navigate('Mealquantity')}
                textLeft="Back"
                onPressRight={() => navigation.navigate('Swapmeals')}
                textRight="Next"></NavigationButtonContainer>
        </Box>
    )
}

export default LeftoversScreen
