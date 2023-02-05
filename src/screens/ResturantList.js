import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {topHeadlineRequest} from '../store/action';
import ResturantCard from '../components/ResturantCard';
import {TEXTCONST} from '../utils/Constant';

const ResturantList = ({resturantModel, dispatch, navigation}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    requestAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const requestAPI = () => {
    dispatch(
      topHeadlineRequest({
        page: page,
      }),
    );
  };

  const fetchMoreData = () => {
    if (resturantModel.data.length === 10 * page) {
      let page_Current = page + 1;
      setPage(page_Current);
    }
  };

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>{TEXTCONST.No_Data_at_the_moment}</Text>
      <Button onPress={() => requestAPI()} title={TEXTCONST.Refresh} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {resturantModel.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{flexGrow: 1}}
          data={resturantModel.data}
          renderItem={({item}) => (
            <ResturantCard navigation={navigation} resturant={item} />
          )}
          ListEmptyComponent={renderEmpty}
          onEndReachedThreshold={0.4}
          onEndReached={fetchMoreData}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    resturantModel: state.resturant,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps)(ResturantList);
