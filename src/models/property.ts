import { query } from '@/services/api';

import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
import { queryItem } from '@/services/api';
export interface PropertyModelState {
  name: string;
  items : [];
}

export interface PropertyModelType {
  namespace: 'property';
  state: PropertyModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save:  Reducer<PropertyModelState>;
  };
  subscriptions: { setup: Subscription };
}


const PropertyModel: PropertyModelType = {
  namespace: 'property',

  state: {
    name: ''
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
      const data = yield call(queryItem);
      yield put({
        type : 'save',
        payload:{
          items : data || [],
        }
      })
    },

  },


  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/property') {
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

export default PropertyModel;
