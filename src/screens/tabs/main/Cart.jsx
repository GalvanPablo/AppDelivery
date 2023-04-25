import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../constants/colors'
import { Header } from '../../../components'

const Cart = () => {
    return (
        <SafeAreaView style={styles.screen}>
            <Header title={"Carrito"}/>
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
    },
})