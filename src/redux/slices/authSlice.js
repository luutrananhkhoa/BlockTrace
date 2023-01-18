import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action)=>{
        state.isAuthenticated = action.payload
    },
  },
  extraReducers: {},
})

const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if ( action.type?.startsWith('auth/') ) {
    const authState = store.getState().auth;
    localStorage.setItem('auth', JSON.stringify(authState))
  }
  return result;
};
export const authActions = authMiddleware;
export const { login } = authSlice.actions

export default authSlice.reducer