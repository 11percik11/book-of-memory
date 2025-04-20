import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeroState {
    category: string;
}

const initialState: HeroState = {
    category: "",
};

const heroSlice = createSlice({
    name: 'hero',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<HeroState>) {  // Заменили setСategory на setCategory
            state.category = action.payload.category;
        },
        clearCategory(state) {
            state.category = "";
        }
    },
});

export const { setCategory, clearCategory } = heroSlice.actions;
export default heroSlice.reducer;  // Экспортируем редюсер


// import { createSlice } from '@reduxjs/toolkit';

// // Начальное состояние
// const initialState = {
//   value: 0,
// };

// // Создание slice
// const counterSlice = createSlice({
//   name: 'counter', // Имя slice
//   initialState,   // Начальное состояние
//   reducers: {
//     // Reducer для увеличения значения
//     increment(state) {
//       state.value += 1;
//     },
//     // Reducer для уменьшения значения
//     decrement(state) {
//       state.value -= 1;
//     },
//     // Reducer для увеличения на определенное значение
//     incrementByAmount(state, action) {
//       state.value += action.payload;
//     },
//   },
// });

// // Экспорт actions
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// // Экспорт reducer
// export default counterSlice.reducer;