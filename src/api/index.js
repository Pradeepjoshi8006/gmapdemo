import axios from 'axios';
import {isNull, isUndefined} from 'lodash';
import RealmService from '../localDB/realm';
import {DBConst} from '../utils/Constant';

const endpoint =
  'http://205.134.254.135/~mobile/interview/public/api/restaurants_list';

export const getTopHeadlineRequest = async params => {
  var res = null;
  const resturantList = await getDataFromRealm(DBConst.ResturantList);
  if (resturantList?.length > 0) {
    res = {};
    res.data = {};
    res.data.data = resturantList;
  } else {
    res = await axios.get(endpoint, {
      params: {
        page: params.page,
        pageSize: 10,
      },
    });
    await saveInRealmDB(res);
  }
  return res;
};

const getDataFromRealm = async db => {
  return await RealmService.findAll(db);
};

const saveInRealmDB = async res => {
  if (!isNull(res.data) && !isUndefined(res.data)) {
    await RealmService.updateMultiple(DBConst.ResturantList, res?.data?.data);
  }
};
