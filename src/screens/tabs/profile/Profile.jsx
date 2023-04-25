import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import COLORS from '../../../constants/colors'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../store/actions/auth.actions'

import { Button } from '../../../components'

const Profile = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    user.email = useSelector(state => state.auth.email)

    // React.useEffect(() => {
    //     console.log(user)
    // }, [])

    return (
        <SafeAreaView style={styles.screen}>
            <View>
                <Image style={styles.image} source={{uri: user.foto || 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'}}/>
                <Text style={styles.name}>{user.nombre}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.phone}>{user.telefono}</Text>
            </View>
            <Button title="Cerrar Sesión" styleBtn={styles.button} onPress={() => {
                console.log('logout')
                dispatch(logout())
            }}/>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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
    },
    button: {
        width: 200,
        height: 40,
        backgroundColor: COLORS.primary,
        borderRadius: 40,
        alignSelf: 'center',
        marginTop: 20,
    }
})