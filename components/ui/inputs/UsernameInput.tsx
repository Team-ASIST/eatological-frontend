import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import theme, { Theme } from '../../../utils/theme'
import { TextInput, Keyboard, Modal, TouchableOpacity } from 'react-native'
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
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            {/* Container for all components in modal*/}
            <Box
                top={80}
                backgroundColor="white"
                paddingVertical="xl"
                paddingHorizontal="m"
                margin="s"
                borderRadius={20}
                height={'100%'}
                shadowOpacity={0.05}>
                <Text variant={'subheader'} marginHorizontal={'l'}>
                    {switchMode
                        ? 'Wechsel zu einem existierenden Konto!'
                        : 'Gib einen neuen Nutzernamen an!'}
                </Text>
                {/* Container for Input field */}
                <Box
                    flexDirection="row"
                    padding="m"
                    margin="l"
                    backgroundColor="white"
                    alignItems="center"
                    borderRadius={5}
                    borderWidth={2}
                    borderColor="black"
                    justifyContent="space-between">
                    {/* Input field */}
                    <TextInput
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 210}}
                        placeholder={switchMode ? 'Kontonamen eingeben...' : 'Neuer Nutzername...'}
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
                {/* Container for Okay and Abbrechen Button*/}
                <Box flexDirection="row" justifyContent="space-between" marginHorizontal={'l'}>
                    <TouchableOpacity
                        onPress={() => {
                            setClicked(false)
                            changeUser(currentUsername)
                            setCurrentUsername('')
                            setModalVisible(!modalVisible)
                        }}>
                        <Box
                            borderRadius={5}
                            borderWidth={2}
                            borderColor="success"
                            paddingHorizontal={'m'}>
                            <Text
                                variant="boldBody"
                                color={'success'}
                                fontSize={18}
                                fontWeight={'bold'}>
                                Okay
                            </Text>
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setClicked(false)
                            setCurrentUsername('')
                            setModalVisible(!modalVisible)
                        }}>
                        <Box
                            borderRadius={5}
                            borderWidth={1}
                            borderColor="black"
                            paddingHorizontal={'m'}>
                            <Text variant="body" color={'black'} fontSize={18}>
                                Abbrechen
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </Modal>
    )
}
