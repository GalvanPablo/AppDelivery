import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

import { AdvanceInput, ImageSelector, Button } from '../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../../store/actions/user.action';

const EditUserData = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.auth.email)
    const userId = useSelector(state => state.auth.userId)

    const [nombre, setNombre] = React.useState()
    const [telefono, setTelefono] = React.useState()
    const [image, setImage] = React.useState()

    const handleSave = () => {
        if(!nombre.isValid && !telefono.isValid){
            alert('Llene todos los campos')
            return
        }
        
        dispatch(updateUserData(userId, nombre.value, telefono.value, image))
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ImageSelector onImage={setImage}/>
            <Text style={styles.email}>{email}</Text>
            <View style={styles.inputContainer}>
                <AdvanceInput
                    type='text'
                    placeholder={'Nombre'}
                    onInputChange={(data) => setNombre(data)}
                    required
                    errorPosition='top'
                    inputStyle={{
                        borderWidth: 0,
                        borderBottomWidth: 1,
                    }}
                />
                <AdvanceInput
                    type='phone'
                    placeholder={'Telefono'}
                    onInputChange={(data) => setTelefono(data)}
                    errorPosition='top'
                    inputStyle={{
                        borderWidth: 0,
                        borderBottomWidth: 1,
                    }}
                />
                {/* <View style={styles.directions}>
                    <View style={styles.addDirection}>
                        <Text>Direcciones</Text>
                        <Pressable>
                            <FontAwesome5 name="plus" size={24} color="black" />
                        </Pressable>
                    </View>
                    <FlatList
                        data={direcciones}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View> */}
                <Button title='Guardar' onPress={()=>handleSave()}/>
            </View>
        </SafeAreaView>
    )
}

export default EditUserData

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 100,
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
    },
    email: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addDirection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    directions: {
        width: '100%',
    },
})