import React, {FC} from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import {calHeight, calWidth} from '../utils/calDimens';
import {colors, fonts} from '../utils/constants';

interface Props {
  title?: string;
  navigation: any;
}

const Header: FC<Props> = props => {
  const {title} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        height: calHeight(10),
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: calWidth(7),
      }}>
      {!title ? (
        <Pressable onPress={() => props.navigation.goBack()}>
          <Image source={require('../assets/img/arrowleft.png')} />
        </Pressable>
      ) : (
        <Text
          style={{
            fontFamily: fonts.bold,
            fontSize: 26,
            color: colors.mainFontColor,
          }}>
          {title}
        </Text>
      )}
      <Image
        style={{width: 40, height: 40}}
        source={require('../assets/img/logo.png')}
      />
    </View>
  );
};
export default Header;
