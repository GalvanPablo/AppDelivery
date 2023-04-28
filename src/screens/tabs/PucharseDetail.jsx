import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button, Header } from '../../components'

import COLORS from '../../constants/colors'

import { useSelector } from 'react-redux'

import { FontAwesome } from '@expo/vector-icons';

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})
const PucharseDetail = () => {
    const cart = useSelector(state => state.cart.cart)
    const total = useSelector(state => state.cart.total)

    const [direcciones, setDirecciones] = React.useState([])

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

                <View style={styles.detalle}>
                    <Text style={styles.tituloDetalle}>Detalle de la entrega</Text>
                    <View style={styles.ubicacion}>
                        <Text style={styles.ubicacionNombre}>CASA</Text>
                        <Text style={styles.ubicacionDireccion}>Av. Siempre Viva 742</Text>
                        <Text style={styles.ubicacionDetalle}>Porton negro</Text>
                    </View>
                    <View style={styles.ubicacion}>
                        <Text>Nueva dirección</Text>
                    </View>
                </View>

                <View style={styles.detalle}>
                    <Text style={styles.tituloDetalle}>Forma de pago</Text>
                    <View style={styles.medioPago}>
                        <FontAwesome name="credit-card" size={32} color="black" />
                        <Text>**** 0575 - Debito</Text>
                    </View>
                    <View style={styles.medioPago}>
                        <FontAwesome name="money" size={32} color="black" />
                        <Text>Efectivo</Text>
                    </View>
                </View>

                <Button title={"Confirmar Pedido"} onPress={() => console.log('Confirmar Pedido')}/>
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

    ubicacion: {
        marginVertical: 5,
        gap: 5,

        backgroundColor: COLORS.ligth_gray,

        padding: 10,
        borderRadius: 10,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 1,
    },

    ubicacionNombre: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'NunitoSans_700Bold',
    },

    medioPago: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        gap: 10,

        backgroundColor: COLORS.ligth_gray,

        padding: 10,
        borderRadius: 10,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 1,
    },

})