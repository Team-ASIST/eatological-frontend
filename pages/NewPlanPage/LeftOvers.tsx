import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import React from 'react'
import SearchBar from '../../components/ui/inputs/SearchBar'
import {
    ILeftOver,
    selectAllLeftovers,
    leftoverDecrement,
    leftoverIncrement,
    leftoverRemoved,
} from '../../redux/slice/newPlanSlice'
import { useDispatch, useSelector } from 'react-redux'
import LeftOverInput from '../../components/ui/inputs/LeftOverInput'
import { ScrollView } from 'react-native-gesture-handler'
import NewPlanNavigationBar from './NavigationNewPlanBar'
import { useRoute } from '@react-navigation/native'
import { resetPlanConfiguration } from '../../redux/slice/newPlanSlice'


const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const LeftoversScreen = ({ navigation }: Props) => {
    const leftovers = useSelector(selectAllLeftovers)
    const dispatch = useDispatch()
    const route = useRoute()

    const mealInputs = leftovers.map((leftover: ILeftOver) => (
        <LeftOverInput
            key={leftover.id}
            increment={() => dispatch(leftoverIncrement({ id: leftover.id }))}
            decrement={() => dispatch(leftoverDecrement({ id: leftover.id }))}
            remove={() => dispatch(leftoverRemoved({ id: leftover.id }))}
            value={leftover.amount}
            title={leftover.name}
            unit={leftover.unit}
        />
    ))
    

    return (
        <Box padding="l" backgroundColor="mainBackground" flex={1}>
            <NewPlanNavigationBar
                onClickBack={
                    () => navigation.navigate('MealQuantity')}
                onClickNext={
                    () => navigation.navigate('FoodPreferences')}
                onClickAbort={
                    () => {
                        dispatch(resetPlanConfiguration())
                        navigation.navigate('CurrentPlan')
                    }
                }>
                <Box marginVertical="l" marginHorizontal="xs" padding="m" height={"75%"}>
                    <Text variant="subheader">Do you have any leftovers?</Text>
                    <SearchBar></SearchBar>
                    <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
                    {mealInputs}
                </ScrollView>
                </Box>
            </NewPlanNavigationBar>
        </Box>
    )
}

export default LeftoversScreen
