import React, {useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, Dimensions, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
const window = Dimensions.get('window');

const loginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createFormData = () => {
        const data = new FormData();
        data.append('emailCus', email);
        data.append('passwordCus', password);
        return data;
    };

    const _signIn = async() => {
        if(email.length > 0 && password.length > 0){
            try {
                let response = await fetch('http://192.168.198.2:3000/api/loginCustomer', {
                    method: 'POST',
                    body: createFormData(),
                });
                let json = await response.json();
                // console.log(json);
                if (json === 'tài khoản không tồn tại') {
                    alert('Tài khoản chưa được đăng kí!');
                } else if (json === 'email hoặc mật khẩu không đúng') {
                    alert('Email hoặc mật khẩu không đúng!');
                } else {
                    _Login(email);
                }
            } catch (error) {
                console.log(error);
                alert('Errorrrrr');
            }
        }else{
            alert('Vui lòng nhập');
        }
    }

    const _Login = email => {
        navigation.navigate('MainScreen', {
            screen: 'Trang chủ',
            params:  {email: email},
        });
        setEmail('');
        setPassword('');
    };

    const Divider = props => {
        return (
          <View {...props}>
            <View style={styles.line} />
            <Text style={styles.textOr}>HOẶC</Text>
            <View style={styles.line} />
          </View>
        );
      };

    return (
        <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"} style = {styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.down}>
                <Image
                    source={require('../image/meostore.png')}
                    style={{width: window.width - 100, height: 80}}
                />
                <Text style={styles.title}>ĐĂNG NHẬP</Text>
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
                <TouchableOpacity style={styles.loginButton} onPress={() => _signIn()}>
                    <Text style={styles.loginButtonTitle}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
                <Divider style={styles.divider} />
                <View style={styles.bottom}>
                    <Text style={styles.titleBottom}>Bạn chưa có tài khoản?</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('SignUpScreen')}}>
                        <Text style={styles.titleSignUp}>Đăng ký!</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default loginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(232,133,130)',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 24,
    },
    up:{
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleLogin:{
        color: 'white',
        marginTop: 10,
        fontSize: 24,
    },
    down:{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        
    },
    
    textInput: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: window.width - 100,
        color: 'white',
        fontSize: 18,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    loginButton: {
        marginTop: 20,
        width:window.width -100,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        borderRadius: 8,
        backgroundColor: 'rgb(221,97,97)',
    },
    loginButtonTitle: {
        fontSize: 18,
        color: 'white',
    },
    line: {
        height: 1,
        flex: 2,
        backgroundColor: 'white',
    },
    textOr: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    divider: {
        flexDirection: 'row',
        height: 40,
        width: 295,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    bottom:{
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleBottom: {
        color: 'white',
        fontSize: 18,
    },
    titleSignUp: {
        color: 'white',
        fontSize: 20,
        marginLeft: 5,
    },
})
