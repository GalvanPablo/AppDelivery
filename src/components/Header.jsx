import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../constants/colors'

import { useNavigation } from '@react-navigation/native'

const Header = ({title, isHome = false, goBack = false}) => {
    const navigation = useNavigation()

    if(isHome && goBack) throw new Error('isHome and goBack cannot be true at the same time')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {isHome && 
                <Pressable onPress={() => {
                    navigation.navigate('Cart')
                }}>
                    <FontAwesome5 name="shopping-cart" size={24} color="black" />
                </Pressable>
            }
            {goBack &&
                <Pressable onPress={() => {
                    navigation.goBack()
                }}>
                    <FontAwesome5 name="arrow-left" size={24} color="black" />
                </Pressable>
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 10,
        fontFamily: 'NunitoSans_400Regular',
        paddingVertical: 2,
    }
})