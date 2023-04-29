import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AddressSelector, Button, Header } from '../../components'

import COLORS from '../../constants/colors'

import { useSelector } from 'react-redux'

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})
const PucharseDetail = () => {
    const cart = useSelector(state => state.cart.list)
    const total = useSelector(state => state.cart.total)
    const [direccion, setDireccion] = React.useState(null)

    const confirmarPedido = () => {
        console.log('## Confirmar Pedido')
        console.log("Carrito:", cart)
        console.log("Total:", currencyFormat(total))
        console.log("Direccion:", direccion)
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Detalles del pedido" goBack/>
            <View style={styles.screenContainer}>
                <View style={styles.detalle}>
                    <Text style={styles.tituloDetalle}>Detalles del pedido</Text>
                    <View>
                        <Text>Total: </Text>
                        <Text style={styles.total}>{currencyFormat(total)}</Text>
                    </View>
                </View>

                <View style={styles.direccion}>
                    <AddressSelector onSave={(direccion)=>setDireccion(direccion)}/>
                </View>

                {/* <View style={styles.detalle}>
                    <Text style={styles.tituloDetalle}>Forma de pago</Text>
                    <View style={styles.medioPago}>
                        <FontAwesome name="credit-card" size={32} color="black" />
                        <Text>**** 0575 - Debito</Text>
                    </View>
                    <View style={styles.medioPago}>
                        <FontAwesome name="money" size={32} color="black" />
                        <Text>Efectivo</Text>
                    </View>
                </View> */}

                <Button title={"Confirmar Pedido"} onPress={() => confirmarPedido()}/>
            </View>
        </SafeAreaView>
    )
}

export default PucharseDetail

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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },

    detalle: {
        padding: 10,
    },
    tituloDetalle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    //#region Direccion
    direccion: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    //#endregion

    //#region Medio de pago
    // medioPago: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginVertical: 5,
    //     gap: 10,

    //     backgroundColor: COLORS.ligth_gray,

    //     padding: 10,
    //     borderRadius: 10,

    //     shadowColor: COLORS.black,
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     elevation: 1,
    // },

    //#endregion
})