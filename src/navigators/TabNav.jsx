import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()


// import { Home } from '../screens/tabs/main'
import HomeStack from './HomeStack'
import FavoritesStack from './FavoritesStack'
import History from '../screens/tabs/history/History'
import { Profile } from '../screens/tabs/profile'

import { FontAwesome } from '@expo/vector-icons';
import COLORS from '../constants/colors'



const TabNav = () => {

    return (
        <Tab.Navigator initialRouteName='Main'
            screenOptions={{
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.dark_gray,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}

        >
            <Tab.Screen name="Main" component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.item}>
                            <FontAwesome name="home" color={color} size={size} />
                            <Text style={[styles.text, {color: color}]}>Inicio</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="Favorites" component={FavoritesStack}
                options={{
                    tabBarLabel: 'Favorites',
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.item}>
                            <FontAwesome name="heart" color={color} size={size} />
                            <Text style={[styles.text, {color: color}]}>Favoritos</Text>
                        </View>
                    ),
                }}
            />
            {/* <Tab.Screen name="Cart" component={Cart}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.item}>
                            <FontAwesome name="shopping-cart" color={color} size={size} />
                            <Text style={[styles.text, {color: color}]}>Carrito</Text>
                        </View>
                    ),
                }}
            /> */}
            
            <Tab.Screen name="History" component={History}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.item}>
                            <FontAwesome name="history" color={color} size={size} />
                            <Text style={[styles.text, {color: color}]}>Historial</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <View style={styles.item}>
                            <FontAwesome name="user" color={color} size={size} />
                            <Text style={[styles.text, {color: color}]}>Perfil</Text>
                        </View>
                    ),
                }}
            />
            
        </Tab.Navigator>
    )
}

export default TabNav

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.white,
        borderTopColor: 'transparent',
        height: 60,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        fontFamily: 'NunitoSans_400Regular',
    },
})