import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../constants/colors'
import { Header } from '../../../components'

const History = () => {
    return (
        <SafeAreaView style={styles.screen}>
            <Header title={"Historial"}/>
        </SafeAreaView>
    )
}

export default History

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
    },
})