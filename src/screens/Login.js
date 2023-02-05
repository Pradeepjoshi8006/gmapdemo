import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {setLoginStatus} from '../store/action';
import {ColorsConstant, Specs} from '../utils/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import {TEXTCONST} from '../utils/Constant';

function Login({navigation, dispatch}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [emaildError, setEmailError] = useState('');

  const checkEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (email === '' && password === '') {
      return TEXTCONST.Please_Enter_Email;
    }
    if (re.test(text) || regex.test(text)) {
      return null;
    }
    if (!re.test(text) || !regex.test(text)) {
      return TEXTCONST.Wrong_email_format;
    }
    return null;
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return TEXTCONST.Password_must_not_contain_Whitespaces;
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return TEXTCONST.Password_must_have_at_least_one_Uppercase_Character;
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return TEXTCONST.Password_loweCase;
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return TEXTCONST.One_Digit;
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return TEXTCONST.Eight_to_Sixteen_char;
    }
    return null;
  };

  const setLogin = val => {
    dispatch(setLoginStatus({isLoggedIn: val}));
  };

  const handleLogin = async () => {
    const checkPassowrd = checkPasswordValidity(password);
    const checkEmailVal = checkEmail(email);
    if (!checkEmailVal && !checkPassowrd) {
      if (email === 'pradeep@gmail.com' && password === 'Pradeep@123') {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setLogin(true);
        navigation.navigate('Home');
      } else {
        Alert.alert(TEXTCONST.Please_enter_valid_Email_or_Password);
      }
    } else {
      setEmailError(checkEmailVal);
      setPasswordError(checkPassowrd);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder={TEXTCONST.Email}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      {emaildError && <Text style={styles.textFailed}>{emaildError}</Text>}
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder={TEXTCONST.Password}
          value={password}
          secureTextEntry={seePassword}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {passwordError && <Text style={styles.textFailed}>{passwordError}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>{TEXTCONST.Login}</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    resturantModel: state.resturant,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  wrapperInput: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: ColorsConstant.maroon,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: '100%',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorsConstant.maroon,
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: 'white',
    ...Specs.fontBold,
  },
  textFailed: {
    alignSelf: 'flex-start',
    color: ColorsConstant.maroon,
  },
});

export default connect(mapStateToProps)(Login);
