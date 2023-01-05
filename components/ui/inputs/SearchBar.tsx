import React, { useState } from 'react'
import { createBox, createText } from '@shopify/restyle'
import { TextInput, Keyboard, FlatList, ListRenderItemInfo, View } from 'react-native'
import { Theme } from '../../../utils/theme'
import IconButton from './IconButton'
import { leftoverAdded, selectAllLeftovers } from '../../../redux/slice/newPlanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllIngredients } from '../../../redux/slice/ingredientSlice'

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
            backgroundColor="mainBackground"
            borderRadius={50}
            borderWidth={2}
            borderColor="accent"
            justifyContent="space-between">
            {/* Input field */}
            <TextInput
                style={{ width: 265 }}
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
                    size={15}></IconButton>
            )}
        </Box>
    )
}

type ItemProps = {
    id: number
    name: string
    smallestAmount: number
    amount: number
    unit: string
}

//Items for search bar proposals with important ingredient properties for leftovers
const Item = ({ id, name, smallestAmount, amount, unit }: ItemProps) => {
    const dispatch = useDispatch()
    return (
        <Box
            padding="xs"
            backgroundColor="mainBackground"
            borderRadius={10}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="navigationButton">{name}</Text>
            {/* icon button for adding food items to leftovers */}
            <IconButton
                onPress={() => dispatch(leftoverAdded({ id, name, smallestAmount, amount, unit }))}
                icon={'ios-add-circle-outline'}
                size={25}></IconButton>
        </Box>
    )
}

type ListProps = {
    searchPhrase: string
    data: any
}

//List of displayed items, no case sensitivity
const List = ({ searchPhrase, data }: ListProps) => {
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

const SearchBar = () => {
    const [searchPhrase, setSearchPhrase] = useState('')
    const [clicked, setClicked] = useState(false)

    const leftovers = useSelector(selectAllIngredients)

    return (
        <Box marginVertical="m" paddingVertical="m">
            <SearchBarDisplay
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {clicked && <List searchPhrase={searchPhrase} data={leftovers} />}
        </Box>
    )
}

export default SearchBar
