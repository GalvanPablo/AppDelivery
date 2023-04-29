import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

import { MAP_KEY}  from '../constants/keys'

const MapPreview = ({ location, mapStyle, children }) => {

    const mapPreviewUrl = location ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=18&size=600x300&maptype=roadmap
    &markers=color:blue%7Clabel:Entrega%7C${location.lat},${location.lng}
    &key=${MAP_KEY}&map_id=6ce4764664e4bcf5` : ''

    return (
        <View style={[styles.mapView, mapStyle]}>
            {location ? (
                <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
            ) : (children)}
        </View>
    )
}

export default MapPreview

const styles = StyleSheet.create({
    mapView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    }
})