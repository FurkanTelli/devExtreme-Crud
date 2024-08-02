import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:"user",
    initialState:{
        userObject:{}
    },
    reducers:{
        setUserValue(state,action) {
            state.userObject = action.payload;
            localStorage.setItem('objectOfUser', JSON.stringify(action.payload));
        }
    }
})


export const {setUserValue} = userSlice.actions;
export default userSlice.reducer;