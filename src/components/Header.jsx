import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

const Header = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 10,
        fontFamily: 'NunitoSans_400Regular',
        paddingVertical: 2,
    }
})