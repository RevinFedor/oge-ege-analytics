import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../store/axios";

export const fetch = createAsyncThunk("user/fetchRegister", async function () {
  const { data } = await axios.post("/api/infoSchoolsFull");
  return data;
});
export const fetchData = createAsyncThunk(
  "user/fetchData",
  async function (options, { rejectWithValue }) {
    try {
      const { data } = await axios.post("/api/mynicipal", options);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);




const initialState = {
  items: [],
  selectItems: "Выберите предмет",
  select: [],
  subject: [],
  errors: [],
};

const itemSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectItems: (state, action) => {
      state.selectItems = action.payload.item;
    },
  },
  extraReducers: {
    [fetch.fulfilled]: (state, action) => {
      state.select = action.payload;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.subject = action.payload;
    },
    [fetchData.rejected]: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { selectItems } = itemSlice.actions;

export default itemSlice.reducer;
