import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import { Favorites, ProductDetail } from '../screens/tabs/favorites';

const FavoritesStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Fav" component={Favorites} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
)

export default FavoritesStack