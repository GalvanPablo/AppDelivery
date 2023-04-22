import React from 'react'
import { Pressable } from 'react-native'
import { StyleSheet, Text, View, FlatList } from 'react-native'

const RenderCategory = ({category, selected, onPress}) => {
    const color = selected == category.id ? 'red' : 'black'
    return (
        <Pressable
            style={[styles.category, {borderBottomColor: color}]}
            onPress={() => onPress(category.id)}
        >
            <Text style={[
                {color: color}
            ]}>{category.nombre}</Text>
        </Pressable>
    )
}

const CategoryScroll = ({categories, selected, onSelect}) => {


    return (
        <View>
            <FlatList
                horizontal
                data={categories}
                renderItem={({item}) => <RenderCategory category={item} selected={selected} onPress={onSelect}/>}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default CategoryScroll

const styles = StyleSheet.create({
    category: {
        borderBottomWidth: 2,

        marginHorizontal: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
    }
})