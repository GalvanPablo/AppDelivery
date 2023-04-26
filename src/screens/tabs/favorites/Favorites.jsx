import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header, ProductList } from '../../../components'

import ProductItem from '../../../components/ProductItem'
import colors from '../../../constants/colors'


const Favorites = ({navigation}) => {
    // const navigation = useNavigation()

    const products = [
        {id: 1, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 2, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 3, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 4, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 5, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 6, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 7, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
    ]
    
    const handleOnPressItem = (producto) => {
        console.log(producto)
        navigation.navigate('ProductDetail')
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title={"Favoritos"} goCart/>
            <View style={styles.screenContainer}>
                <ProductList products={products} onPressItem={handleOnPressItem} />
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