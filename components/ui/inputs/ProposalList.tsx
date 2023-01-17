import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import { Keyboard, FlatList, ListRenderItemInfo, View } from 'react-native'
import theme, { Theme } from '../../../utils/theme'
import IconButton from './IconButton'
import { leftoverAdded, preferenceAdded } from '../../../redux/slice/newPlanSlice'
import { useDispatch} from 'react-redux'
import { AppDispatch } from '../../../redux/store'

const Text = createText<Theme>()
const Box = createBox<Theme>()



{
    /* typeOfItem specifies when pressing the plus button if the item is supposed to be a leftover or a foodpreference */
}
type ItemProps = {
    typeOfItem: string
    id: number
    name: string
    smallestAmount: number
    amount: number
    unit: string
    setClicked: (click: boolean) => void
    setSearchPhrase: (input: string) => void
}

{
    /* Items for search bar proposals with important ingredient properties for leftovers, preferences */
}
const Item = ({
    id,
    name,
    smallestAmount,
    amount,
    unit,
    typeOfItem,
    setClicked,
    setSearchPhrase,
}: ItemProps) => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Box
            padding="xs"
            backgroundColor="mainBackground"
            flexDirection="row"
            justifyContent="space-between"
            borderBottomWidth={1}
            borderColor="black"
            opacity={0.93}>
            <Text variant="subsubheader">{name}</Text>
            {/* icon button for adding food items to respective redux store */}
            <IconButton
                onPress={() => {
                    if (typeOfItem === 'leftover') {
                        dispatch(leftoverAdded({ id, name, smallestAmount, amount, unit }))
                    } else if (typeOfItem === 'foodpreference') {
                        dispatch(preferenceAdded({ id, name }))
                    }
                    Keyboard.dismiss()
                    setClicked(false)
                    setSearchPhrase('')
                }}
                icon={'ios-add-circle-outline'}
                size={25}
                color={theme.colors.black}
            />
        </Box>
    )
}

type ListProps = {
    setClicked: (click: boolean) => void
    setSearchPhrase: (input: string) => void
    typeOfItems: string
    searchPhrase: string
    data: any
}

{
    /* List of displayed items, no case sensitivity */
}
const ProposalList = ({ searchPhrase, data, typeOfItems, setClicked, setSearchPhrase }: ListProps) => {
    return (
        <Box maxHeight={200}>
            <FlatList
                style={{ flex: 0 }}
                initialNumToRender={data.length}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}
                data={data}
                renderItem={({ item }: ListRenderItemInfo<ItemProps>) => {
                    if (searchPhrase === '') {
                        return <View />
                    } else if (
                        item.name
                            .toLowerCase()
                            .includes(searchPhrase.trim().replace(/ /g, '_').toLowerCase())
                    ) {
                        return (
                            <Item
                                typeOfItem={typeOfItems}
                                name={item.name}
                                id={item.id}
                                smallestAmount={item.smallestAmount}
                                amount={item.smallestAmount}
                                unit={item.unit}
                                setClicked={setClicked}
                                setSearchPhrase={setSearchPhrase}
                            />
                        )
                    } else {
                        return <View />
                    }
                }}
                keyExtractor={(item: ItemProps) => item.id.toString()}
            />
        </Box>
    )
}

export default ProposalList