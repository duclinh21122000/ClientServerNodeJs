import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, BackHandler, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto';

const HomeScreen = ({navigation}) => {
        const [products, setProducts] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [arrayholder, setArrayholder] = useState([]);
        const [isRefreshing, setIsRefreshing] = useState(true);
        const [text, setText] = useState('');
        
        const backAction = () => {
            Alert.alert("Hold on!", "Bạn có muốn thoát khỏi ứng dụng không?", [
              {
                text: "Không",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Có", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
          };
        

        useEffect(() => {
            getProducts();
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () =>
              BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [getProducts])

        const getProducts = async() => {
            try {
                let response =  await fetch('http://192.168.198.2:3000/api/getAllProduct');
                let json = await response.json();
                setProducts(json);
                setIsLoading(false);
                setArrayholder(json);
                setIsRefreshing(false);
            } catch (error) {
                console.log(error);
            }
        };

        const SearchFilterFunction = text => {
            const newData = arrayholder.filter(function(item) {
              const itemData = item.nameProduct ? item.nameProduct.toUpperCase() : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            setProducts(newData), setText(text);
        };

        const onRefresh = () =>{
            setProducts(products),
            getProducts()
        }

        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="rgb(232,133,130)" />
                </View>
            )
        }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source = {require('../../image/meostore.png')}
                    style = {{width: 200, height: 80}}
                />
            </View>
            <View style={styles.containSearch}>
                <TextInput
                    style = {styles.inputSearch}
                    placeholder = "Tìm kiếm..."
                    placeholderTextColor = 'white'
                    onChangeText={text => SearchFilterFunction(text)}
                    value={text}
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity style={styles.btnSearch}>
                    <Icon name="search" size={20} color="white"/>
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <FlatList
                    data = {products}
                    renderItem = {({item}) => (
                        <View style = {styles.listItem}>
                            <View style = {styles.imageItem}>
                                <Image
                                    source = {{uri: `http://192.168.198.2:3000/${item.imageProduct}`}}
                                    style = {{width: 190, height: 190, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                                />
                            </View>
                            <View style = {styles.textItem}>
                                <Text style={{fontSize: 18, color: 'black', marginBottom: 3}}>{item.nameProduct}</Text>
                                <Text style={{fontSize: 12, marginBottom: 3, color: '#999999'}}>{item.note}</Text>
                            </View>
                            <View style = {styles.priceItem}>
                                <Text style={{fontSize: 16, flex: 1.4}}>{item.price}₫</Text>
                                <TouchableOpacity style= {{flex: 0.6, backgroundColor: 'rgb(232,133,130)', borderRadius: 8, elevation: 8}} onPress = {() => {navigation.navigate('DetailScreen', item)}}>
                                    <Text style={{fontSize: 18, fontWeight: "bold", textAlign: 'center', color: 'white'}}>Mua</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing = {isRefreshing}
                            onRefresh = {onRefresh.bind(this)}
                            
                        />
                    }
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    header: {
        flex: 1,
        backgroundColor: 'rgb(232,133,130)',
        alignItems: 'center',
        elevation: 10,
    },
    containSearch: {
        flex: 0.5,
        alignItems: 'center',
        marginTop: 10,
    },
    inputSearch: {
        height: 50,
        width: 350,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'rgb(232,133,130)',
        color: 'white',
        fontSize: 16,
    },
    btnSearch: {
        position: 'absolute',
        top: 15,
        right: 45,
    },
    main: {
        flex: 8.5,
        marginTop: 40,
    },
    listItem: {
        flex: 1,
        flexDirection: 'column',
        elevation: 15,
        borderRadius: 10,
        margin: 8,
        backgroundColor: 'white'
    },
    imageItem: {
        flex: 6,
        alignItems: 'center',
    },
    textItem: {
        flex: 2,
        paddingLeft: 10,
    },
    priceItem: {
        flex: 2,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        justifyContent: 'center',
    }

})
