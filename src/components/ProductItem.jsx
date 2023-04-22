import React from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'

import COLORS from '../constants/colors'

const ProductItem = ({producto, onPress}) => {
    return (
        <Pressable style={styles.container}>
            <View style={styles.imageContainer} >
                <Image style={styles.image} source={{uri: producto.imagen}}/>
            </View>
            <View style={styles.info} >
                <Text style={styles.name}>{producto.nombre}</Text>
                <Text style={styles.price}>${producto.precio}</Text>
            </View>
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        width: 165,
    },
    info: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        color: COLORS.dark_gray,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 120,
        height: 120,
    }
})