import * as api from '../apis/api';

export const getCars = (page, per_page) => async dispatch => {
  try {
    dispatch({ type: 'LOADING', status: true });

    let payload = await api.getCars(page, per_page);
    var tempArray = [];
    payload.data = payload.data.map(car => {
      if (tempArray.indexOf(car.dealer) === -1) {
        dispatch(getDealer(car.dealer));
        tempArray.push(car.dealer);
      }
      return Object.assign(car, { key: car.vin });
    });
    dispatch({ type: 'GET_CARS_SUCCESS', payload });

    dispatch({ type: 'LOADING', status: false });

  } catch (error) {
    dispatch({ type: 'GET_ERROR', error: error });
  }
}

export const getDealer = (id) => async (dispatch, getState) => { //TODO
  try {
    const dealers = getState().reducer.get('dealers');
    let dealer = dealers.find(dealer => dealer.id === id);
    dispatch({ type: 'LOADING', status: true });

    if (!dealer) {
      let payload = await api.getDealer(id);
      dispatch({ type: 'GET_DEALER_SUCCESS', payload: payload.data });
    }

    dispatch({ type: 'LOADING', status: false });
  } catch (error) {
    dispatch({ type: 'GET_ERROR', error: error });
  }
}