import { ImageBackground, TouchableOpacity } from 'react-native'
import React, { Fragment } from 'react'
import { Theme } from '../../../utils/theme';
import { createText, createBox, useTheme } from '@shopify/restyle';
import { BlurView } from 'expo-blur';
import IconText from '../common/iconText';

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type RecipeCardProps = {
    imageSource: string,
    cookingTime: number,
    recipeName: string,
    persons: number,
    ready?: boolean,
    cooked?: boolean,
    onClick?: Function
}

const recipeCard = (props: RecipeCardProps) => {
    const theme = useTheme<Theme>()

    return (
        <TouchableOpacity disabled={props.onClick ? false : true} onPress={() => props.onClick ? props.onClick() : undefined}>
            <Box backgroundColor="secondaryCardBackground" height={theme.heights.m}>
                <ImageBackground
                    imageStyle= {props.cooked ? {opacity: 0.5} : {}}
                    resizeMode="cover"
                    style={{ height: '100%', width: '100%', justifyContent: 'flex-end' }}
                    source={{
                        uri: props.imageSource,
                    }}
                >
                    <BlurView
                        tint="dark"
                        intensity={40}
                    >
                        <Box padding="s" flexDirection="row" width={"95%"} justifyContent="space-between" alignContent="center" margin="s">
                            <Box flexDirection="row" width={"80%"}>
                                <Text variant="subsubheader" color={"primaryCardText"}>
                                    {props.recipeName}
                                </Text>
                            </Box>
                            <Box flexDirection="row" justifyContent="flex-end" flexGrow={1} width={"20%"}>
                                {props.ready ?
                                    <Box>
                                        <IconText iconName={'checkmark-outline'} text={''} />
                                    </Box> :
                                    <Fragment></Fragment>
                                }
                                <Box paddingRight="m">
                                    <IconText iconName={'person-outline'} text={props.persons.toString()} />
                                </Box>
                            </Box>
                        </Box>
                    </BlurView>
                </ImageBackground>

                {/** top-right corner */}
                <Box padding='xs' style={{ position: 'absolute', top: 25, right: 0, backgroundColor: theme.colors.accent }}>
                    <Text
                        variant="body">
                        {props.cookingTime} mins
                    </Text>
                </Box>
            </Box>
        </TouchableOpacity>
    )
}

export default recipeCard
