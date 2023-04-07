import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import COLORS from '../constants/colors'

const SwitchButton = ({option1, option2, onPress, firstOption}) => {

    const [op1, setOp1] = React.useState(firstOption)

    React.useEffect(() => {
        onPress(op1)
    }, [op1])

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <TouchableOpacity style={[styles.touch, op1 && styles.touchActive]} onPress={()=>setOp1(true)}>
                    <Text style={[styles.text, op1 && styles.textActive]}>{option1}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.touch, !op1 && styles.touchActive]} onPress={()=>setOp1(false)}>
                    <Text style={[styles.text, !op1 && styles.textActive]}>{option2}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SwitchButton

const styles = StyleSheet.create({
    container: {
        width: '90%',

        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '90%',
        height: 60,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 1,
        backgroundColor: COLORS.secondary,
    },
    touch: {
        width: '50%',
        height: '96%',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
    },
    touchActive: {
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.gray,
        fontSize: 18,
    },
    textActive: {
        color: COLORS.white,
    },
})