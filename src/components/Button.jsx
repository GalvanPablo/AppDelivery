import { Pressable, StyleSheet, Text } from 'react-native'

import COLORS from '../constants/colors'
import React from 'react'

const Button = ({title, onPress, styleBtn, styleTxt, icon = null}) => {
    return (
        <Pressable onPress={onPress} style={[styles.button, styleBtn]}>
            {icon}
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
        flexDirection: 'row',
        gap: 10,

        shadowColor: COLORS.dark_gray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'NunitoSans_400Regular',
    },
})