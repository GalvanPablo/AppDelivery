import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import COLORS from '../../constants/colors'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { Header, Button, QuantitySelector } from '../../components'

import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../store/actions/cart.action'

const currencyFormat = (num) => num.toLocaleString("es-AR", {style: "currency", currency: "ARS", minimumFractionDigits: 2})

const ProductDetail = ({navigation}) => {
    const dispatch = useDispatch()
    const producto = useSelector(state => state.products.detalleProducto)
    const [favorito, setFavorito] = React.useState(false)

    const [cantidad, setCantidad] = React.useState(1)

    const handleAddToCart = () => {
        dispatch(addToCart(producto, cantidad))
        navigation.navigate('Cart')
    }


    return (
        <SafeAreaView style={styles.screen}>
            <Header title={producto.categoria.slice(0, -1)} goBack/>
            <View style={styles.screenContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: producto.imagen}} style={styles.image}/>
                    <Pressable style={styles.favoriteButton}
                        onPress={() => setFavorito(!favorito)}
                    >
                        {favorito
                            ? <FontAwesome name="heart" size={28} color={COLORS.primary} onPress={() => setFavorito(!favorito)} />
                            : <FontAwesome5 name="heart" size={28} color={COLORS.dark_gray} onPress={() => setFavorito(!favorito)} />
                        }
                    </Pressable>
                </View>
                
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{producto.nombre}</Text>
                    <Text style={styles.price}>{currencyFormat(producto.precio)}</Text>
                    <Text style={styles.description}>{producto.descripcion}</Text>
                </View>
                
                <View style={styles.cartAction}>
                    <QuantitySelector onChange={setCantidad}/>
                    <Button
                        title="Agregar al carrito"
                        styleBtn={styles.cartButton}
                        styleTxt={styles.cartButtonText}
                        icon={<FontAwesome5 name="shopping-cart" size={20} color={COLORS.white} />}
                        onPress={handleAddToCart}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    imageContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    infoContainer: {
        flex: 1,
        padding: 20,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'NunitoSans_400Regular',
    },

    price: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'NunitoSans_400Regular',
    },

    description: {
        fontSize: 16,
        fontFamily: 'NunitoSans_400Regular',
        color: COLORS.dark_gray,
        marginTop: 10,
    },

    favoriteButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.gray + '40',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },


    cartAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    cartButton: {
        width: 200,
        height: 45,
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        alignSelf: 'center',
    },

    cartButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'NunitoSans_400Regular',
    }
})