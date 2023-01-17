import React from 'react'
import { createBox, useTheme } from '@shopify/restyle'
import { TextInput, Keyboard } from 'react-native'
import { Theme } from '../../../utils/theme'
import IconButton from './IconButton'

const Box = createBox<Theme>()

type SearchBarDisplayProps = {
    clicked: boolean
    searchPhrase: string
    setSearchPhrase: (input: string) => void
    setClicked: (click: boolean) => void
}

{
    /* Component for the display of the searchBar */
}
const SearchBarDisplay = ({
    clicked,
    searchPhrase,
    setSearchPhrase,
    setClicked,
}: SearchBarDisplayProps) => {
    const theme = useTheme<Theme>()

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
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 210 }}
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
                    color={theme.colors.secondaryCardText}
                />
            )}
        </Box>
    )
}

export default SearchBarDisplay
