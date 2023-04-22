import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ProductList } from '../../components'

import ProductItem from '../../components/ProductItem'


const Favorites = () => {
    const products = [
        {id: 1, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 2, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 3, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 4, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 5, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 6, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
        {id: 7, nombre: 'Max Cheese', precio: 100, imagen: 'https://e7.pngegg.com/pngimages/708/772/png-clipart-indian-cuisine-foodservice-eating-computer-icons-breakfast-food-recipe.png'},
    ]
    

    return (
        <SafeAreaView>
            <Text>Favorites</Text>

            <ProductList products={products} />

        </SafeAreaView>
    )
}

export default Favorites

const styles = StyleSheet.create({})