import React, {useState, useEffect, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {calHeight, calWidth} from '../utils/calDimens';
import {colors, fonts} from '../utils/constants';
import {loginApi} from '../services/services';
import {useDispatch, useSelector} from 'react-redux';
import {
  closeLoading,
  setUserDetails,
  startLoading,
} from '../redux/actions/actions';
import Header from '../components/Header';
import ModalComponent from '../components/Modal';
import Button from '../components/Button';
import InputComponent from '../components/formComponents/Input';
import InputPassComponent from '../components/formComponents/InputPass';
import {RootState} from '../redux/reducers/indexReducer';

interface Props {
  navigation: any;
}

// let validate_field: () => boolean;

const Login: FC<Props> = props => {
  const [passVisible, setPassVisibile] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.loadingReducer);

  const validate_field = () => {
    if (!email || !password) {
      Alert.alert('OOPS!', 'Fields should not be empty');
      return false;
    } else if (password.length < 6) {
      Alert.alert(
        'Password too short!',
        'Password should be at least 6 characters long',
      );
      return false;
    } else {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === true) {
        return true;
      } else {
        Alert.alert('OOPS!', 'Email is not valid');
        return false;
      }
    }
  };

  const loginBtnPressed = async () => {
    try {
      if (validate_field()) {
        dispatch(startLoading());
        const res = await loginApi({
          email: email,
          password: password,
        });
        dispatch(setUserDetails(res.data));
        if (res.code === 200) {
          try {
            await AsyncStorage.setItem('token', res.data.token);
          } catch (e) {
            console.log('Error: ', e);
          }
          props.navigation.push('HomeNav');
        } else {
          Alert.alert('OOPS!', res.message);
          dispatch(closeLoading());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopInitialLoading = () => {
    if (visible) {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    stopInitialLoading();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={styles.mainContainer}
      keyboardShouldPersistTaps="handled">
      <Header navigation={props.navigation} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.upperSection}>
            <Text style={styles.mainHead}>Welcome Back!</Text>
            <Text style={styles.headLabel}>
              Login to your account by entering your email and password.
            </Text>
          </View>
          <View style={styles.bottomSection}>
            <InputComponent
              textLabel="E-Mail"
              imgSource={require('../assets/img/mail.png')}
              onChangeText={(text: string) => setEmail(text)}
              placeholder="Enter your e-mail here"
            />
            <InputPassComponent
              textLabel="Password"
              imgSource={require('../assets/img/password.png')}
              onChangeText={(text: string) => setPassword(text)}
              placeholder="Enter your password here"
              secureTextEntry={passVisible}
              onPress={() => setPassVisibile(!passVisible)}
              passVisible={passVisible}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Alert.alert('No!', 'Improve your memory')}
              style={styles.forgotPass}>
              <Text style={styles.forgotPassText}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button
              activeOpacity={0.9}
              btnPressed={loginBtnPressed}
              title="Login"
            />
            <View style={styles.endTextStyle}>
              <Text style={styles.endTextFontStyle}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => props.navigation.push('Register')}>
                <Text style={styles.signUpBtn}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {visible && <ModalComponent />}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  upperSection: {
    alignItems: 'center',
    paddingTop: calHeight(4),
    paddingHorizontal: calWidth(7),
    alignSelf: 'center',
    height: calHeight(25),
  },
  mainHead: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.mainFontColor,
    marginBottom: 10,
  },
  headLabel: {
    color: colors.labelFontColor,
    fontSize: 16,
    fontFamily: fonts.regular,
    lineHeight: 30,
  },
  bottomSection: {
    backgroundColor: colors.white,
    alignItems: 'center',
    postion: 'absolute',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: calHeight(6),
    paddingHorizontal: calWidth(7),
    bottom: 0,
    height: calHeight(65),
  },
  forgotPass: {
    alignSelf: 'flex-end',
    marginTop: calHeight(2),
  },
  forgotPassText: {
    color: colors.mainFontColor,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  endTextStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: calHeight(3),
  },
  endTextFontStyle: {
    color: colors.mainFontColor,
    fontFamily: fonts.regular,
    fontSize: 16,
    paddingRight: '2%',
  },
  signUpBtn: {
    color: colors.primaryColor,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
});

export default Login;
