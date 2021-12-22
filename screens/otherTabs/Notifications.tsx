import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {fonts, colors} from '../../utils/constants';

interface Props {
  navigation: any;
}

const Notifications: FC<Props> = props => {
  return (
    <View style={styles.mainContainer}>
      <Header title="News" navigation={props.navigation} />
      <View style={styles.container}>
        <Text style={styles.labelText}>Notifications Page</Text>
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
  headText: {
    fontSize: 22,
    color: colors.mainFontColor,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    color: colors.labelFontColor,
    fontFamily: fonts.regular,
  },
});

export default Notifications;
