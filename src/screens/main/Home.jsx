import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { API_URL } from "../../constants/database";

import { useSelector, useDispatch } from 'react-redux'
import { seleccionarCategoria } from '../../store/actions/categories.action'
import { filterProducts } from '../../store/actions/products.action'

import { CategoryScroll, Header } from '../../components'
import { ProductList } from '../../components'
import colors from '../../constants/colors';


const Home = () => {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.auth.userId)
    const user = useSelector(state => state.auth.user)

    const categories = [{id: 0, nombre: 'Todo'}, ...useSelector(state => state.categories.categorias)]
    const [activeCategory, setActiveCategory] = React.useState(0)

    React.useEffect(() => {
        dispatch(filterProducts(activeCategory))
    }, [activeCategory])


    const products = useSelector(state => state.products.productosFiltrados)

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.screenContainer}>
                <Header title={"Express Food"}/>
                <View style={styles.filter}>
                    <CategoryScroll categories={categories} selected={activeCategory} onSelect={setActiveCategory}/>
                </View>
                <View style={styles.listContainer}>
                    <ProductList products={products} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    filter: {
        marginVertical: 10,
    },
    listContainer: {
        marginVertical: 10,
        height: '93%'
    }
})