import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import { AdvanceInput, Button, SwitchButton } from '../../components'

import { useDispatch } from 'react-redux'
import { signup, login } from '../../store/actions/auth.actions'

import { useRoute } from '@react-navigation/native'

const Access = ({ navigation }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const route = useRoute()
    const tipoAcceso = route.params?.tipo

    const [authType, setAuthType] = React.useState('Iniciar Sesión')

    const handleAuth = () => {
        if(email === '' || password === '') {
            alert('Todos los campos son obligatorios')
        }else{
            dispatch(authType === 'Iniciar Sesión' ? login(email, password) : signup(email, password))
        }
    }

    const handelSwitchAction = (firstOption) => {
        setAuthType(firstOption ? 'Iniciar Sesión' : 'Registrarse')
    }

    return (
        <View style={styles.screen}>
            <SwitchButton option1={"Iniciar Sesión"} option2={"Registrarse"} onPress={handelSwitchAction} firstOption={tipoAcceso === 'Iniciar Sesión' ? true : false }/>
            <View style={styles.inputContainer}>
                <AdvanceInput
                    type='email'
                    placeholder={'Email'}
                    errorText={'Email invalido'}
                    onInputChange={(data) => setEmail(data.isValid ? data.value : '')}
                />
                <AdvanceInput
                    type='password'
                    placeholder={'Contraseña'}
                    errorText={'Contraseña invalida'}
                    onInputChange={(data) => setPassword(data.isValid ? data.value : '')}
                    minLength={8}
                />
            </View>
            <Button
                title={authType}
                onPress={() => handleAuth()}
            />
            {authType === 'Iniciar Sesión' &&
                <Pressable onPress={() => alert('Recuperar contraseña')}>
                    <Text>¿Olvidaste tu contraseña?</Text>
                </Pressable>
            }
        </View>
    )
}

export default Access

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        marginVertical: 10
    },
})