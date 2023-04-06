import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import MainNav from './src/navigators/MainNav';

import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
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
