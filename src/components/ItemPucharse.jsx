import React from 'react'
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'

import COLORS from '../constants/colors'

import { FontAwesome5 } from '@expo/vector-icons';

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})
const ItemPucharse = ({pucharse}) => {
    const [showDetails, setShowDetails] = React.useState(false)

    return (
        <Pressable style={styles.container} onPress={() => setShowDetails(!showDetails)}>
            <View style={[styles.inline, {justifyContent: 'space-between'}]}>
                <Text style={styles.date}>{pucharse.date}</Text>
                <FontAwesome5 name={showDetails ? "chevron-down" : "chevron-up"} size={20} color={COLORS.black} />
            </View>
            <View style={styles.inline}>
                <FontAwesome5 name="map-marker-alt" size={20} color={COLORS.dark_gray} />
                <Text style={styles.address}>{(pucharse.address.address).split(",")[0] + ", " + (pucharse.address.address).split(",")[1]}</Text>
            </View>

            { showDetails &&
                <FlatList
                    data={pucharse.cart}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <View style={styles.itemInfo}>
                                <Text>{item.cant} x </Text>
                                <Text style={styles.itemName}>{item.product.nombre}</Text>
                            </View>
                            <Text style={styles.itemPrice}>{currencyFormat(item.product.precio * item.cant)}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.product.id}
                    style={styles.list}
                />
            }

            <Text style={styles.total}>Total: {currencyFormat(pucharse.total)}</Text>

        </Pressable>
    )
}

export default ItemPucharse

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        width: '95%',
        alignSelf: 'center',

        padding: 15,
        borderRadius: 10,
        gap: 10,

        backgroundColor: COLORS.white,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,

    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    itemInfo: {
        flexDirection: 'row',
    },

    date: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    address: {
        fontSize: 14,
    },

    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    total: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    list: {
        borderTopWidth: 1,
        borderColor: COLORS.ligth_gray,
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 20,
    },
})