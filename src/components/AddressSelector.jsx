import React from 'react'
import { Pressable, StyleSheet, Modal, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import COLORS from '../constants/colors'

import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import { MAP_KEY } from '../constants/keys'
import MapPreview from './MapPreview'

// const shortAddres = (ad) => {
//     if(!ad) return ''
//     let index = ad.indexOf(',');
//     index = ad.indexOf(',', index + 1);
//     return ad.substring(0, index);
// }

const AddressSelector = ({onSave}) => {
    const [selectedLocation, setSelectedLocation] = React.useState(null)
    const [address, setAddress] = React.useState(null)

    // VERIFICAR PERMISOS DE UBICACIÓN
    const verifyPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('No se puede acceder a la ubicación')
            return false
        }
        return true
    }

    // OBTENER UBICACIÓN ACTUAL
    const getLocation = async () => {
        const location = await Location.getCurrentPositionAsync({
            timeout: 5000
        })
        setSelectedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    // SELECCIONAR UBICACIÓN EN EL MAPA
    const handleSelectLocation = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }


    // MANEJO DEL MODAL
    const [modalVisible, setModalVisible] = React.useState(false)
    const openModal = async () => {
        const isLocationOk = await verifyPermissions()
        if (!isLocationOk) return

        if(!selectedLocation) getLocation()
        setModalVisible(true)
    }

    const handleSave = () => {
        if(selectedLocation){
            setModalVisible(false)
        }
    }

    // MANEJO DE MAPA
    const initialRegion = {
        latitude: selectedLocation?.lat || -34.603722,
        longitude: selectedLocation?.lng || -58.381592,
        latitudeDelta: selectedLocation ? 0.01 : 0.085,
        longitudeDelta: selectedLocation ? 0.01 : 0.035,
    }

    // DESPLAZAR MAPA A LA UBICACIÓN SELECCIONADA
    const mapViewRef = React.useRef(null);
    const [mapOnLayout, setMapOnLayout] = React.useState(false)
    React.useEffect(() => {
        if(mapOnLayout){
            mapViewRef.current.animateToRegion({
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 500) 
        }
        getAddress()
    }, [selectedLocation])

    // OBTENER DIRECCIÓN
    
    const getAddress = async () => {
        if(!selectedLocation) return
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.lat},${selectedLocation.lng}&key=${MAP_KEY}`)
        if(!response.ok) throw new Error('No se pudo completar la solicitud')
        const data = await response.json()
        if(!data.results) throw new Error('Error al obtener la dirección')
        setAddress(data.results[0].formatted_address)
    }

    // DEVOLVER UBICACIÓN
    React.useEffect(() => {
        if(!selectedLocation) return
        onSave({
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
            address: address
        })
    }, [selectedLocation, address])

    return (
        <>
            { !selectedLocation
                ? <Pressable style={styles.container} onPress={()=>openModal()}>
                    <Text style={styles.text}>Seleccionar Ubicación</Text>
                </Pressable>
                : <View style={styles.container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text style={styles.street}> {address?.split(",")[0]}</Text>
                            <Text style={styles.city}>{address?.split(",")[1]}</Text>
                        </View>
                        <Pressable onPress={()=>openModal()}>
                            <FontAwesome5 name="edit" size={24} color={COLORS.dark_gray} />
                        </Pressable>
                    </View>
                    <View style={styles.mapContainer}>
                        <MapPreview location={selectedLocation} mapStyle={styles.minimap} />
                    </View>
                </View>
            }

            <Modal
                style={styles.modalContainer}
                visible={modalVisible}
                animationType="slide"
            >
                <MapView
                    ref={mapViewRef}
                    initialRegion={initialRegion}
                    style={styles.map}
                    provider='google'
                    onPress={handleSelectLocation}
                    onLayout={()=>setMapOnLayout(true)}
                >
                    { selectedLocation &&
                        <Marker
                            title={'Ubicación Seleccionada'}
                            coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
                        />
                    }
                    
                </MapView>
                <View style={styles.actions}>
                    <Pressable style={styles.btnLocation} onPress={()=>getLocation()}>
                        <FontAwesome5 name="crosshairs" size={24} color="dodgerblue" />
                    </Pressable>
                    <Pressable style={styles.btnSave} onPress={()=>handleSave()}>
                        <FontAwesome5 name="check" size={28} color="dodgerblue" />
                    </Pressable>
                </View>
            </Modal>
        </>
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
    },

    modalContainer: {
        flex: 1,
    },

    map: {
        flex: 1,
    },
    mapContainer: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        alignSelf: 'center',
    },
    minimap: {
        width: '100%',
        height: '100%',
    },

    text: {
        fontSize: 16,
        color: COLORS.dark_gray,
    },

    street: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold',
    },

    city: {
        fontSize: 16,
        color: COLORS.dark_gray,
    },

    actions: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
        gap: 10
    },

    btnLocation: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 2
    },

    btnSave: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 2
    }
})