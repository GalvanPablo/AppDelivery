import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'

import COLORS from '../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons';

import QuantitySelector from './QuantitySelector'

import { useDispatch } from 'react-redux'
import { getProductDetail } from '../store/actions/products.action'
import { changeCantCart, removeFromCart } from '../store/actions/cart.action'
import { useNavigation } from '@react-navigation/native'

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})

const ItemCart = ({item}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Pressable style={styles.imageContainer} onPress={()=>{
                dispatch(getProductDetail(item.product.id))
                navigation.navigate('ProductDetail')
            }}>
                <Image source={{uri: item.product.imagen}} style={styles.image}/>
            </Pressable>

            <View style={styles.infoContainer}>
                <View style={styles.itemData}>
                    <Text style={styles.name}>{item.product.nombre}</Text>
                    <Pressable onPress={() => dispatch(removeFromCart(item.product.id))}>
                        <FontAwesome5 name="times-circle" size={20} color="black" />
                    </Pressable>
                </View>
                <View style={styles.itemData}>
                    <QuantitySelector iconSize={14} btnStyle={styles.quantitySelector} initialValue={item.cant}
                        onChange={(cant) => dispatch(changeCantCart(item.product.id, cant))}
                    />
                    <Text style={styles.price}>{currencyFormat(item.product.precio * item.cant)}</Text>
                </View>
            </View>
        </View>
    )
}

export default ItemCart

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        gap: 10,
    },

    //#region Item Image
    imageContainer:{
        width: 120,
        height: 120,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    //#endregion

    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 10,
        gap: 15,
    },
    itemData: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'NunitoSans_400Regular',
    },
    quantity: {
        fontSize: 16,
        color: COLORS.dark_gray,
        fontFamily: 'NunitoSans_400Regular',
    },
    price: {
        fontSize: 16,
        color: COLORS.dark_gray,
        fontFamily: 'NunitoSans_400Regular',
    },

    quantitySelector: {
        width: 30,
        height: 30,
        borderRadius: 5,
    },
})