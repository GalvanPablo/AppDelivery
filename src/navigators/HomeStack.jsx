import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import { Home, ProductDetail, Cart, PucharseDetail } from '../screens/tabs/main'

const HomeStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="PucharseDetail" component={PucharseDetail} />
    </Stack.Navigator>
)

export default HomeStack