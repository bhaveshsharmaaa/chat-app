import { configureStore } from "@reduxjs/toolkit";
import togglebuttonReducer from "./togglebuttonSlice";
import chatListReducer from "./chatListSlice";
import addfriendReducer from "./AddFriendSlice";
import selectedChatReducer from "./selectedChatSlice";

export const store = configureStore({
  reducer: {
    toggleButton: togglebuttonReducer,
    chatlist: chatListReducer,
    addfriend: addfriendReducer,
    selectedChat: selectedChatReducer,
  },
});
