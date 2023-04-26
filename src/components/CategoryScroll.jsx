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
            <Text style={{
                color: color,
                fontFamily: 'NunitoSans_400Regular',
                fontSize: 16,
            }}>{category.nombre}</Text>
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
        borderBottomWidth: 1.5,

        marginHorizontal: 10,
        paddingVertical: 4,
        paddingHorizontal: 8,
    }
})