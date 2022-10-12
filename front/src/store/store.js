import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "../features/itemSlice";


export default configureStore({
  reducer: {
    items: itemSlice,
  },
});
