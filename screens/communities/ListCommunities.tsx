import React, {FC} from 'react';
import {StyleSheet, View, FlatList, RefreshControl, Text} from 'react-native';
import {calHeight, calWidth} from '../../utils/calDimens';
import RenderCommunity from './RenderCommunity';

interface Props {
  navigation: any;
  communityList: [];
  refreshing: boolean;
  onRefresh: any;
}

const ListCommunities: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.communityList}
        renderItem={({item}: any) => (
          <RenderCommunity item={item} navigation={props.navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: calWidth(90),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: calHeight(12),
  },
});

export default ListCommunities;
