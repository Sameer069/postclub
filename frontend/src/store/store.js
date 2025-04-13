import { configureStore } from "@reduxjs/toolkit";
import  UserSlicer from "../slicer/User-slicer"

export default configureStore({
    reducer:{
        user:UserSlicer
    }
})