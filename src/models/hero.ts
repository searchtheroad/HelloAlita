import { query } from '@/services/api';

import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
import { queryHeroList, getHeroDetails } from '@/services/api';
export interface HeroModelState {
  name: string;
  filterKey: number;
  heros: [];
  freeheros: [];
  itemHover: number;
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save:  Reducer<HeroModelState>;
  };
  subscriptions: { setup: Subscription };
}


const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    name: '',
    filterKey: 0,
    heros: [],
    freeheros: [],
    itemHover: 0,
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'save',
        payload: { name: data.text },
      });

    },

    *fetch({type , payload} , { call , put , select}){
      // const data = yield request('/api/herolist.json');
      const data = yield call(queryHeroList);
      const freeHeroList = data.filter( (item) => {
        if(item.hasOwnProperty('pay_type') && item.pay_type === 10){
          return true;
        }else {
          return false;
        }
      } );
      const localData = [
        {
          ename: 105,
          cname: '廉颇',
          title: '正义爆轰',
          new_type: 0,
          hero_type: 3,
          skin_name: '正义爆轰|地狱岩魂',
        },
        {
          ename: 106,
          cname: '小乔',
          title: '恋之微风',
          new_type: 0,
          hero_type: 2,
          skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
        },
      ];
      yield put({
        type : 'save',
        payload:{
          heros : data || localData,
          freeheros : freeHeroList,
        }
      })
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/hero') {
          dispatch({
            type: 'fetch'
          })
        }
      });
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default HeroModel;
