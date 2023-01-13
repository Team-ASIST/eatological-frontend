import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { resetPlanConfiguration, selectAllPreferences, preferenceRemoved } from '../../redux/slice/newPlanSlice'
import { FoodPreference } from '../../utils/dataTypes'
import { ScrollView } from "react-native-gesture-handler";
import NewPlanNavigationBar from './NavigationNewPlanBar'
import { AppDispatch } from '../../redux/store'
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
    const dispatch = useDispatch<AppDispatch>()
    const route = useRoute()

    const preferenceInputs = preferences.map((preference: FoodPreference) => (
        <IngredientInput
        key={preference.id}
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
                    <Text variant="subheader">Möchtest Du etwas bestimmtes essen?</Text>
                    <Box position="relative" zIndex={1}>
                        <SearchBar typeOfItems="foodpreference"></SearchBar>
                    </Box>
                    <Box
                        position="absolute"
                        top={185}
                        width={'111.2%'}
                        height={'75%'}
                        padding="m"
                        zIndex={0}>
                        <ScrollView
                            alwaysBounceVertical={false}
                            showsVerticalScrollIndicator={false}>
                            {preferenceInputs}
                        </ScrollView>
                    </Box>
                </Box>
            </NewPlanNavigationBar>
        </Box>
    )
}

export default FoodPreferencesScreen
