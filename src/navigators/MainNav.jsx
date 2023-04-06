import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import Home from '../screens/Home'

import { useDispatch, useSelector } from 'react-redux'

const MainNav = () => {
    const token = useSelector(state => state.auth.token)
    const isAuthenticated = token ? true : false

    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthStack /> : <Home />}
        </NavigationContainer>
    )
}

export default MainNav