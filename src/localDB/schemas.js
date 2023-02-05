import {DBConst} from '../utils/Constant';

const schemas = [
  {
    name: DBConst.ResturantList,
    primaryKey: 'id',
    properties: {
      id: 'int',
      title: 'mixed',
      address: 'mixed',
      latitude: 'mixed',
      longitude: 'mixed',
      rating: 'mixed',
      total_review: 'mixed',
      description: 'mixed',
      mobile: 'mixed',
      images: {type: 'list', objectType: DBConst.ImageList},
    },
  },
  {
    name: DBConst.ImageList,
    properties: {
      url: 'mixed',
    },
  },
];

export default schemas;
