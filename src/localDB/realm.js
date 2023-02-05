/* eslint-disable eslint-comments/no-unlimited-disable */
import Realm from 'realm';
import schemas from './schemas';

const realmConfig = {
  schema: [...schemas],
};

let realm = null;

const RealmService = {
  open: async () => {
    try {
      console.log('init', realmConfig);
      realm = await Realm.open(realmConfig);
      console.log('initia', realm);
    } catch (err) {
      console.log(err);
    }
  },
  findAll: async key => {
    let data = {};
    console.log('test', key);
    data = await realm?.objects(key);
    return data?.length ? data : null;
  },
  updateMultiple: async (key, items) => {
    for (const item of items) {
      realm.write(async () => { //eslint-disable-line
        // const item = realm.objectForPrimaryKey(key, itemId);
        await realm.create(key, item, 'modified');
      });
    }
  },
};

export default RealmService;
