import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { IMealAmount, mealAdded, mealIncrement, mealDecrement, selectAllMeals, resetPlanConfiguration } from '../../redux/slice/newPlanSlice'
import PlusMinusInput from '../../components/ui/inputs/PlusMinusInput'
import AddItemButton from '../../components/ui/inputs/AddItemButton'
import { ScrollView } from "react-native-gesture-handler";
import NewPlanNavigationBar from './NavigationNewPlanBar'
import { AppDispatch } from '../../redux/store'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

// Returns the MealQuantityScreen which enables users to add Meals and specify the amount of portions for each Meal
const MealQuantityScreen = ({ navigation }: Props) => {
    const meals = useSelector(selectAllMeals)
    const dispatch = useDispatch<AppDispatch>()

    // Current Meals stored in newPlanSlice
    const mealInputs = meals.map((meal: IMealAmount, index: number) => (
        <PlusMinusInput key={meal.id}
            increment={() => dispatch(mealIncrement({ id: meal.id }))}
            decrement={() => dispatch(mealDecrement({ id: meal.id }))}
            value={meal.amount} title={`Gericht ${index + 1}`} />
    ))

    // Component enabling the user to add a meal on Pressing the Button
    const addMeal = (
        <AddItemButton
            onPress={() => dispatch(mealAdded())}
        />
    )

    return (
        <Box padding="l" backgroundColor="mainBackground" flex={1}>
            <NewPlanNavigationBar
                onClickNext={
                    () => navigation.navigate('LeftOvers')}
                onClickAbort={
                    () => {
                        dispatch(resetPlanConfiguration())
                        navigation.navigate('CurrentPlan')
                    }
                }>
                <Box marginVertical="l" marginHorizontal="xs" padding="m" height={"75%"}>
                    <Text variant="subheader">Wie viele Gerichte möchtest du planen?</Text>
                    <Box marginVertical="l">
                        <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
                            {mealInputs}
                            {addMeal}
                        </ScrollView>
                    </Box>
                </Box>
            </NewPlanNavigationBar>
        </Box>
    )
}

export default MealQuantityScreen
