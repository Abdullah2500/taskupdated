import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {fonts, colors} from '../../utils/constants';

interface Props {
  navigation: any;
}

const Listings: FC<Props> = props => {
  return (
    <View style={styles.mainContainer}>
      <Header title="Listings" navigation={props.navigation} />
      <View style={styles.container}>
        <Text style={styles.labelText}>Listings Page</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.background,
  },
  container: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    color: colors.labelFontColor,
    fontFamily: fonts.regular,
  },
});

export default Listings;
