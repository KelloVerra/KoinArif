import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage"
import { generateQuiz, getAllQuizTemplates } from "./quizes";


// Config (NOTE: No modify)
const persistConfig = {
    key: 'app',
    storage
}



// Reducer slices
const quizSlice = createSlice({
    name: 'quiz',
    initialState: { value: {
        correctQuizes: 0,
        currentGeneratedQuizIndex: 0,
        generatedQuizes: [],
        savedQuizData: [],
        quizCompletionRecapData: {finished: false},
    }},
    reducers: {
        advanceQuiz: (state, action) => { // TODO: budget logic when answer quiz
            const nextIndex = state.value.currentGeneratedQuizIndex + 1;
            if(nextIndex < state.value.generatedQuizes.length)
                state.value.currentGeneratedQuizIndex = nextIndex;
        },

        completeQuiz: (state, action) => { // TODO: Budget received calculations etc w/ payload infos
            state.value.quizCompletionRecapData = {finished: true};
        },

        resetQuiz: (state, action) => { //no payload
            state.value.currentGeneratedQuizIndex = 0;
            state.value.generatedQuizes.length = 0;
            state.value.correctQuizes = 0;
            state.value.quizCompletionRecapData = {finished: false};
        },

        createQuizList: (state, action) => { // payload is quiz generation rules, TBD
            const questions = [];
            const quizLen = 5; // TBD

            const data = action.payload;
            const quizDatabase = getAllQuizTemplates();
            

            for (let i = 0; i < quizLen; i++) {
                const question = generateQuiz({material: data.material});
                
                // generative questions TBD (TODO: QUESTION LOAD CALCULATION & REFERENCE OLDER MATERIALS)
                const questionData = {
                    format: question.questionData.format,
                    display_format: question.questionData.display_format,
                    type: question.questionData.type,
                    question: question.questionString,
                    options: question.options,
                    material: question.material,
                };
                questions.push(questionData);
            }
            
            console.log(questions);
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
                if (!state.value.savedQuizData.includes(v)) // prevent duplicate  quiz type
                    state.value.savedQuizData.push(v);
            });
            
        },
        
        incrementCorrectQuiz: (state, action) => { // no payload
            state.value.correctQuizes += 1;
        },

        clearSavedQuizData: (state, action) => { // no payload
            state.value.savedQuizData.length = 0
        },
    }
});
export const {advanceQuiz, resetQuiz, completeQuiz, createQuizList, addFamiliarQuizID, addSavedQuizData, clearSavedQuizData, incrementCorrectQuiz} = quizSlice.actions;

const materialSlice = createSlice({
    name: 'material',
    initialState: { value: {
        materialLevel: 0,
        submoduleRewardsTaken: [],
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
        
        addSubmoduleRewardClaimed: (state, action) => { // payload =  {material_id, submodule_id}
            if (!state.value.submoduleRewardsTaken.includes(action.payload)) // if new term, then push
                state.value.submoduleRewardsTaken.push(action.payload)
        },
        
        resetMaterialState: (state, action) => {
            state.value.materialLevel = 0;
            state.value.submoduleRewardsTaken.length = 0;
            state.value.familiarTerms.length = 0;
        },
    }
});
export const {incrementMaterialLevel, resetMaterialLevel, addFamiliarTerms, addSubmoduleRewardClaimed, resetMaterialState, } = materialSlice.actions;

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
    appStore.dispatch(setUserHasStarted(false));
    appStore.dispatch(setUserHasFinishTutorial(false));
    appStore.dispatch(resetMaterialState());
    appStore.dispatch(resetUserBudget(10));
    appStore.dispatch(resetHistory());
    appStore.dispatch(resetQuiz());
}