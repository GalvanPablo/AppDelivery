import React from 'react'
import { Pressable, StyleSheet, Text, View, Image, Alert } from 'react-native'

import { FontAwesome5 } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker'

import COLORS from '../constants/colors'

const imageConfig = {
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.5,
}

const ImageSelector = ({onImage}) => {
    const [pickedUri, setPickedUri] = React.useState()

    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()

        if(status !== 'granted'){
            alert('Necesitamos permisos para acceder a la camara')
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        try{
            const result = await ImagePicker.launchCameraAsync(imageConfig)
            setPickedUri(result.assets[0].uri)
            onImage(result.assets[0].uri)
        } catch (err){
            console.log(err)
        }
    }

    const pickImageHandler = async () => {
        try{
            const result = await ImagePicker.launchImageLibraryAsync(imageConfig)
            setPickedUri(result.assets[0].uri)
            onImage(result.assets[0].uri)
        } catch (err){
            console.log(err)
        }
    }

    const changeImageHandler = async () => {
        const hasPermission = await verifyPermissions()
        if(!hasPermission) return

        Alert.alert(
            'Editar Imagen',
            '¿Que desea hacer?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Seleccionar de la galeria',
                    onPress: () => pickImageHandler(),
                },
                {
                    text: 'Tomar Foto',
                    onPress: () => takeImageHandler(),
                },
            ],
            { cancelable: true }
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.imagePreview}>
                <Image style={styles.image} source={pickedUri ? {uri: pickedUri} : require('../../assets/usuario.png')} />
            </View>
            <Pressable style={styles.button} onPress={()=>{changeImageHandler()}}>
                <FontAwesome5 name="camera" size={24} color={COLORS.white} />
            </Pressable>
        </View>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 15,
        width: 180,
        height: 180,
    },
    imagePreview: {
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 10,
        borderColor: COLORS.ligth_gray,
        borderWidth: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        elevation: 5,

        position: 'absolute',
        bottom: 0,
        right: 0,
    },
})