import { createSlice } from "@reduxjs/toolkit";

const chatListSlice = createSlice({
  name: "chatList",
  initialState: {
    chatList: [
      {
        userId: 1,
        username: "johnDoe",
        userInfo: {
          fullName: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        messages: [
          {
            text: "Hey, how's it going?",
            sender: "other",
            time: "8:30 AM",
          },
          {
            text: "Nice! What kind of workout?",
            sender: "self",
            time: "8:33 AM",
          },
          {
            text: "Tomorrow at 2 PM works for me.",
            sender: "self",
            time: "8:36 AM",
          },
        ],
        lastMessage: "Tomorrow at 2 PM works for me.",
        time: "5m", // Time since the last message was sent
        unread: 1, // Number of unread messages
      },
      {
        userId: 2,
        username: "janeSmith",
        userInfo: {
          fullName: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        messages: [
          {
            text: "I'm good, just finished my workout!",
            sender: "other",
            time: "8:32 AM",
          },
          {
            text: "Mostly strength training today. Feeling pumped!",
            sender: "self",
            time: "8:34 AM",
          },
          {
            text: "Same here. 2 PM sounds good.",
            sender: "other",
            time: "8:37 AM",
          },
        ],
        lastMessage: "Same here. 2 PM sounds good.",
        time: "3m", // Time since the last message was sent
        unread: 3, // Number of unread messages
      },
      {
        userId: 3,
        username: "mikeWilson",
        userInfo: {
          fullName: "Mike Wilson",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        messages: [
          {
            text: "Yo, when are we meeting up for the project?",
            sender: "other",
            time: "8:35 AM",
          },
          {
            text: "Cool, see you both tomorrow!",
            sender: "self",
            time: "8:39 AM",
          },
        ],
        lastMessage: "Cool, see you both tomorrow!",
        time: "2m", // Time since the last message was sent
        unread: 0, // Number of unread messages
      },
    ],
  },
  reducers: {
    setChatList: (state, action) => {
      state.chatList.push(action.payload);
    },
    lastMessage: (state, action) => {
      const { userId, newMessage } = action.payload;
      const chat = state.chatList.find((chat) => chat.userId === userId);
      if (chat) {
        chat.messages.push(newMessage);
        chat.lastMessage = newMessage.text;
        chat.time = newMessage.time;
        // chat.unread += 1;
      }
    },
    removeChat: (state, action) => {
      state.chatList = state.chatList.filter(
        (chat) => chat.userId !== action.payload
      );
    },
  },
});

export const { setChatList, lastMessage, removeChat } = chatListSlice.actions;
export default chatListSlice.reducer;
