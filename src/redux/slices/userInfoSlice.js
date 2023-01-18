import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    fullName:"",
    userCccd:"",
    userEmail:"",
    userId:"",
    userIsChecked:""
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    saveInfo: (state, action) => {
      state.fullName = action.payload.fullName
      state.userCccd = action.payload.userCccd
      state.userEmail = action.payload.userEmail
      state.userId = action.payload.userId
      state.userIsChecked = action.payload.userIsChecked
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveInfo } = userInfoSlice.actions

export default userInfoSlice.reducer