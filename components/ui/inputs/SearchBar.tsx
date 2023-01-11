import React, { useState } from 'react'
import { createBox, createText } from '@shopify/restyle'
import { TextInput, Keyboard, FlatList, ListRenderItemInfo, View } from 'react-native'
import theme, { Theme } from '../../../utils/theme'
import IconButton from './IconButton'
import { leftoverAdded, preferenceAdded, selectAllLeftovers } from '../../../redux/slice/newPlanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllIngredients } from '../../../redux/slice/currentPlanSlice'
import { AppDispatch } from '../../../redux/store'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type SearchBarDisplayProps = {
    clicked: boolean
    searchPhrase: string
    setSearchPhrase: (input: string) => void
    setClicked: (click: boolean) => void
}

const SearchBarDisplay = ({
    clicked,
    searchPhrase,
    setSearchPhrase,
    setClicked,
}: SearchBarDisplayProps) => {
    return (
        <Box
            flexDirection="row"
            padding="m"
            marginBottom="s"
            backgroundColor="mainBackground"
            borderRadius={50}
            borderWidth={2}
            borderColor="accent"
            justifyContent="space-between">
            {/* Input field */}
            <TextInput
                style={{ width: 235 }}
                placeholder="Search..."
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                onFocus={() => {
                    setClicked(true)
                }}
            />
            {/* close button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <IconButton
                    onPress={() => {
                        Keyboard.dismiss()
                        setClicked(false)
                        setSearchPhrase('')
                    }}
                    icon={'close'}
                    size={15}
                    color={theme.colors.black}
                />
            )}
        </Box>
    )
}

//typeOfItem specifies if when pressing the plus button the item is supposed to be a leftover, a foodpreference, etc.
type ItemProps = {
    typeOfItem: string
    id: number
    name: string
    smallestAmount: number
    amount: number
    unit: string
}

//Items for search bar proposals with important ingredient properties for leftovers, preferences
const Item = ({ id, name, smallestAmount, amount, unit, typeOfItem }: ItemProps) => {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Box
            padding="xs"
            backgroundColor="mainBackground"
            borderRadius={10}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="subsubheader">{name}</Text>
            {/* icon button for adding food items to respective redux store*/}
            <IconButton
                onPress={() => {
                    if (typeOfItem === 'leftover') {
                        dispatch(leftoverAdded({ id, name, smallestAmount, amount, unit }))
                    } else if (typeOfItem === 'foodpreference') {
                        dispatch(preferenceAdded({ id, name }))
                    } else {
                        console.log('Unknown Type of item.')
                    }
                }}
                icon={'ios-add-circle-outline'}
                size={25}
                color={theme.colors.black}
            />
        </Box>
    )
}

type ListProps = {
    typeOfItems: string
    searchPhrase: string
    data: any
}

//List of displayed items, no case sensitivity
const List = ({ searchPhrase, data, typeOfItems }: ListProps) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }: ListRenderItemInfo<ItemProps>) => {
                if (searchPhrase === '') {
                    return <View />
                }
                if (
                    item.name
                        .toUpperCase()
                        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
                ) {
                    return (
                        <Item
                            typeOfItem={typeOfItems}
                            name={item.name}
                            id={item.id}
                            smallestAmount={item.smallestAmount}
                            amount={item.smallestAmount}
                            unit={item.unit}
                        />
                    )
                } else {
                    return <View />
                }
            }}
            keyExtractor={(item: ItemProps) => item.id.toString()}
        />
    )
}

type SearchBarProps = {
    typeOfItems: string
}

const SearchBar = ({ typeOfItems }: SearchBarProps) => {
    const [searchPhrase, setSearchPhrase] = useState('')
    const [clicked, setClicked] = useState(false)

    const allIngredients = useSelector(selectAllIngredients)

    return (
        <Box marginVertical="m" paddingVertical="m">
            <SearchBarDisplay
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {clicked && (
                <List typeOfItems={typeOfItems} searchPhrase={searchPhrase} data={allIngredients} />
            )}
        </Box>
    )
}

export default SearchBar
