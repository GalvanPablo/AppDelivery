import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import TabNav from './TabNav'


import EditUserData from '../screens/EditUserData'

import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../store/actions/categories.action'
import { getProducts } from '../store/actions/products.action'

const MainNav = () => {
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)

    const user = useSelector(state => state.user)

    
    const userHaveData = (user.nombre === '' || user.apellido === '') ? false : true
    // React.useEffect(() => {
    //     if(!userHaveData){
    //         console.log('sin datos de usuario')
    //     }else{
    //         console.log('con datos de usuario')
    //     }
    // }, [user])

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