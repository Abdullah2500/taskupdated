import React, {useState, useEffect, FC} from 'react';
import {View, Text, FlatList, Pressable, StyleSheet, Modal} from 'react-native';
import Header from '../../components/Header';
import ModalComponent from '../../components/Modal';
import ListCommunities from './ListCommunities';
import {fonts, colors} from '../../utils/constants';
import {calHeight, calWidth} from '../../utils/calDimens';
import {getCommunitiesApi} from '../../services/services';
import {closeLoading, setCommunityDetails} from '../../redux/actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/reducers/indexReducer';

interface Props {
  navigation: any;
}

const CommunitiesMain: FC<Props> = props => {
  const [index, setIndex] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
  const visible = useSelector((state: RootState) => state.loadingReducer);
  const communityList = useSelector(
    (state: RootState) => state.communityReducer.list,
  );
  const userListArray = useSelector((state: RootState) => state.userReducer);
  // const userListArray = useSelector((state: RootState) => state.userReducer.details);
  console.log('useListArray: ', userListArray);
  // const username = userListArray[userListArray.length - 1].username;

  const getCommunityList = async () => {
    try {
      const res = await getCommunitiesApi();
      dispatch(setCommunityDetails(res.data));
      dispatch(closeLoading());
    } catch (error) {
      console.log(error);
    }
  };

  const tabs = [
    {
      id: 1,
      name: ' All ',
    },
    {
      id: 2,
      name: 'Current',
    },
    {
      id: 3,
      name: 'Future',
    },
    {
      id: 4,
      name: 'Completed',
    },
  ];

  // renderItem for tabs
  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={{paddingHorizontal: 10}}
        onPress={() => setIndex(item.id)}>
        <Text
          style={item.id == index ? styles.selectedTab : styles.unselectedTab}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  const modalFunc = () => {
    return (
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeading}>Heading</Text>
          <View style={styles.modalList}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={userListArray}
              renderItem={({item}) => {
                return (
                  <View style={styles.modalListItem}>
                    <Text style={[styles.upperSectionLabel, {fontSize: 16}]}>
                      Username: {item.username}
                    </Text>
                    <Text style={[styles.upperSectionLabel, {fontSize: 16}]}>
                      Email: {item.email}
                    </Text>
                    <Text style={[styles.upperSectionLabel, {fontSize: 16}]}>
                      Address: {item.address}
                    </Text>
                    <Text style={[styles.upperSectionLabel, {fontSize: 16}]}>
                      Phone Number: {item.phone_number}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.showUsers}>
              <Text style={[styles.upperSectionLabel, {fontSize: 16}]}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const filterFunction = () => {
    switch (index) {
      case 1:
        return communityList;
      case 2:
        let currentList = communityList.filter((item: {category: string}) => {
          return item.category === 'Current';
        });
        return currentList;
      case 3:
        let futureList = communityList.filter((item: {category: string}) => {
          return item.category === 'Future';
        });
        return futureList;
      case 4:
        let completedList = communityList.filter((item: {category: string}) => {
          return item.category === 'Completed';
        });
        return completedList;
    }
  };

  const refreshed = async () => {
    setRefreshing(true);
    await getCommunityList();
    setRefreshing(false);
  };

  useEffect(() => {
    getCommunityList();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* <Header title={`Hi, ${username}!`} navigation={props.navigation} /> */}
      <View style={styles.upperSection}>
        <Text style={styles.upperSectionLabel}>Let's find you dream home.</Text>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.showUsers}>
          <Text
            style={[
              styles.upperSectionLabel,
              {fontSize: 16, color: colors.white},
            ]}>
            Show total Users
          </Text>
        </Pressable>
        {modalFunc()}
      </View>
      <View style={styles.tabContainer}>
        {/* FlatList for Tabs */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tabs}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {visible && <ModalComponent />}
      <ListCommunities
        communityList={filterFunction()}
        navigation={props.navigation}
        refreshing={refreshing}
        onRefresh={refreshed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  upperSection: {
    alignItems: 'flex-start',
    paddingHorizontal: calWidth(7),
  },
  upperSectionLabel: {
    color: colors.labelFontColor,
    fontSize: 18,
    fontFamily: fonts.regular,
    marginBottom: 8,
  },
  tabContainer: {
    marginTop: 10,
    marginHorizontal: calWidth(5),
    zIndex: 1,
  },
  selectedTab: {
    color: colors.primaryColor,
    fontFamily: fonts.regular,
    fontSize: 15,
    paddingBottom: 5,
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 3,
  },
  unselectedTab: {
    color: 'black',
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  showUsers: {
    alignSelf: 'center',
    padding: 5,
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.mainFontColor,
    borderBottomColor: '#000',
    borderBottomWidth: 3,
    marginTop: 5,
  },
  modalList: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
  },
  modalListItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#d6d6c2',
    borderRadius: 15,
  },
});

export default CommunitiesMain;
