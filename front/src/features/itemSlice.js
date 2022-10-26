import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../store/axios";

// получение школа
export const fetch = createAsyncThunk("user/fetchRegister", async function () {
  const { data } = await axios.post("/api/infoSchoolsFull");
  return data;
});

// отправка select и получения баллом
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

// получение баллов для первой таблицы
export const fetchBalls = createAsyncThunk(
  "user/fetchBalls",
  async function (options, { rejectWithValue }) {
    try {
      const { data } = await axios.post("/api/infoFullItems", options);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// получение баллов для второй таблицы
export const fetchBallsYears = createAsyncThunk(
  "user/fetchBallsYears",
  async function (options, { rejectWithValue }) {
    try {
      const { data } = await axios.post("/api/yearAll", options);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const initialState = {
  items: [],
  selectItems: "Выберите предмет",
  select: [],
  subject: [],
  errors: [],
  balls: { data: null, error: null, form: 'allYears' },
};

const itemSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectItems: (state, action) => {
      state.selectItems = action.payload.item;
    },
    uodateForm: (state, action) => {
      state.balls.form = action.payload;
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
    // баллы
    [fetchBalls.fulfilled]: (state, action) => {
      state.balls.data = action.payload;
      state.balls.form = "balls";
      state.balls.error = null;
    },
    [fetchBalls.rejected]: (state, action) => {
      state.balls.error = action.payload.response.data.error;
      state.balls.data = null;
    },
    // все года
    [fetchBallsYears.fulfilled]: (state, action) => {
      state.balls.data = action.payload;
      state.balls.form = "allYears";
      state.balls.error = null;
    },
    [fetchBallsYears.rejected]: (state, action) => {
      state.balls.error = action.payload.response.data.error;
      state.balls.data = null;
    },
  },
});

export const { selectItems, uodateForm } = itemSlice.actions;

export default itemSlice.reducer;
