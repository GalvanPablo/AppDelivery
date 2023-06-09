import React from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'

import { useDispatch } from 'react-redux'
import { getProductDetail } from '../store/actions/products.action'
import { useNavigation } from '@react-navigation/native'

import COLORS from '../constants/colors'

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})

const ProductItem = ({producto}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleOnPressItem = (producto) => {
        dispatch(getProductDetail(producto.id))
        navigation.navigate('ProductDetail')
    }
    return (
        <Pressable style={styles.container} onPress={()=>handleOnPressItem(producto)}>
            <View style={styles.imageContainer} >
                <Image style={styles.image} source={{uri: producto.imagen}}/>
            </View>
            <View style={styles.info} >
                <Text style={styles.name}>{producto.nombre}</Text>
                {/* <Text style={styles.price}>{currencyFormat(producto.precio)}</Text> */}
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