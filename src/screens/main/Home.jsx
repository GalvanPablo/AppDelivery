import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    const userId = useSelector(state => state.auth.userId)
    const user = useSelector(state => state.auth.user)
    
    return (
        <SafeAreaView>
            <Text>Home</Text>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})