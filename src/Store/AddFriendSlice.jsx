import { createSlice } from "@reduxjs/toolkit";

const addfriendSlice = createSlice({
  name: "addfriend",
  initialState: {
    addfriend: [
      { id: 4, name: "David Brown", username: "david_brown" },
      { id: 5, name: "Eva Green", username: "eva_green" },
      { id: 6, name: "Frank White", username: "frank_white" },
    ],
  },
  reducers: {
    setAddFriends: (state, action) => {
      state.addfriend = action.payload;
    },
  },
});
export const { setAddFriends } = addfriendSlice.actions;
export default addfriendSlice.reducer;
