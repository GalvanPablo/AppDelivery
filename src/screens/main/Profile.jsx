import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import COLORS from '../../constants/colors'

import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector(state => state.user)
    user.email = useSelector(state => state.auth.email)

    // React.useEffect(() => {
    //     console.log(user)
    // }, [])

    return (
        <SafeAreaView>
            <View>
                <Image style={styles.image} source={{uri: user.foto || require('../../../assets/usuario.png')}}/>
                <Text style={styles.name}>{user.nombre}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.phone}>{user.telefono}</Text>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    image: {
        width: 180,
        height: 180,
        borderRadius: 90,
        alignSelf: 'center',
        borderColor: COLORS.ligth_gray,
        borderWidth: 4,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10
    },
    email: {
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 10
    },
    phone: {
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 10
    }
})