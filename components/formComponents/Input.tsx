import React, {FC} from 'react';
import {View, Text, TextInput, Image, StyleSheet} from 'react-native';
import {calWidth} from '../../utils/calDimens';
import {colors, fonts} from '../../utils/constants';

interface Props {
  textLabel: string;
  imgSource: any;
  placeholder: string;
  onChangeText: Function;
}

const InputComponent: FC<Props> = props => {
  const {textLabel, imgSource, placeholder} = props;
  return (
    <View>
      <Text style={styles.inputLabel}>{textLabel}</Text>
      <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={imgSource} />
        <View>
          <TextInput
            onChangeText={text => props.onChangeText(text)}
            style={styles.inputInnerContainer}
            placeholder={placeholder}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.borderColor,
    margin: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputInnerContainer: {
    width: calWidth(64),
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.placeholderColor,
  },
  inputIcon: {
    marginHorizontal: calWidth(5),
    alignSelf: 'center',
  },
  inputLabel: {
    color: colors.primaryColor,
    fontFamily: fonts.regular,
    fontSize: 16,
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
});

export default InputComponent;
