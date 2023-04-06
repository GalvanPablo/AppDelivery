import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import { Input, Button } from '../components'

import { useDispatch } from 'react-redux'
import { signup, login } from '../store/actions/auth.actions'

const Login = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [authType, setAuthType] = React.useState('Iniciar Sesión')

    const handleAuth = () => {
        if(email === '' || password === '') {
            alert('Todos los campos son obligatorios')
        }else{
            dispatch(authType === 'Iniciar Sesión' ? login(email, password) : signup(email, password))
        }
    }

    return (
        <View style={styles.screen}>
            <Text>{authType}</Text>
            <View style={styles.inputContainer}>
                <Input
                    type='email'
                    label={'Email'}
                    errorText={'Email invalido'}
                    onInputChange={(data) => setEmail(data.isValid ? data.value : '')}
                />
                <Input
                    type='password'
                    label={'Contraseña'}
                    errorText={'Contraseña invalida'}
                    onInputChange={(data) => setPassword(data.isValid ? data.value : '')}
                    minLength={8}
                />
            </View>
            <Button
                title='Iniciar sesion'
                onPress={() => handleAuth()}
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        marginVertical: 10
    },
})