import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import { NavigationButtonContainer } from '../../components/ui/inputs/NavigationButton'
import { useDispatch, useSelector } from 'react-redux'
import { IMealAmount, mealAdded, mealIncrement, mealDecrement, selectAllMeals } from '../../redux/slice/newPlanSlice'
import PlusMinusInput from '../../components/ui/inputs/PlusMinusInput'
import AddItemButton from '../../components/ui/inputs/AddItemButton'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const MealQuantityScreen = ({ navigation }: Props) => {
    const meals = useSelector(selectAllMeals)
    const dispatch = useDispatch()

    const mealInputs = meals.map((meal: IMealAmount, index: number) => (
        <PlusMinusInput key={meal.id}
            increment={() => dispatch(mealIncrement({ id: meal.id }))}
            decrement={() => dispatch(mealDecrement({ id: meal.id }))}
            value={meal.amount} title={`Meal ${index + 1}`} />
    ))

    const addMeal = (
        <AddItemButton
            onPress={() => dispatch(mealAdded())}
             />
    )

    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
            <Box marginVertical="l" marginHorizontal="xs" padding="m" height={"75%"}>
                <Text variant="subheader">How many meals are you planning for?</Text>
                <Box marginVertical="l">
                    <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
                        {mealInputs}
                        {addMeal}
                    </ScrollView>
                </Box>
            </Box>
            <NavigationButtonContainer
                onPressLeft={() => navigation.navigate('CurrentPlan')}
                textLeft="Home"
                onPressRight={() => navigation.navigate('LeftOvers')}
                textRight="Next" />
        </Box>
    )
}

export default MealQuantityScreen
