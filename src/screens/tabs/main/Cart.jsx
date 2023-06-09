import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Header, ItemCart } from '../../../components'

import COLORS from '../../../constants/colors'
import { FontAwesome } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../../store/actions/cart.action'

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})

const Cart = ({navigation}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.list)
    const total = useSelector(state => state.cart.total)

    return (
        <SafeAreaView style={styles.screen}>
            <Header title={"Carrito"} goBack/>
            <View style={styles.screenContainer}>
                {cart.length > 0 ? <>
                    <FlatList
                        data={cart}
                        renderItem={({item}) => <ItemCart item={item}/> }
                        keyExtractor={item => item.product.id}
                        style={{padding: 10}}
                    />
                    <Text style={styles.total}>Total: {currencyFormat(total)}</Text>
                    <View style={styles.actionsContainer}>
                        <Pressable style={styles.clearCart}  onPress={() => dispatch(clearCart())}>
                            <FontAwesome name="trash-o" size={24} color="black" />
                        </Pressable>
                        <Button title={"Realizar Pedido"} onPress={() => {
                            navigation.navigate("PucharseDetail")
                        }}/>
                    </View>
                </>
                : <Text style={styles.text}>No hay productos en el carrito</Text>
                }
            </View>
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    total: {
        textAlign: 'right',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },

    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

    clearCart: {
        backgroundColor: COLORS.gray,
        padding: 10,
        borderRadius: 10,
    },

    text: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        color: COLORS.black,
    }
})