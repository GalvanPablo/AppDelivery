import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header, ProductList } from '../../../components'
import colors from '../../../constants/colors'

import { useSelector } from 'react-redux'


const Favorites = ({navigation}) => {
    const fav = useSelector(state => state.user.favoritos)
    const favoritos = useSelector(state => state.products.productos.filter(p => fav.some(f => f === p.id)))

    return (
        <SafeAreaView style={styles.screen}>
            <Header title={"Favoritos"} goCart/>
            <View style={styles.screenContainer}>
                <ProductList products={favoritos} />
            </View>
        </SafeAreaView>
    )
}

export default Favorites

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
})