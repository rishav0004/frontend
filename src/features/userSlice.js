import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id:"",
  email: "",
  username: "",
  is_driver:false,
  is_manager:false,
  is_head:false
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.username = action.payload.username
      state.is_driver = action.payload.is_driver
      state.is_manager = action.payload.is_manager
      state.is_head = action.payload.is_head
    },
    unsetUserInfo: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.username = action.payload.username
      state.is_driver = action.payload.is_driver
      state.is_manager = action.payload.is_manager
      state.is_head = action.payload.is_head
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer