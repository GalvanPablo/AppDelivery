import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import { Welcome ,Access } from '../screens';

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Access" component={Access} />
        </Stack.Navigator>
    )
}

export default AuthStack