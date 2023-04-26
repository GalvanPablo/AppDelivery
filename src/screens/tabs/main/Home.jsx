import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useSelector, useDispatch } from 'react-redux'
import { filterProducts, getProductDetail } from '../../../store/actions/products.action'

import { Header, CategoryScroll, ProductList } from '../../../components'
import COLORS from '../../../constants/colors';


const Home = ({navigation}) => {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.auth.userId)
    const user = useSelector(state => state.auth.user)

    const categories = [{id: 0, nombre: 'Todo'}, ...useSelector(state => state.categories.categorias)]
    const [activeCategory, setActiveCategory] = React.useState(0)

    React.useEffect(() => {
        dispatch(filterProducts(activeCategory))
    }, [activeCategory])


    const products = useSelector(state => state.products.productosFiltrados)

    const handleOnPressItem = (producto) => {
        dispatch(getProductDetail(producto.id))
        navigation.navigate('ProductDetail')
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title={"Express Food"} goCart/>
            <View style={styles.screenContainer}>
                <View style={styles.filter}>
                    <CategoryScroll categories={categories} selected={activeCategory} onSelect={setActiveCategory}/>
                </View>
                <View style={styles.listContainer}>
                    <ProductList products={products} onPressItem={handleOnPressItem}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    filter: {
        marginVertical: 10,
    },
    listContainer: {
        marginVertical: 10,
        height: '93%'
    }
})