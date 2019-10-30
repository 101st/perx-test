import { fromJS } from 'immutable';
import * as actionTypes from '../actions/constants';

const initialState = fromJS({
  loading: false,
  cars: [],
  dealers: [],
  totalCount: 0
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return state
        .set('loading', action.status);
    case actionTypes.GET_CARS_SUCCESS:
      return state
        .set('totalCount', Number(action.payload.headers['x-total-count']))
        .set('cars', action.payload.data);
    case actionTypes.GET_DEALER_SUCCESS:
      if (action.payload)
        return state.update('dealers', arr => arr.concat(action.payload));
      return state;
    default:
      return state;
  }
};