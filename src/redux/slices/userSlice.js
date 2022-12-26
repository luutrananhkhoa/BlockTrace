import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveAddress: (state, action) => {
      state.address = action.payload
    },
    saveQR: (state, action) => {
      state.qr = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { saveAddress,saveQR } = userSlice.actions

export default userSlice.reducer