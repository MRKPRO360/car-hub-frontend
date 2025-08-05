import { createSlice } from '@reduxjs/toolkit';
import { ICar } from '../../../types';
import { RootState } from '../../store';

interface IInitialState {
  cars: ICar[];
}

const initialState: IInitialState = {
  cars: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addCar: (state, { payload }) => {
      const carToWishlist = state.cars.find((car) => car._id === payload._id);

      //  IF CAR EXISTS THEN REMOVE THE CAR

      if (carToWishlist) {
        state.cars = state.cars.filter((car) => car._id !== payload._id);
        return;
      } else {
        //  IF CAR DOESN"T EXIST THEN ADD IT TO THE WISHLIST

        state.cars.push({
          ...payload,
        });
      }
    },

    removeCar: (state, { payload }) => {
      const carToWishlist = state.cars.find((car) => car._id === payload._id);

      if (carToWishlist) {
        state.cars = state.cars.filter((car) => car._id !== payload._id);
      }
      return;
    },

    // CLEARING CART VALUE
    clearCart: (state) => {
      state.cars = [];
    },
  },
});

// DEFAULT SELECTOR
export const selectWishlistedCar = (state: RootState) => state.wishlist.cars;

export const { addCar, clearCart, removeCar } = wishlistSlice.actions;

export default wishlistSlice.reducer;
