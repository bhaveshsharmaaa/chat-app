import { useState } from "react";
import { X, UserPlus, Users, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateGroupButton } from "../Store/togglebuttonSlice";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Checkbox,
} from "@mui/material";

// Mock friends data
const friends = [
  { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg" },
  { id: 2, name: "Bob Smith", avatar: "/placeholder.svg" },
  { id: 3, name: "Charlie Brown", avatar: "/placeholder.svg" },
  { id: 4, name: "Diana Prince", avatar: "/placeholder.svg" },
  { id: 5, name: "Ethan Hunt", avatar: "/placeholder.svg" },
];

export default function CreateGroup() {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState("");

  const createGroup = useSelector((state) => state.toggleButton?.createGroup);
  const dispatch = useDispatch();

  const handleFriendToggle = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleCreateGroup = () => {
    if (groupName.trim() === "" || selectedFriends.length === 0) {
      alert("Please enter a group name and select at least one friend.");
      return;
    }

    console.log("Creating group:", {
      name: groupName,
      members: selectedFriends,
    });
    handleClose();
  };

  const handleClose = () => {
    dispatch(setCreateGroupButton(false));
  };

  return (
    <Dialog open={createGroup} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component="span"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Users
              style={{
                marginRight: "8px",
                height: "24px",
                width: "24px",
                color: "primary",
              }}
            />
            Create New Group
          </Typography>
          <IconButton onClick={handleClose}>
            <X />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* Group Name Input */}
        <TextField
          fullWidth
          variant="outlined"
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          margin="normal"
        />

        {/* Friends List */}
        <Typography variant="subtitle1" gutterBottom>
          Select Friends
        </Typography>
        <List dense>
          {friends.map((friend) => (
            <ListItem
              key={friend.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => handleFriendToggle(friend.id)}
                  checked={selectedFriends.includes(friend.id)}
                />
              }
            >
              <ListItemAvatar>
                <Avatar src={friend.avatar}>
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
          Cancel
        </Button>
        <Button
          onClick={handleCreateGroup}
          variant="contained"
          color="primary"
          startIcon={<UserPlus />}
        >
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  );
}
