import { createSlice } from "@reduxjs/toolkit";

const togglebutton = createSlice({
  name: "createGroup",
  initialState: {
    createGroup: false,
    addFriend: false,
  },
  reducers: {
    setCreateGroupButton: (state, action) => {
      state.createGroup = action.payload;
    },
    setAddFriendButton: (state, action) => {
      state.addFriend = action.payload;
    },
  },
});

export const { setCreateGroupButton, setAddFriendButton } =
  togglebutton.actions;
export default togglebutton.reducer;
