import React, { useState } from 'react'
import { createBox, createText } from '@shopify/restyle'
import theme, { Theme } from '../../../utils/theme'
import { TextInput, Keyboard, Modal, Pressable } from 'react-native'
import IconButton from './IconButton'

const Text = createText<Theme>()
const Box = createBox<Theme>()

export type UsernameInputProps = {
    modalVisible: boolean
    setModalVisible: (arg0: boolean) => void
    clicked: boolean
    setClicked: (arg0: boolean) => void
    placeholder: string
    currentUsername: string
    setCurrentUsername: (arg0: string) => void
    changeUser: (arg0: string) => void
}

export const UsernameInput = ({
    modalVisible,
    setModalVisible,
    clicked,
    setClicked,
    placeholder,
    currentUsername,
    setCurrentUsername,
    changeUser,
}: UsernameInputProps) => {
    return (
        <Box>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <Box
                    top={130}
                    alignItems="center"
                    backgroundColor="white"
                    padding={'l'}
                    margin={'s'}
                    borderRadius={20}>
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
                            placeholder={placeholder}
                            value={currentUsername}
                            onChangeText={setCurrentUsername}
                            onFocus={() => {
                                setClicked(true)
                            }}
                        />
                        {/* close button, depending on whether the Input is clicked or not */}
                        {clicked && (
                            <IconButton
                                onPress={() => {
                                    Keyboard.dismiss()
                                    setClicked(false)
                                    setCurrentUsername('')
                                }}
                                icon={'close'}
                    size={15}
                    color={theme.colors.black}
                            />
                        )}
                    </Box>
                    <Pressable
                        onPress={() => {
                            setClicked(false)
                            changeUser(currentUsername)
                            setCurrentUsername('')
                            setModalVisible(!modalVisible)
                        }}>
                        <Text variant="subsubheader">Okay</Text>
                    </Pressable>
                    <Pressable onPress={() => {
                      setClicked(false)
                      setCurrentUsername('')
                      setModalVisible(!modalVisible)}}>
                        <Text variant="subsubheader">Cancel</Text>
                    </Pressable>
                </Box>
            </Modal>
        </Box>
    )
}
