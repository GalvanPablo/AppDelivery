import React from 'react'
import { StyleSheet, Text, View, Pressable, ImageBackground, Image } from 'react-native'

import { AdvanceInput, Button, SwitchButton } from '../../components'

import { useDispatch } from 'react-redux'
import { signup, login } from '../../store/actions/auth.actions'

import { useRoute } from '@react-navigation/native'
import colors from '../../constants/colors'

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
            <Image style={styles.bgImage} source={{uri: 'https://images.unsplash.com/photo-1624855600799-ac8e8bddd1da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'}}/>
            <View style={styles.screenContainer}>
                <SwitchButton option1={"Iniciar Sesión"} option2={"Registrarse"} onPress={handelSwitchAction} firstOption={tipoAcceso === 'Iniciar Sesión' ? true : false }/>
                <View style={styles.inputContainer}>
                    <AdvanceInput
                        type='email'
                        placeholder={'Email'}
                        errorText={'Email invalido'}
                        onInputChange={(data) => setEmail(data.isValid ? data.value : '')}
                        errorPosition='top'
                        inputStyle={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                        }}
                    />
                    <AdvanceInput
                        type='password'
                        placeholder={'Contraseña'}
                        errorText={'Contraseña invalida'}
                        onInputChange={(data) => setPassword(data.isValid ? data.value : '')}
                        minLength={8}
                        errorPosition='top'
                        inputStyle={{
                            borderWidth: 0,
                            borderBottomWidth: 1,
                        }}
                    />
                </View>
                <Button
                    title={authType}
                    onPress={() => handleAuth()}
                    styleBtn={{
                        marginTop: 20,
                    }}
                />
            </View>
        </View>
    )
}

export default Access

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    bgImage: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover',
    },
    screenContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.white + 'FA',
        alignItems: 'center',
        justifyContent: 'center',

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
    },
    inputContainer: {
        width: '80%',
        marginVertical: 10
    },
    text: {
        fontFamily: 'NunitoSans_400Regular',
        fontSize: 16,
        marginVertical: 10
    }
})