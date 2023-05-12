import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	mode: "dark",
	userId: "6459e8f37d77e41867591fe5"
};

// create global slice to manage global settings
export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setMode: (state) => {
			state.mode = state.mode === "light" ? "dark" : "light";
		},
	},
});

// export function reducer to access it
export const { setMode } = globalSlice.actions;

// export slice reducer
export default globalSlice.reducer;
