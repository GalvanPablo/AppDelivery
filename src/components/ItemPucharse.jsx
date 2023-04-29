import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})
const ItemPucharse = ({pucharse}) => {
    return (
        <View>
            <Text>{pucharse.id}</Text>
            <Text>{currencyFormat(pucharse.total)}</Text>
            <Text>{pucharse.date}</Text>
        </View>
    )
}

export default ItemPucharse

const styles = StyleSheet.create({})