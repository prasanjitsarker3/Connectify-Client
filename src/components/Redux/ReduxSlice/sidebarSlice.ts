// src/components/Redux/ReduxSlice/sidebarVisibilitySlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface SidebarVisibilityState {
  isVisible: boolean;
}

const initialState: SidebarVisibilityState = {
  isVisible: true,
};

const sidebarVisibilitySlice = createSlice({
  name: "sidebarVisibility",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isVisible = !state.isVisible;
    },
    hideSidebar: (state) => {
      state.isVisible = false;
    },
    showSidebar: (state) => {
      state.isVisible = true;
    },
  },
});

export const { toggleSidebar, hideSidebar, showSidebar } =
  sidebarVisibilitySlice.actions;
export default sidebarVisibilitySlice.reducer;
