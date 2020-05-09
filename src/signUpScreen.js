import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
const window = Dimensions.get('window');

const signUpScreen = ({navigation}) => {
    const [images, setImages] = useState(null);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const chooseImage = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          setImages(image);
        });
    };

    const createFormData = () => {
        const data = new FormData();
        data.append('fullnameCus', fullName);
        data.append('phoneCus', phone);
        data.append('addressCus', address);
        data.append('emailCus', email);
        data.append('passwordCus', password);
        data.append('images', {
          name: images.modificationDate,
          type: images.mime,
          uri: Platform.OS === "android" ? images.path : images.path.replace("file://", ""),
        });
      
        return data;
    };

    const _signUp = async() => {
        const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.length > 0 && password.length > 0 && rePassword.length > 0 && fullName.length > 0 && phone.length > 0 && address.length > 0){
            if(regEmail.test(email) === false){
                alert('Vui lòng nhập lại email');
            }else if((phone.length <10 || phone.length > 10) || !phone.startsWith(0)){
                alert('Số điện thoại là dãy số gồm 10 chữ số và bắt đầu bằng số 0');
            }else if(password.length < 6){
                alert('Mật khẩu phải dài hơn 6 kí tự')
            }else{
                if(password === rePassword){
                    try {
                        let response = await fetch('http://192.168.198.2:3000/api/registerCustomer',{
                          method: 'POST',
                          body: createFormData(),
                        })
                        let json = await response.json();
                        if(json === false){
                          alert('Email đã tồn tại');
                        }else{
                          alert('Đăng kí thành công');
                        }
                      } catch (error) {
                        console.log(error);
                        alert('Errorrrrr');
                      }
                }else{
                    alert('Mật khẩu phải trùng nhau');
                }
            }
        }else{
            alert('Vui lòng nhập đầy đủ thông tin')
        }
    }

    return (
        <KeyboardAvoidingView behavior = 'padding' style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack} onPress={() => { navigation.goBack() }}>
                    <Icon name="arrow-back" size={30} color='white' />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Image
                    source={require('../image/meostore.png')}
                    style={{width: 200, height: 80}}
                />
                <Text style={styles.title}>ĐĂNG KÍ TÀI KHOẢN</Text>
                <TouchableOpacity onPress ={() => chooseImage()}>
                    <View style={styles.ImageContainer}>
                        <View style={styles.ImageContainer}>
                            {images === null ? (
                                <Icon name="photo-library" size={30} color="rgb(232,133,130)" />
                            ) : (
                                    <Image
                                        style={styles.ImageContainer}
                                        source = {{uri: images.path}}
                                    />
                                )}
                        </View>
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="white"
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Mật khẩu"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={rePassword}
                    onChangeText={rePassword => setRePassword(rePassword)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Họ tên của bạn"
                    placeholderTextColor="white"
                    autoCorrect={false}
                    value={fullName}
                    onChangeText={fullName => setFullName(fullName)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Số điện thoại"
                    placeholderTextColor="white"
                    keyboardType="phone-pad"
                    autoCorrect={false}
                    value={phone}
                    onChangeText={phone => setPhone(phone)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Địa chỉ"
                    placeholderTextColor="white"
                    autoCorrect={false}
                    value={address}
                    onChangeText={address => setAddress(address)}
                />
                <TouchableOpacity style={styles.loginButton} onPress = {() => _signUp()}>
                    <Text style={styles.loginButtonTitle}>ĐĂNG KÍ</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default signUpScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(232,133,130)',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    header: {
        backgroundColor: 'rgb(232,133,130)',
        elevation: 8,
        height: window.width / 8,
        justifyContent: 'center'
    },
    btnBack: {
        marginLeft: 15,
    },
    main: {
        flex: 9,
        flexDirection: 'column',
        alignItems: 'center',
        height: window.width / 2,
    },
    title: {
        color: 'white',
        fontSize: 24,
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: 300,
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    ImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10
    },
    loginButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221,97,97)',
        marginTop: 10
    },
    loginButtonTitle: {
        fontSize: 18,
        color: 'white',
    },
    btnEye: {
        position: 'absolute',
        top: 8,
        right: 10,
    }
});
