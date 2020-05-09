import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
const window = Dimensions.get('window');


const DetailScreen = ({ route, navigation }) => {
    const { description, amount, price, imageProduct, note } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack} onPress={() => { navigation.goBack() }}>
                    <Icon name="arrow-back" size={30} color='white' />
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <View style={styles.listItem}>
                    <View style={styles.imageItem}>
                        <Image
                            source={{ uri: `http://192.168.198.2:3000/${imageProduct}` }}
                            style={{ width: window.width, height: 410 }}
                        />
                    </View>
                    <View style={styles.textItem}>
                        <Text style={{ fontSize: 20, color: 'black', marginBottom: 5, textAlign: 'center' }}>{description}</Text>
                        <Text style={{ fontSize: 18, color: 'black', marginBottom: 5 }}>Số lượng: {amount}</Text>
                        <Text style={{ fontSize: 14, marginBottom: 5, color: '#999999' }}>{note}</Text>
                        <Text style={{ fontSize: 24, color: 'red', marginBottom: 5 }}>₫{price}</Text>
                    </View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={{textAlign: 'center', color: 'white', fontSize: 18, justifyContent: 'center'}}>THÊM VÀO GIỎ HÀNG</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    header: {
        flex: 0.7,
        backgroundColor: 'rgb(232,133,130)',
        justifyContent: 'center',
        elevation: 10,
    },
    section: {
        flex: 9.2,
        flexDirection: 'column',
    },
    listItem: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    imageItem: {
        flex: 6,
        alignItems: 'center',
    },
    textItem: {
        flex: 3,
        paddingLeft: 10,
        flexDirection: 'column',
        alignItems: 'center'
    },
    btn: {
        flex: 0.8,
        justifyContent: 'center',
        flexDirection: 'column',
        width: 415, 
        height: 40, 
        backgroundColor: 'rgb(232,133,130)', 
    },
})
