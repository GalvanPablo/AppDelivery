import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

/*
    Este componente es un input que contiene un label y advertencia de error
    Se muestra el error cuando el input está en foco y el valor es inválido
*/

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
    // console.log("Ejecutando inputReducer");
    switch (action.type) {
        case INPUT_CHANGE:
            // console.log("Ejecutando INPUT_CHANGE");
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            // console.log("Ejecutando INPUT_BLUR");
            return {
                ...state,
                touched: true
            }
        default:
            return state;
    }
}

const inputType = ["text", "number", "email", "password", "phone"];

const Input = ({
    initialValue,           // Valor inicial del input
    initiallyValid,         // Si el valor inicial es válido
    label,                  // Label del input
    errorText,              // Texto de error
    onInputChange,          // Función que se ejecuta cuando el input cambia
    minLength,              // Longitud mínima del input
    maxLength,              // Longitud máxima del input
    required = false,               // Si el input es requerido
    type = inputType[0],    // Tipo de input (text, number, email, password, phone) por defecto es text
    ...props
}) => {


    // Validar el tipo de input
    if(!inputType.includes(type)) {
        throw new Error(`
            The input type is invalid
            type received: ${type}
            valid types: ${inputType.join(", ")}
        `);
    }

    const inputMode = (
        type === "number" ? "numeric" :
        type === "phone" ? "tel" :
        type === "email" ? "email" :
        "none"
    )

    

    const [inputState, inputDispatch] = React.useReducer(inputReducer, {
        value: initialValue || "",
        isValid: initiallyValid || false,
        touched: false
    });

    const lostFocusHandler = () => {
        inputDispatch({ type: INPUT_BLUR });
    }

    const emailValidator = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const phoneValidator = (phone) => {
        // https://es.stackoverflow.com/questions/136325/validar-tel%C3%A9fonos-de-argentina-con-una-expresi%C3%B3n-regular
        const re = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
        return re.test(String(phone).toLowerCase());
    }

    const textChangeHandler = (text) => {
        let isValid = true;
        if (required && text.trim().length === 0) {
            isValid = false;
        }

        if (minLength != null && text.length < minLength) {
            isValid = false;
        }
        if (maxLength != null && text.length > maxLength) {
            isValid = false;
        }
        if (type === "email" && !emailValidator(text)) {
            isValid = false;
        }
        if(type === "phone" && !phoneValidator(text)) {
            isValid = false;
        }
        if(type === "number" && isNaN(text)) {
            isValid = false;
        }

        // console.log("Es valido: ", isValid);

        inputDispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    }

    // React.useEffect(() => {
    //     console.log(`
    //         Ejecutando useEffect de Input
    //         --- Valor: ${inputState.value}
    //         --- Es valido: ${inputState.isValid}
    //         --- Touch: ${inputState.touched}
    //     `)
    // }, [inputState])

    React.useEffect(() => {
        onInputChange({
            value: inputState.value,
            isValid: inputState.isValid
        });
    }, [inputState, onInputChange])


    return (
        <View>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
                inputMode={inputMode}
                autoCapitalize={type === "email" || type === "password" ? "none" : "sentences"}
                placeholder={label}
                secureTextEntry={type === "password"}
            />

            { (inputState.touched && !inputState.isValid) && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorText}</Text>
                </View>
            )}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        minWidth: 100,
        textAlign: "left"
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        color: "red",
        fontSize: 13
    }
})