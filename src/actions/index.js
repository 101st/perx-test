import * as api from '../apis/api';
var tempArray = [];

export const getCars = (page, per_page) => async dispatch => {
  try {
    tempArray = [];
    dispatch({ type: 'LOADING', status: true });

    let payload = await api.getCars(page, per_page);
    payload.data = payload.data.map(car => {
      if (tempArray.indexOf(car.dealer) === -1) {
        tempArray.push(car.dealer);
        dispatch(getDealer(car.dealer));
      }
      return Object.assign(car, { key: car.vin });
    });
    dispatch({ type: 'GET_CARS_SUCCESS', payload });

  } catch (error) {
    dispatch({ type: 'GET_ERROR', error: error });
  }
}

export const getDealer = (id) => async (dispatch, getState) => { //TODO
  try {
    const dealers = getState().reducer.get('dealers');
    let dealer = dealers.find(dealer => dealer.id === id);

    if (!dealer) {
      let payload = await api.getDealer(id);
      dispatch({ type: 'GET_DEALER_SUCCESS', payload: payload.data });
    }
    tempArray = tempArray.filter(dealer => { if (dealer !== id) return dealer; });
    if (tempArray.length === 0)
      dispatch({ type: 'LOADING', status: false });

  } catch (error) {
    dispatch({ type: 'GET_ERROR', error: error });
  }
}