import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface CallState {
  currentChatUser: string | number | undefined;
  type: "out-going" | "in-coming" | undefined;
  callType: "voice" | "video" | undefined;
  roomId: number | undefined;
}

const initialState: CallState = {
  currentChatUser: undefined,
  type: undefined,
  callType: undefined,
  roomId: undefined,
};

// Create the slice
const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    videoCall: (
      state,
      action: PayloadAction<{ currentChatUser: string; roomId: number }>
    ) => {
      state.currentChatUser = action.payload.currentChatUser;
      state.type = "out-going";
      state.callType = "video";
      state.roomId = action.payload.roomId;
    },
    voiceCall: (
      state,
      action: PayloadAction<{ currentChatUser: string; roomId: number }>
    ) => {
      state.currentChatUser = action.payload.currentChatUser;
      state.type = "out-going";
      state.callType = "voice";
      state.roomId = action.payload.roomId;
    },
    inComingVoiceCall: (
      state,
      action: PayloadAction<{ currentChatUser: string; roomId: number }>
    ) => {
      state.currentChatUser = action.payload.currentChatUser;
      state.type = "in-coming";
      state.callType = "voice";
      state.roomId = action.payload.roomId;
    },
    inComingVideoCall: (
      state,
      action: PayloadAction<{ currentChatUser: string; roomId: number }>
    ) => {
      state.currentChatUser = action.payload.currentChatUser;
      state.type = "in-coming";
      state.callType = "video";
      state.roomId = action.payload.roomId;
    },
    endCall: (state) => {
      // Reset all states to undefined
      state.currentChatUser = undefined;
      state.type = undefined;
      state.callType = undefined;
      state.roomId = undefined;
    },
  },
});

// Export actions
export const {
  videoCall,
  voiceCall,
  inComingVoiceCall,
  inComingVideoCall,
  endCall,
} = callSlice.actions;

// Export reducer
export default callSlice.reducer;
