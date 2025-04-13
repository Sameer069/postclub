import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    toggle:"home"
}

const UserSlicer=createSlice({
    name:"userProfile",
    initialState,
    reducers:{
        setToggle:(state,action)=>{
            state.toggle=action.payload
        }
    }

})

export const {setToggle}=UserSlicer.actions

export default UserSlicer.reducer