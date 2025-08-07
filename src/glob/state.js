import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage"


// Config (NOTE: No modify)
const persistConfig = {
    key: 'app',
    storage
}



// Reducer slices
const quizSlice = createSlice({
    name: 'quiz',
    initialState: { value: {
        currentGeneratedQuizIndex: 0,
        generatedQuizes: [],
        familiarQuizes: [],
        savedData: [],
        quizCompletionRecapData: {finished: false},
    }},
    reducers: {
        advanceQuiz: (state, action) => { // TODO: budget logic when answer quiz
            const nextIndex = state.value.currentGeneratedQuizIndex + 1;
            if(nextIndex < state.value.generatedQuizes.length)
                state.value.currentGeneratedQuizIndex = nextIndex;
        },

        completeQuiz: (state, action) => { // TODO: Budget received calculations etc
            state.value.quizCompletionRecapData = {finished: true};
        },

        resetQuiz: (state, action) => { //no payload
            state.value.currentGeneratedQuizIndex = 0;
            state.value.generatedQuizes.length = 0;
            state.value.quizCompletionRecapData = {finished: false};
        },

        generateQuiz: (state, action) => { // payload is quiz generation rules, TBD
            const questions = [];
            const quizLen = 5; // TBD

            const data = action.payload;

            for (let i = 0; i < quizLen; i++) {
                const question = {materialId: data.materialId, quizVariant: 0, data: {}}; // generative questions TBD
                questions.push(question);
            }
            
            state.value.generatedQuizes = [...questions]
        },

        addFamiliarQuizID: (state, action) => {// payload is quiz type
            action.payload.forEach(v => {
                if (!state.value.familiarQuizes.includes(v)) // if new quiz type, then push
                    state.value.familiarQuizes.push(v)
            });
        },

        addSavedQuizData: (state, action) => {  // payload is quiz data
            action.payload.forEach(v => {
                if (!state.value.savedData.includes(v)) // prevent duplicate  quiz type
                    state.value.savedData.push(v);
            });
            
        },

        clearSavedQuizData: (state, action) => { // no payload
            state.value.savedData.length = 0
        },
    }
});
export const {advanceQuiz, resetQuiz, completeQuiz, generateQuiz, addFamiliarQuizID, addSavedQuizData, clearSavedQuizData} = quizSlice.actions;

const materialSlice = createSlice({
    name: 'material',
    initialState: { value: {
        materialLevel: 0,
        familiarTerms: [],
    }},
    reducers: {
        incrementMaterialLevel: (state, action) => { // payload is addition of levels
            state.value.materialLevel += action.payload;
        },

        resetMaterialLevel: (state, action) => { // no payload
            state.value.materialLevel = 0
        },

        addFamiliarTerms: (state, action) => { // payload is a list of new terms
            action.payload.forEach(v => {
                if (!state.value.familiarTerms.includes(v)) // if new term, then push
                    state.value.familiarTerms.push(v)
            });
        },
    }
});
export const {incrementMaterialLevel, resetMaterialLevel, addFamiliarTerms} = materialSlice.actions;

const userSlice = createSlice({
    name: 'user',
    initialState: { value: {
        hasStarted: false,
        hasFinishedTutorial: false,
        budget: 10,
        history: [],
    }},
    reducers: {
        setUserHasStarted: (state, action) => { // Set user activity
            state.value.hasStarted = action.payload
        },

        setUserHasFinishTutorial: (state, action) => { // Set user activity
            state.value.hasFinishedTutorial = action.payload;
        },

        addUserBudget: (state, action) => { // Adds certain amount of budget points
            state.value.budget += action.payload
        },

        resetUserBudget: (state, action) => { // No playload
            state.value.budget = 10;
        },
        
        addHistory: (state, action) => { // Records user activity, maximum of 2 actions recorded
            // PAYLOAD FORMAT {type:'quiz',data:{}}
            if (state.value.history.length >= 3)
                state.value.history.pop();
            state.value.history.unshift(action.payload);
        },

        resetHistory: (state, action) => { // no payloda
            state.value.history.length = 0
        },
    }
});
export const {setUserHasStarted, setUserHasFinishTutorial, addUserBudget, resetUserBudget, addHistory, resetHistory} = userSlice.actions;




// Combine
const rootReducers = combineReducers({
    quiz: quizSlice.reducer,
    material: materialSlice.reducer,
    user: userSlice.reducer,
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



// Resetter
export const resetStore = _ => {
    appStore.dispatch(setUserHasStarted(false))
    appStore.dispatch(setUserHasFinishTutorial(false))
    appStore.dispatch(resetMaterialLevel())
    appStore.dispatch(resetUserBudget(10))
    appStore.dispatch(resetHistory())
}