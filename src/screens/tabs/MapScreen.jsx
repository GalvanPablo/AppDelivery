import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import { useRoute } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { View } from 'react-native';

const MapScreen = ({ navigation }) => {
    const route = useRoute()
    const { initialCoords } = route.params

    const [selectedLocation, setSelectedLocation] = useState(initialCoords)
    
    const initialRegion = {
        latitude: initialCoords.lat,
        longitude: initialCoords.lng,
        latitudeDelta: 0.085,
        longitudeDelta: 0.035,
    }

    const handleSelectLocation = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }
    
    const handleSave = () => {
        if(selectedLocation){
            console.log("Guardando Ubicación")
            onSave(selectedLocation)
            navigation.navigate.goBack()
        }
    }

    const getLocation = async () => {
        console.log("Obteniendo Ubicación")

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000
        })

        setSelectedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }
    const mapViewRef = React.useRef(null);

    React.useEffect(() => {
        mapViewRef.current.animateToRegion({
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }, 500) 
    }, [selectedLocation])

    return (
        <View style={{flex: 1}}>
            <MapView
                ref={mapViewRef}
                initialRegion={initialRegion}
                style={styles.container}
                provider='google'
                onPress={handleSelectLocation}
            >
                { selectedLocation &&
                    <Marker
                        title={'Ubicación Seleccionada'}
                        coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
                    />
                }
                
            </MapView>
            <View style={styles.actions}>
                <Pressable style={styles.ubicacionActual} onPress={()=>getLocation()}>
                    <FontAwesome5 name="crosshairs" size={24} color="dodgerblue" />
                </Pressable>
                <Pressable style={styles.save} onPress={()=>handleSave()}>
                    <FontAwesome5 name="check" size={28} color="dodgerblue" />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    actions: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
        gap: 10
    },

    ubicacionActual: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 2
    },

    save:{
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

export default MapScreen
