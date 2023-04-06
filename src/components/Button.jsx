import { Pressable, StyleSheet, Text } from 'react-native'

import COLORS from '../constants/colors'
import React from 'react'

const Button = ({title, onPress, styleBtn, styleTxt}) => {
    return (
        <Pressable onPress={onPress} style={[styles.button, styleBtn]}>
            <Text style={[styles.text, styleTxt]}>{title}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: 308,
        height: 58,
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        // fontFamily: 'NunitoSans_400Regular',
    },
})