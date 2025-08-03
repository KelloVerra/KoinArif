import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage"


// Config (NOTE: No modify)
const persistConfig = {
    key: 'app',
    storage
}



// Reducer slices
// const testSlice = createSlice({
//     name: 'test',
//     initialState: { value: 0 },
//     reducers: {
//         inc: s => {s.value += 1},
//         dec: s => {s.value -= 1},
//     }
// });
// export const {inc, dec} = testSlice.actions;




// Combine
const rootReducers = combineReducers({
    // test: testSlice.reducer
});
const persistentReducers = persistReducer(
    persistConfig,
    rootReducers
);




// Store (NOTE: Dont modify)
export const appStore = configureStore({
    reducer: persistentReducers,
    middleware: (defaultMiddleware) => defaultMiddleware({
        serializableCheck: {
            ignoreActions: ['persist/PERSIST', 'persist/REHYDRATE']
        }
    })
});
export const persistAppStore = persistStore(appStore);
