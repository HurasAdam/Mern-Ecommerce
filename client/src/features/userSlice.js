import {createSlice} from '@reduxjs/toolkit'

// AppApi

import appApi  from '../services/appApi';

const initialState = null;
export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
})
export default userSlice.reducer;