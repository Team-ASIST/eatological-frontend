import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import React from 'react'
import SearchBar from '../../components/ui/inputs/SearchBar'
import NewPlanNavigationBar from './NavigationNewPlanBar'
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { resetPlanConfiguration } from '../../redux/slice/newPlanSlice'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const LeftoversScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch()

    return (
        <Box padding="l" backgroundColor="mainBackground" flex={1}>
            <NewPlanNavigationBar
                onClickBack={
                    () => navigation.navigate('MealQuantity')}
                onClickNext={
                    () => navigation.navigate('SwapMeals')}
                onClickAbort={
                    () => {
                        dispatch(resetPlanConfiguration())
                        navigation.navigate('CurrentPlan')
                    }
                }>
                <Box marginVertical="l" marginHorizontal="xs" padding="m" height={"75%"}>
                    <Text variant="subheader">Do you have any leftovers?</Text>
                    <SearchBar></SearchBar>
                </Box>
            </NewPlanNavigationBar>
        </Box>
    )
}

export default LeftoversScreen
