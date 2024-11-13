import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
    isSidebarCollapse: boolean,
    isDarkMode: boolean
}

const initialState: InitialStateTypes = {
    isSidebarCollapse: false,
    isDarkMode: false
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setIsSidebarCollapse: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapse = action.payload
        },
        setIsDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload
        } 
    },
})


export const { setIsSidebarCollapse, setIsDarkMode } = globalSlice.actions;
export default globalSlice.reducer;