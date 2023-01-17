import React, { useState } from 'react'
import { createBox, createText } from '@shopify/restyle'
import { TextInput, Keyboard} from 'react-native'
import theme, { Theme } from '../../../utils/theme'
import IconButton from './IconButton'
import { useSelector } from 'react-redux'
import { selectAllIngredients } from '../../../redux/slice/currentPlanSlice'
import ProposalList from './ProposalList'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type SearchBarDisplayProps = {
    clicked: boolean
    searchPhrase: string
    setSearchPhrase: (input: string) => void
    setClicked: (click: boolean) => void
}

{
    /* Component for the display of the searchBar only */
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
            hitSlop={{top: 20, bottom: 20, left: 20, right: 210}}
                placeholder="Suche..."
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
                <ProposalList
                    typeOfItems={typeOfItems}
                    searchPhrase={searchPhrase}
                    data={allIngredients}
                    setClicked={setClicked}
                    setSearchPhrase={setSearchPhrase}
                />
            )}
        </Box>
    )
}

export default SearchBar
