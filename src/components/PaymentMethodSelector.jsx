import React from 'react'
import { StyleSheet, Text, View, Pressable, Modal, ScrollView } from 'react-native'

import COLORS from '../constants/colors'
import AdvanceInput from './AdvanceInput'
import Button from './Button'

import { FontAwesome } from '@expo/vector-icons';

const paymentMethods = {
    TARJETA: "tarjeta",
    EFECTIVO: "efectivo"
}

const PaymentMethodSelector = ({onConfirm}) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false)

    const [method, setMethod] = React.useState(null)

    const [cardNumber, setCardNumber] = React.useState(null)
    const [cardName, setCardName] = React.useState(null)
    const [cardExpiration, setCardExpiration] = React.useState(null)
    const [cardSecurityCode, setCardSecurityCode] = React.useState(null)

    const confirm = () => {
        if(method === paymentMethods.EFECTIVO){
            onConfirm({
                method: paymentMethods.EFECTIVO
            })
        } else if(method === paymentMethods.TARJETA){
            if(!cardNumber.isValid || !cardName.isValid || !cardExpiration.isValid || !cardSecurityCode.isValid){
                alert("Complete los campos")
                return
            }
            onConfirm({
                method: paymentMethods.TARJETA,
                cardNumber: cardNumber.value,
                cardName: cardName.value,
                cardExpiration: cardExpiration.value,
                cardSecurityCode: cardSecurityCode.value,
            })
        }
        closeModal()
    }
            

    return (
        <>
            <Pressable style={[styles.container,{ backgroundColor: method === null ? COLORS.ligth_gray : COLORS.white }]} onPress={openModal}>
                { method === null ? <Text style={[styles.text, {fontWeight: method === null ? "normal" : "bold"}]}>Seleccionar metodo de pago</Text>
                : (
                    <View style={styles.metodoSelected}>
                        { method === paymentMethods.TARJETA && <>
                            <FontAwesome name="credit-card" size={32} color="black" />
                            <Text style={styles.text}>{cardNumber ? `**** ${cardNumber.value.slice(-4)}` : "Tarjeta"}</Text>
                        </>}
                        { method === paymentMethods.EFECTIVO && <>
                            <FontAwesome name="dollar" size={24} color="black" />
                            <Text style={styles.text}>Efectivo</Text>
                        </>}
                    </View>
                )}
            </Pressable>

            <Modal
                animationType="slide"
                visible={modalVisible}
                // style={{
                //     backgroundColor: COLORS.ligth_gray,
                // }}
            >   
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Metodos de pago</Text>
                    <ScrollView style={styles.modalBody}>
                        <Pressable onPress={()=> setMethod(paymentMethods.EFECTIVO)} style={styles.select}>
                            <View style={styles.methodIcon}>
                                <FontAwesome name="dollar" size={32} color={method === paymentMethods.EFECTIVO ? COLORS.primary : COLORS.black} />
                            </View>
                            <Text>Efectivo</Text>
                        </Pressable>

                        <View style={styles.dropdown}>
                            <Pressable onPress={()=>setMethod(paymentMethods.TARJETA)} style={styles.select}>
                                <View style={{width: '100%' , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <View style={styles.methodIcon}>
                                            <FontAwesome name="credit-card" size={32} color={method === paymentMethods.TARJETA ? COLORS.primary : COLORS.black} />
                                        </View>
                                        <Text>Tarjeta</Text>
                                    </View>
                                    <View style={styles.methodIcon}>
                                        <FontAwesome name={method === paymentMethods.TARJETA ? "chevron-down" : "chevron-up"} size={24} color={COLORS.dark_gray} />
                                    </View>
                                </View>
                            </Pressable>
                            {method === paymentMethods.TARJETA &&
                                <View style={styles.inputs}>
                                    <AdvanceInput
                                        label="Numero de tarjeta"
                                        type='number'
                                        onInputChange={(data)=>setCardNumber(data)}
                                        minLength={16}
                                        maxLength={16}
                                        required
                                        containerStyle={{
                                            marginTop: 0,
                                            marginBottom: 0,
                                            padding: 0,
                                        }}
                                    />

                                    <AdvanceInput
                                        label="Nombre del titular"
                                        type='text'
                                        onInputChange={(data)=>setCardName(data)}
                                        minLength={3}
                                        maxLength={50}
                                        required
                                        containerStyle={{
                                            marginTop: 0,
                                            marginBottom: 0,
                                            padding: 0,
                                        }}
                                    />

                                    <AdvanceInput
                                        label="Fecha de vencimiento"
                                        type='text'
                                        onInputChange={(data)=>setCardExpiration(data)}
                                        minLength={5}
                                        maxLength={5}
                                        required
                                        containerStyle={{
                                            marginTop: 0,
                                            marginBottom: 0,
                                            padding: 0,
                                        }}
                                    />

                                    <AdvanceInput
                                        label="Codigo de seguridad"
                                        type='number'
                                        onInputChange={(data)=>setCardSecurityCode(data)}
                                        minLength={3}
                                        maxLength={3}
                                        required
                                        containerStyle={{
                                            marginTop: 0,
                                            marginBottom: 0,
                                            padding: 0,
                                        }}
                                    />
                                </View>
                            }
                        </View>
                    </ScrollView>
                    <Button title={"Confirmar"} onPress={()=>confirm()} styleBtn={styles.confirm}/>
                </View>
            </Modal>
        </>
    )
}

export default PaymentMethodSelector

const styles = StyleSheet.create({
    container:{
        padding: 15,
        borderRadius: 10,
        gap: 5,

        backgroundColor: COLORS.white,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    text:{
        fontSize: 16,
        fontWeight: "bold",
    },

    metodoSelected:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    modalBody:{
        width: "90%",
    },

    select:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",

        padding: 10,
        borderRadius: 10,
        gap: 5,

        backgroundColor: COLORS.white,

        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        
    },

    methodIcon:{
        width: 50,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    modal:{
        flex: 1,
        alignItems: "center",
        gap: 10,
        backgroundColor: COLORS.ligth_gray,
    },

    modalTitle:{
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },

    dropdown:{
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },

    inputs:{
        padding: 15,
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
        gap: 10,
    },

    confirm:{	
        position: "relative",
        bottom: 20,

        marginTop: 20,
    },
})