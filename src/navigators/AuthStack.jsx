import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import { Welcome, Access } from '../screens/auth';

const AuthStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Access" component={Access} />
    </Stack.Navigator>
)


export default AuthStack