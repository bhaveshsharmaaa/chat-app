import { createSlice } from "@reduxjs/toolkit";

const selectedChatSlice = createSlice({
  name: "selectedChat",
  initialState: {
    selectedChat: null, // Initially null since no chat is selected
  },
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload; // Set selected chat as an object
    },
    addMessage: (state, action) => {
      const { newMessage } = action.payload;
      if (state.selectedChat) {
        state.selectedChat.messages.push(newMessage); // Push new message into the messages array
        state.selectedChat.lastMessage = newMessage.text; // Update the last message
        state.selectedChat.time = newMessage.time; // Update the last message time
        state.selectedChat.unread += 1; // Increase unread message count
      }
    },
  },
});

export const { setSelectedChat, addMessage } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;
