import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../../constants/colors'

import { Header } from '../../components'

const ProductDetail = () => {


    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Detalle" goBack/>
            <View style={styles.screenContainer}>
                <Text>ItemDetail</Text>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
})