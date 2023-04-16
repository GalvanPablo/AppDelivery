import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

// Navigation
import MainNav from './src/navigators/MainNav';

// Redux
import { Provider } from 'react-redux';
import store from './src/store';

// Font
import * as SplashScreen from 'expo-splash-screen'
import { NunitoSans_400Regular, NunitoSans_700Bold, useFonts } from '@expo-google-fonts/nunito-sans';
SplashScreen.preventAutoHideAsync();

export default function App() {

    const [fontsLoaded] = useFonts({
        NunitoSans_400Regular,
        NunitoSans_700Bold
    });
    
    React.useEffect(() => {
        if(fontsLoaded){
        SplashScreen.hideAsync();
        }
    }, [fontsLoaded])
    
    if(!fontsLoaded){
        return null
    }

    return (
        <Provider store={store}>
            <MainNav />
        </Provider>
    );
}

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
});
