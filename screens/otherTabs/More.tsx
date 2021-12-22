import React, {useState, FC} from 'react';
import {View, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {fonts, colors} from '../../utils/constants';

interface Props {
  navigation: any;
}

const More: FC<Props> = props => {
  return (
    <View style={styles.mainContainer}>
      <Header title="More" navigation={props.navigation} />
      <View style={styles.container}>
        <Text>More Page</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  btn: {
    backgroundColor: colors.primaryColor,
    padding: 8,
    margin: 7,
    borderRadius: 8,
  },
  textStyle: {
    fontSize: 16,
    color: colors.labelFontColor,
    fontFamily: fonts.regular,
  },
  flatBlock: {
    height: '20%',
  },
});

export default More;
