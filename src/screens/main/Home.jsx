import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const userId = useSelector(state => state.auth.userId)
  const user = useSelector(state => state.auth.user)
  
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})