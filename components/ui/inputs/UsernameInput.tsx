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
    switchMode: boolean
    clicked: boolean
    setClicked: (arg0: boolean) => void
    currentUsername: string
    setCurrentUsername: (arg0: string) => void
    changeUser: (arg0: string) => void
}

export const UsernameInput = ({
    modalVisible,
    setModalVisible,
    switchMode,
    clicked,
    setClicked,
    currentUsername,
    setCurrentUsername,
    changeUser,
}: UsernameInputProps) => {
    return (
        <Box>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <Box
                    top={80}
                    alignItems="center"
                    backgroundColor="white"
                    padding={'l'}
                    marginHorizontal={'s'}
                    borderRadius={20}   
                    height={'100%'}
                    shadowOpacity={0.05}>
                    <Box  top={50} padding='m' >
                    <Text variant={'subsubheader'} margin={'m'}>{switchMode ? "Wechsel zu einem schon existierenden Konto!" : "Gib einen neuen Nutzernamen an!"} </Text>
                    <Box
                   
                        flexDirection="row"
                        padding="m"
                        margin="l"
                        backgroundColor="white"
                        alignItems="center"
                        borderRadius={5}
                        borderWidth={2}
                        width={235}
                        borderColor="black"
                        justifyContent="space-between">
                        {/* Input field */}
                        
                        <TextInput
                            style={{ width: 235 }}
                            placeholder={switchMode ? "Anderen Kontonamen eingeben..." : "Neuer Nutzername..."}
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
                    <Box flexDirection="row" justifyContent="space-between" margin={'l'}> 
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
                        <Text variant="subsubheader">Abbrechen</Text>
                    </Pressable>
                    </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
