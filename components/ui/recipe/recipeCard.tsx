import { ImageBackground } from 'react-native'
import React from 'react'
import theme, { Theme } from '../../../utils/theme';
import { createText, createBox } from '@shopify/restyle';
import { BlurView } from 'expo-blur';
import IconText from '../common/iconText';

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type RecipeCardProps = {
    imageSource: string,
    cookingTime: number,
    recipeName: string,
    ready: boolean, 
    persons: number
}

const recipeCard = (props: RecipeCardProps) => {
    return (
        <Box backgroundColor="secondaryCardBackground" height={theme.heights.m}>
            <ImageBackground

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
                    <Box padding="s" flexDirection="row" justifyContent="space-between" alignContent="center">
                        <Text variant="subheader" color={"primaryCardText"}>
                            {props.recipeName}
                        </Text>
                        <Box flexDirection="row">
                            <Box paddingRight="m">
                                <IconText iconName={'person-outline'} text={props.persons.toString()} />
                            </Box>
                            {props.ready ?
                                <Box paddingRight="m">
                                    <IconText iconName={'checkmark-outline'} text={''} />
                                </Box> :
                                <Box paddingRight="m">
                                    <IconText iconName={'close'} text={''} />
                                </Box>
                            }
                        </Box>
                    </Box>
                </BlurView>
            </ImageBackground>

            {/** top-right corner */}
            <Box padding='xs' style={{ position: 'absolute', top: 10, right: 0, backgroundColor: theme.colors.primaryCardBackground }}>
                <Text
                    variant="body">
                    {props.cookingTime} mins
                </Text>
            </Box>
        </Box>
    )
}

export default recipeCard