import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import ProductItem from './ProductItem'

const ProductList = ({products}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({item}) => <ProductItem producto={item} />}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </View>
    )
}

export default ProductList

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 40,
    }
})