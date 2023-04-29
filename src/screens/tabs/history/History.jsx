import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../constants/colors'
import { Header, ItemPucharse } from '../../../components'

import { useSelector, useDispatch } from 'react-redux'
import { getPurcharse } from '../../../store/actions/pucharse.action'


const History = () => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.userId);
    const pucharses = useSelector(state => state.pucharse.list)

    React.useEffect(() => {
        dispatch(getPurcharse(userId))
    }, [userId])

    return (
        <SafeAreaView style={styles.screen}>
            <Header title={"Historial"}/>
            <View style={styles.screenContainer}>
                <FlatList
                    data={pucharses}
                    renderItem={({ item }) => <ItemPucharse pucharse={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default History

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
})