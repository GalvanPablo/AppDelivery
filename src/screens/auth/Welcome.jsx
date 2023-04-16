import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'

import { Button } from '../../components'
import COLORS from '../../constants/colors'

const Welcome = ({ navigation }) => {
    return (
        <ImageBackground source={{uri: 'https://images.unsplash.com/photo-1624855600799-ac8e8bddd1da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'}} style={styles.screen}>
            {/* <Logo fill='#F0EDEE' fillOpacity={0.7}/> */}
            <View style={styles.container}>
                <Button title="Iniciar Sesión" onPress={()=>{navigation.navigate('Access', {tipo: 'Iniciar Sesión'})}}/>
                <View style={styles.account}>
                    <Text style={styles.accountText}>¿No tienes una cuenta? </Text>
                    <Pressable onPress={()=>{navigation.navigate('Access', { tipo: 'Registrarse'})}}>
                        <Text style={[styles.accountText, {color: COLORS.primary, textDecorationLine: 'underline'}]}>Regístrate</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Welcome

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    container: {
        gap: 10,
    },
    account: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'regular',
        fontFamily: 'NunitoSans_400Regular',
    }
})