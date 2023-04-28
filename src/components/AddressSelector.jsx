import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import * as Location from 'expo-location'

import COLORS from '../constants/colors'

import { useNavigation } from '@react-navigation/native'
import MapScreen from '../screens/tabs/MapScreen'

const AddressSelector = ({onLocation}) => {
    const navigation = useNavigation()
    const [address, setAddress] = React.useState(null)

    const verifyPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('No se puede acceder a la ubicación')
            return false
        }
        return true
    }

    const getLocation = async () => {
        const isLocationOk = await verifyPermissions()
        if (!isLocationOk) return

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000
        })

        navigation.navigate('MapScreen', {initialCoords: {lat: location.coords.latitude, lng: location.coords.longitude}})
    }

    return (
        <Pressable style={styles.container} onPress={async () => {getLocation()}}>
            {!address
                ? <Text>Seleccionar Ubicación</Text>
                : <Text>Direccion Obtenida</Text>
            }
        </Pressable>
    )
}

export default AddressSelector

const styles = StyleSheet.create({
    container:{
        marginVertical: 5,
        gap: 5,

        backgroundColor: COLORS.ligth_gray,

        padding: 10,
        borderRadius: 10,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 1,
    }
})