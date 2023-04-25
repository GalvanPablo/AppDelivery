import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import TabNav from './TabNav'


import { EditUserData } from '../screens/tabs/profile'

import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../store/actions/categories.action'
import { getProducts } from '../store/actions/products.action'

const MainNav = () => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.user)
    const userHaveData = (user.nombre === '' || user.apellido === '') ? false : true

    React.useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [])


    const isAuthenticated = token ? true : false

    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthStack /> : !userHaveData ? <EditUserData /> : <TabNav />}
        </NavigationContainer>
    )
}

export default MainNav