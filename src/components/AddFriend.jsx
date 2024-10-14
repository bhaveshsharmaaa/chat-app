import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { X, Users, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAddFriendButton } from "../Store/togglebuttonSlice";
import { setChatList, removeChat } from "../Store/chatListSlice";

const AddFriend = () => {
  const [friendName, setFriendName] = useState("");
  const openAddFriend = useSelector((state) => state.toggleButton?.addFriend);
  const addFriendList = useSelector((state) => state.addfriend?.addfriend);
  const chatList = useSelector((state) => state.chatlist?.chatList);
  const dispatch = useDispatch();

  const handleFriendToggle = (friend) => {
    const friendExists = chatList.some((chat) => chat.userId === friend.id);

    if (friendExists) {
      dispatch(removeChat(friend.id));
    } else {
      const newFriend = {
        userId: friend.id,
        username: friend.name,
        userInfo: {
          fullName: friend.name,
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        messages: [],
        lastMessage: "",
        time: "",
        unread: 0,
      };
      dispatch(setChatList(newFriend));
    }
  };

  const handleClose = () => {
    dispatch(setAddFriendButton(false));
  };

  return (
    <Dialog open={openAddFriend} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Users style={{ marginRight: "8px" }} />
            <Typography variant="h6">Add New Friend</Typography>
          </div>
          <IconButton onClick={handleClose}>
            <X />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          id="friendName"
          label="Friend Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <Typography variant="subtitle1" gutterBottom>
          Select Friends
        </Typography>
        <List style={{ maxHeight: "200px", overflow: "auto" }}>
          {addFriendList.map((friend) => (
            <ListItem
              key={friend.id}
              secondaryAction={
                <Button
                  variant="contained"
                  color={
                    chatList.find((chat) => chat.userId === friend.id)
                      ? "error"
                      : "success"
                  }
                  onClick={() => handleFriendToggle(friend)}
                >
                  {chatList.find((chat) => chat.userId === friend.id)
                    ? "Remove"
                    : "Add"}
                </Button>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <User />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={friend.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFriend;
