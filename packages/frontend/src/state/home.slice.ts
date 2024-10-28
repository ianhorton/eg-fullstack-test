import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HomeState {
  message: string | undefined;
  loading: boolean;
  loaded: boolean;
  errors: string[];
}

export const initialState: HomeState = {
  message: undefined,
  loading: false,
  loaded: false,
  errors: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    resetHomeCommand: (): HomeState => {
      return initialState;
    },

    resetHomeSucceededEvent: (state: HomeState): HomeState => {
      return {
        ...state,
      };
    },

    fetchMessageCommand: (state: HomeState): HomeState => {
      return {
        ...state,
        loading: true,
      };
    },

    fetchMessageSucceededEvent: (
      state: HomeState,
      action: PayloadAction<string>,
    ): HomeState => {
      const { payload } = action;
      return {
        ...state,
        message: payload,
        loading: false,
        loaded: true,
      };
    },

    fetchMessageFailedEvent: (
      state: HomeState,
      action: PayloadAction<string>,
    ): HomeState => {
      return {
        ...state,
        errors: [...state.errors, action.payload],
        loading: false,
        loaded: false,
      };
    },
  },
});

export const {
  resetHomeCommand,
  resetHomeSucceededEvent,

  fetchMessageCommand,
  fetchMessageSucceededEvent,
  fetchMessageFailedEvent,
} = homeSlice.actions;

export default homeSlice.reducer;
