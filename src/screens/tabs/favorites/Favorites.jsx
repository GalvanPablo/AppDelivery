import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button, Header, ProductList } from '../../../components'
import colors from '../../../constants/colors'

import { useSelector, useDispatch } from 'react-redux'

import { getFavorites } from '../../../store/actions/user.action'


const Favorites = ({navigation}) => {
    const dispatch = useDispatch()

    const favoritos = useSelector(state => state.user.favoritos)
    const productos = useSelector(state => state.products.productos)
    const [listFav, setListFav] = React.useState([])

    React.useEffect(() => {
        const fav = productos.filter(p => favoritos.includes(p.id))
        setListFav(fav)
    }, [favoritos, productos])

    return (
        <SafeAreaView style={styles.screen}>
            <Header title={"Favoritos"} goCart/>
            <View style={styles.screenContainer}>
                {listFav.length === 0
                    ? <Text>No hay favoritos</Text>
                    : <ProductList products={listFav} />
                }
            </View>
            <Button title="Eliminar todos los favoritos" onPress={() => dispatch({type: 'GET_FAVORITES', favoritos: []})}/>
            <Button title="Obtener favoritos" onPress={() => dispatch(getFavorites())} styleBtn={{backgroundColor: '#555555'}}/>
            <Button title="Ver favoritos" onPress={() => console.log(favoritos)} styleBtn={{backgroundColor: '#333333'}}/>
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