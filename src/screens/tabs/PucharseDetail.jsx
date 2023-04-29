import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header, AddressSelector, PaymentMethodSelector, Button  } from '../../components'

import COLORS from '../../constants/colors'

import { useSelector } from 'react-redux'

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})
const PucharseDetail = () => {
    const cart = useSelector(state => state.cart.list)
    const total = useSelector(state => state.cart.total)
    const [direccion, setDireccion] = React.useState(null)
    const [pago, setPago] = React.useState(null)

    const confirmarPedido = () => {
        console.log('## Confirmar Pedido')
        console.log("Carrito:", cart)
        console.log("Total:", currencyFormat(total))
        console.log("Direccion:", direccion)
        console.log("Pago:", pago)
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Detalles del pedido" goBack/>
            <View style={styles.screenContainer}>
                <View style={styles.detalle}>
                    <Text style={styles.tituloDetalle}>Detalles del pedido</Text>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: </Text>
                        <Text style={styles.total}>{currencyFormat(total)}</Text>
                    </View>
                </View>

                <View style={styles.detalle}>
                    <Text style={styles.tituloDetalle}>Detalles del entrega</Text>
                    <AddressSelector onSave={(direccion)=>setDireccion(direccion)}/>
                </View>

                <View style={styles.detalle}>
                    <Text style={styles.tituloDetalle}>Forma de pago</Text>
                    <PaymentMethodSelector onConfirm={(response)=>setPago(response)}/>
                </View>

                <View style={styles.action}>
                    <Button title={"Confirmar Pedido"} onPress={() => confirmarPedido()}/>
                </View>
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

    detalle: {
        padding: 10,
    },
    tituloDetalle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    totalContainer: {
        padding: 15,
        borderRadius: 10,
        gap: 5,

        backgroundColor: COLORS.white,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    totalText:{
        fontSize: 16,
        fontWeight: 'bold',
    },

    total: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    //#region Direccion
    direccion: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    //#endregion

    //#region Pago
    pago: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    //#endregion

    //#region Accion
    action: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})