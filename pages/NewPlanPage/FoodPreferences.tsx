import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { resetPlanConfiguration, selectAllPreferences, IFoodPreference, preferenceRemoved } from '../../redux/slice/newPlanSlice'
import { ScrollView } from "react-native-gesture-handler";
import NewPlanNavigationBar from './NavigationNewPlanBar'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import IngredientInput from '../../components/ui/inputs/IngredientInput'
import SearchBar from '../../components/ui/inputs/SearchBar'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const FoodPreferencesScreen = ({ navigation }: Props) => {
    const preferences = useSelector(selectAllPreferences)
    const dispatch = useDispatch()
    const route = useRoute()

    const preferenceInputs = preferences.map((preference: IFoodPreference) => (
        <IngredientInput
            remove={() => dispatch(preferenceRemoved({ id: preference.id }))}
            title={preference.name}
        />
    ))

    return (
        <Box padding="l" backgroundColor="mainBackground" flex={1}>
            <NewPlanNavigationBar
            onClickBack={
                () => navigation.navigate('LeftOvers')}
                onClickNext={
                    () => navigation.navigate('SwapMeals')}
                onClickAbort={
                    () => {
                        dispatch(resetPlanConfiguration())
                        navigation.navigate('CurrentPlan')
                    }
                }>
                <Box marginVertical="l" marginHorizontal="xs" padding="m" height={"75%"}>
                    <Text variant="subheader">Do you have any preferences?</Text>
                    <SearchBar typeOfItems='foodpreference'></SearchBar>
                    <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
                    {preferenceInputs}
                </ScrollView>
                </Box>
            </NewPlanNavigationBar>
        </Box>
    )
}

export default FoodPreferencesScreen
