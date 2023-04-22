import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import { CategoryScroll } from '../../components'

import { API_URL } from "../../constants/database";

const Home = () => {
    const userId = useSelector(state => state.auth.userId)
    const user = useSelector(state => state.auth.user)

    const categories = useSelector(state => state.categories.categorias)

    return (
        <SafeAreaView>
            <Text>Home</Text>

            <CategoryScroll categories={categories} />



        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})