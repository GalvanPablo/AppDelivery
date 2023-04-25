import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import COLORS from '../constants/colors';

const QuantitySelector = ({onChange}) => {
    const [quantity, setQuantity] = useState(1); // Inicialmente, la cantidad seleccionada es 1

    const handleIncrement = () => {
        setQuantity(quantity + 1); // Aumentar la cantidad seleccionada en 1
    };

    const handleDecrement = () => {
        if (quantity > 1) {
        setQuantity(quantity - 1); // Disminuir la cantidad seleccionada en 1, asegurándose de que nunca sea menor que 1
        }
    };

    React.useEffect(() => {
        onChange(quantity);
    }, [quantity]);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={handleDecrement} style={styles.button} disabled={quantity === 1}>
                <FontAwesome5 name="minus" size={18} color={COLORS.black} />
            </Pressable>

            <Text style={styles.text}>{quantity}</Text>

            <Pressable onPress={handleIncrement} style={styles.button}>
                <FontAwesome5 name="plus" size={18} color={COLORS.black} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundColor: COLORS.white,
        borderColor: COLORS.dark_gray,
        
        shadowColor: COLORS.dark_gray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    text: {
        marginHorizontal: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default QuantitySelector;
