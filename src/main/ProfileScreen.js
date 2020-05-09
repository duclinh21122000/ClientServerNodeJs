import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native'

const ProfileScreen = ({navigation, route }) => {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(true);
    const emailCus = route.params.emailx.email;


    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const getProfile = async () => {
        try {
            let response = await fetch(`http://192.168.198.2:3000/api/getCustomer?emailCus=${emailCus}`);
            let json = await response.json();
            setProfiles(json);
            setIsLoading(false);
            setIsRefreshing(false);
        } catch (error) {
            console.log(error);
        }
    }

    const _logOut = () => {
        Alert.alert(
          'Đăng xuất',
          'Bạn có muốn đăng xuất không?',
          [
            {
              text: 'Không',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Có', onPress: () => navigation.navigate('LoginScreen')},
          ],
          {cancelable: false},
        );
      }

      const onRefresh = () =>{
        setProfiles(profiles),
        getProfile()
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
            <FlatList
                data={profiles}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.header}>
                            <Image
                                source = {require('../../image/meostore.png')}
                                style={{width: 200, height: 80,}}
                            />
                        </View>
                        <Image
                            style={styles.avatar}
                            source={{ uri: `http://192.168.198.2:3000/${item.imageCus}`}}
                        />
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                                <Text style={styles.name}>{item.fullnameCus}</Text>
                                <Text style={styles.info}>Mobile developer</Text>
                                <Text style={styles.info}>Email: {emailCus}</Text>
                                <Text style={styles.info}>Địa chỉ: {item.addressCus}</Text>
                                <Text style={styles.info}>Số điện thoại: {item.phoneCus}</Text>
                                <TouchableOpacity style={styles.buttonLogout} onPress={_logOut} >
                                    <Text style={styles.textLogout}>ĐĂNG XUẤT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                refreshControl={
                        <RefreshControl
                            refreshing = {isRefreshing}
                            onRefresh = {onRefresh.bind(this)}
                            
                        />
                    }
                keyExtractor={(item, index) => index.toString()}
            />


        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        height: 200,
        backgroundColor: 'rgb(232,133,130)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    name: {
        fontSize: 24,
        color: "black",
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
        color: "black",
        marginTop: 10
    },
    buttonLogout: {
        marginTop: 50,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 15,
        backgroundColor: 'rgb(232,133,130)',
    },
    textLogout: {
        color: 'white',
        fontSize: 18,
    }
})
