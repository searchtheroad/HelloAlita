import { query } from '@/services/api';

import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
import { querySummoner } from '@/services/api';
export interface SkillModelState {
  name: string;
  skills : [];
}

export interface SkillModelType {
  namespace: 'skill';
  state: SkillModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save:  Reducer<SkillModelState>;
  };
  subscriptions: { setup: Subscription };
}


const SkillModel: SkillModelType = {
  namespace: 'skill',

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
      const data = yield call(querySummoner);
      yield put({
        type : 'save',
        payload:{
          skills : data || [],
        }
      })
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/skill') {
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

export default SkillModel;
