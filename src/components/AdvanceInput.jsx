import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'

import { FontAwesome } from '@expo/vector-icons';

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state;
    }
}

const inputType = ["text", "number", "email", "password", "phone"];

const AdvanceInput = ({
    // VALORES
    initialValue = '',          // Valor inicial del input
    initiallyValid = false,     // Si el valor inicial es válido
    // FUNCIONES
    onInputChange,              // Función que se ejecuta cuando el input cambia
    // INFORMACION
    label = null,               // Label del input
    placeholder = null,         // Placeholder del input
    errorText = null,           // Texto de error
    // VALIDACION
    minLength = 0,              // Longitud mínima del input
    maxLength = 100,            // Longitud máxima del input
    required = false,           // Si el input es requerido
    type = inputType[0],        // Tipo de input (text, number, email, password, phone) por defecto es text
    // ESTILOS
    containerStyle = {},        // Estilos del contenedor
    labelStyle = {},            // Estilos del label
    inputStyle = {},            // Estilos del input
    errorStyle = {},            // Estilos del error
    errorPosition = 'bottom',   // Posición del error (top, bottom)
}) => {


    // Validar el tipo de input
    if(!inputType.includes(type)) {
        const aux = [...inputType];
        aux[0] = aux[0] + " (default)";
        throw new Error(`
            The input type is invalid
            type received: ${type}
            valid types: ${aux.join(", ")}
        `);
    }

    if(errorPosition != 'top' && errorPosition != 'bottom') {
        throw new Error(`
            The error position is invalid
            errorPosition received: ${errorPosition}
            valid errorPositions: top, bottom (default)
        `);
    }

    // Validar la posición del error
    if(errorPosition != 'top' && errorPosition != 'bottom') {
        throw new Error(`
            The error position is invalid
            errorPosition received: ${errorPosition}
            valid errorPositions: top, bottom (default)
        `);
    }
    if(errorPosition == 'top' && label != null) {
        throw new Error(`
            The input can't have the error on top with a label
            - or remove the label
            - or change the errorPosition to bottom (default)
        `);
    }

    const inputMode = (
        type === "number" ? "numeric" :
        type === "phone" ? "tel" :
        type === "email" ? "email" :
        "none"
    )

    const [inputText, setInputText] = React.useState(initialValue);

    const [inputState, inputDispatch] = React.useReducer(inputReducer, {
        value: initialValue,
        isValid: initiallyValid,
        touched: false
    });

    const lostFocusHandler = () => {
        validar(inputText);
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

    const [errorTextDefault, setErrorTextDefault] = React.useState('');
    const validar = (text) => {
        let isValid = true;
        if (required && text.trim().length === 0) {
            setErrorTextDefault("Este campo es requerido");
            isValid = false;
        }
        if (minLength != null && text.length < minLength) {
            setErrorTextDefault(`Minimo ${minLength} caracteres`);
            isValid = false;
        }
        if (maxLength != null && text.length > maxLength) {
            setErrorTextDefault(`Máximo ${maxLength} caracteres`);
            isValid = false;
        }
        if (type === "email" && !emailValidator(text)) {
            setErrorTextDefault("El formato no es válido");

            isValid = false;
        }
        if(type === "phone" && !phoneValidator(text)) {
            setErrorTextDefault("El formato no es válido");
            isValid = false;
        }
        if(type === "number" && isNaN(text)) {
            setErrorTextDefault("El valor debe ser un número");
            isValid = false;
        }

        inputDispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    }

    const textChangeHandler = (text) => {
        setInputText(text);
    }

    React.useEffect(() => {
        validar(inputText);
    }, [inputText])

    React.useEffect(() => {
        onInputChange({
            value: inputState.value,
            isValid: inputState.isValid
        });
    }, [inputState])


    const ErrorRender = () => (
        <View style={styles.errorContainer}>
            <Text style={[styles.errorText, errorStyle]}>
                { (inputState.touched && !inputState.isValid) ?
                    (errorText !== null ? errorText : errorTextDefault)
                    : null
                }
            </Text>
        </View>
    )
    
    const [visible, setVisible] = React.useState(true);

    return (
        <View style={[styles.container, containerStyle]}>
            {label != null ?
                <Text style={[styles.label, labelStyle]}>{label}</Text>
                : (errorPosition == 'top' && <ErrorRender />)
            }

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, inputStyle, (!inputState.isValid && inputState.touched) && {borderColor: "red"}]}
                    value={inputState.value}
                    onChangeText={textChangeHandler}
                    onBlur={lostFocusHandler}
                    inputMode={inputMode}
                    autoCapitalize={type === "email" || type === "password" ? "none" : "sentences"}
                    {...(placeholder != null && {placeholder: placeholder})}
                    secureTextEntry={type === "password" ? visible : false}
                />
                {type === "password" && 
                    <Pressable onPress={() => setVisible(!visible)} style={styles.showPassword}>
                        <FontAwesome name={visible ? "eye" : "eye-slash"} size={24} color="#aaa" />
                    </Pressable>
                }
            </View>

            {errorPosition == 'bottom' && <ErrorRender />}
            
        </View>
    )
}

export default AdvanceInput

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 5,
    },
    label: {
        marginVertical: 5,
    },
    inputContainer: {
        position: "relative",
    },
    showPassword: {
        position: "absolute",
        right: 5,
        top: 5,
        padding: 4,
    },
    input: {
        minWidth: 150,
        padding: 5,
        textAlign: "left",
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    errorContainer: {
        marginVertical: 2,
    },
    errorText: {
        color: "red",
        fontSize: 13,
    }
})