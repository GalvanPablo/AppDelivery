import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import Home from '../screens/Home'
import EditUserData from '../screens/EditUserData'

import { useSelector } from 'react-redux'

const MainNav = () => {
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


    const isAuthenticated = token ? true : false

    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthStack /> : !userHaveData ? <EditUserData /> : <Home />}
        </NavigationContainer>
    )
}

export default MainNav