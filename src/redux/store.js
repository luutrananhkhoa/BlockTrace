import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import userInfoSlice from './slices/userInfoSlice'
import authSlice, {authActions} from './slices/authSlice'
export const store = configureStore({
  reducer: {
    address: userSlice,
    userInfo: userInfoSlice,
    // qrCode: userSlice,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authActions)

})
