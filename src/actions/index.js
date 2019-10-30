import * as api from '../apis/api';

export const getCars = (page, per_page) => async dispatch => {
  try {

    dispatch({ type: 'LOADING', status: true });

    let payload = await api.getCars(page, per_page);
    payload.data = payload.data.map(car => Object.assign(car, { key: car.vin }));
    dispatch({ type: 'GET_CARS_SUCCESS', payload });

    dispatch({ type: 'LOADING', status: false });

  } catch (error) {
    dispatch({ type: 'GET_ERROR', error: error });
  }
}

export const getDealer = (id) => async (dispatch, getState) => {
  try {
    const dealers = getState().reducer.get('dealers');
    let dealer = dealers.find(dealer => dealer.id === id);
    dispatch({ type: 'LOADING', status: true });

    if (dealer)
      dispatch({ type: 'GET_DEALER_SUCCESS' });
    else {
      let payload = await api.getDealer(id);
      dispatch({ type: 'GET_DEALER_SUCCESS', payload: payload.data });
    }

    dispatch({ type: 'LOADING', status: false });
  } catch (error) {
    dispatch({ type: 'GET_ERROR', error: error });
  }
}