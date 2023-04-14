import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const userId = useSelector(state => state.auth.userId)
  return (
    <View>
      <Text>Home</Text>
      <Text>LocalID: {userId}</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})