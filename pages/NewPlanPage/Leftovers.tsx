import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import React from 'react'
import { NavigationButtonContainer } from '../../components/ui/inputs/NavigationButton'
import SearchBar from '../../components/ui/inputs/SearchBar'
import {
    ILeftOver,
    selectAllLeftovers,
    leftoverDecrement,
    leftoverIncrement,
    leftoverRemoved
} from '../../redux/slice/newPlanSlice'
import { useDispatch, useSelector } from 'react-redux'
import LeftOverInput from '../../components/ui/inputs/LeftOverInput'
import { ScrollView } from 'react-native-gesture-handler'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const LeftoversScreen = ({ navigation }: Props) => {
    const leftovers = useSelector(selectAllLeftovers)
    const dispatch = useDispatch()

    const mealInputs = leftovers.map((leftover: ILeftOver) => (
        <LeftOverInput
            key={leftover.id}
            increment={() => dispatch(leftoverIncrement({ id: leftover.id }))}
            decrement={() => dispatch(leftoverDecrement({ id: leftover.id }))}
            remove = {() => dispatch(leftoverRemoved({ id: leftover.id }))}
            value={leftover.smallestAmount}
            title={leftover.name}
            unit={leftover.unit}
        />
    ))
    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
            <Box marginVertical="l" marginHorizontal="xs" padding="m" height={'75%'}>
                <Text variant="subheader">Do you have any leftovers?</Text>
                <SearchBar></SearchBar>
                <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
                    {mealInputs}
                </ScrollView>
            </Box>
            <NavigationButtonContainer
                onPressLeft={() => navigation.navigate('MealQuantity')}
                textLeft="Back"
                onPressRight={() => navigation.navigate('SwapMeals')}
                textRight="Next"
            />
        </Box>
    )
}

export default LeftoversScreen
