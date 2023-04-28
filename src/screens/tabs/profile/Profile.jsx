import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import COLORS from '../../../constants/colors'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/auth.actions'

import { Button, Header } from '../../../components'
import { FontAwesome5 } from '@expo/vector-icons';

const Profile = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    user.email = useSelector(state => state.auth.email)

    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Datos personales"/>
            <View style={styles.screenContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: user.foto || 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}}/>
                </View>
                <View style={styles.detalle}>
                    <FontAwesome5 name="at" size={24} color="black" style={styles.detalleIcon}/>
                    <Text style={styles.name}>{user.nombre}</Text>
                </View>
                <View style={styles.detalle}>
                    <FontAwesome5 name="envelope" size={24} color="black" style={styles.detalleIcon}/>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
                <View style={styles.detalle}>
                    <FontAwesome5 name="mobile-alt" size={24} color="black" style={styles.detalleIcon}/>
                    <Text style={styles.phone}>{user.telefono}</Text>
                </View>
            </View>

            <Button title="Cerrar Sesión" styleBtn={styles.logout} onPress={() => {
                console.log('logout')
                dispatch(logout())
            }}/>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    screenContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    imageContainer: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        borderRadius: 250,
        overflow: 'hidden',
        marginVertical: 20,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    detalle: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: 5,
        padding: 10,
        borderRadius: 10,

        gap: 5,

        backgroundColor: COLORS.white,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 1,
    },

    detalleIcon:{
        width: 30,
        textAlign: 'center',
    },

    logout: {
        width: 200,
        height: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        alignSelf: 'center',
        marginBottom: 20,
    }
})