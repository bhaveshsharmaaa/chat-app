import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCog,
  FaComments,
  FaPlus,
  FaSignOutAlt,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";
import {
  Send as SendIcon,
  ArrowBack,
  MoreVert,
  Phone,
  Videocam,
  EmojiEmotions,
} from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Badge,
  Drawer,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { IoIosSearch } from "react-icons/io";

import EmojiPicker from "emoji-picker-react";

import CreateGroup from "./components/CreateGroup";
import AddFriend from "./components/AddFriend";
import { addMessage, setSelectedChat } from "./Store/selectedChatSlice";
import { lastMessage } from "./Store/chatListSlice";
import {
  setAddFriendButton,
  setCreateGroupButton,
} from "./Store/togglebuttonSlice";
import { UsersRound } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";

const App = () => {
  const [emoji, setEmoji] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const chatselect = useSelector((state) => state.selectedChat?.selectedChat);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const chatData = useSelector((state) => state.chatlist?.chatList);
  const dispatch = useDispatch();

  const handleCreateGroup = () => {
    dispatch(setCreateGroupButton(true));
    setIsOpen(false);
  };

  const handleAddFriend = () => {
    dispatch(setAddFriendButton(true));
    setIsOpen(false);
  };

  const handleSelectedChat = (data) => {
    dispatch(setSelectedChat(data));
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!chatselect || !chatselect.userId) {
      console.error("No chat selected");
      return;
    }

    const newMessage = {
      text: inputMessage,
      sender: "self",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    dispatch(addMessage({ userId: chatselect.userId, newMessage }));
    dispatch(lastMessage({ userId: chatselect.userId, newMessage }));
    setInputMessage("");
  };

  const onEmojiClick = (emojiObject) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <>
      <CreateGroup />
      <AddFriend />
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "grey.100" }}>
        {/* Sidebar for desktop */}
        <Box
          sx={{
            width: { xs: "0", sm: "300px" }, // Hide on extra small screens
            borderRight: 1,
            borderColor: "grey.300",
            display: { xs: "none", lg: "block" },
          }}
        >
          <>
            {/* AppBar with Hamburger Menu */}
            <AppBar position="static" sx={{ backgroundColor: "#1E1E2F" }}>
              <Toolbar>
                <IconButton color="inherit" onClick={toggleSidebar}>
                  <RxHamburgerMenu />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ flexGrow: 1, marginLeft: 16 }} // 2 * 8 = 16px
                >
                  Chats
                </Typography>
                <Tooltip title="Notifications">
                  <IconButton color="inherit">
                    <Badge badgeContent={3} color="error">
                      <FaBell />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </AppBar>
            {/* Drawer (Sidebar) */}
            <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
              <div
                style={{
                  width: 280,
                  backgroundColor: "#1E1E2F",
                  height: "100%",
                }}
              >
                <IconButton
                  style={{ margin: 8, color: "white" }}
                  onClick={toggleSidebar}
                >
                  <FaTimes />
                </IconButton>

                {/* Profile Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "16px 0",
                  }}
                >
                  <Avatar
                    src="src/assets/placeholder-user.jpg"
                    sx={{ width: 80, height: 80, marginBottom: 8 }}
                  />
                  <Typography variant="h6" color="white">
                    Jessica Lee
                  </Typography>
                  <Typography variant="body2" color="gray">
                    Online
                  </Typography>
                </div>

                <Divider sx={{ borderColor: "#2C2C3D" }} />

                {/* Sidebar Navigation */}
                <List sx={{ color: "white" }}>
                  <ListItemButton onClick={handleCreateGroup}>
                    <ListItemIcon sx={{ color: "white" }}>
                      <FaPlus />
                    </ListItemIcon>
                    <ListItemText primary="Create Group" />
                  </ListItemButton>

                  <ListItemButton onClick={handleAddFriend}>
                    <ListItemIcon sx={{ color: "white" }}>
                      <FaUserPlus />
                    </ListItemIcon>
                    <ListItemText primary="Add Friend" />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon sx={{ color: "white" }}>
                      <UsersRound />
                    </ListItemIcon>
                    <ListItemText primary="My Group" />
                  </ListItemButton>

                  <ListItemButton>
                    <ListItemIcon sx={{ color: "white" }}>
                      <FaCog />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>

                  <Divider sx={{ borderColor: "#2C2C3D", marginY: 1 }} />

                  <ListItemButton>
                    <ListItemIcon sx={{ color: "red" }}>
                      <FaSignOutAlt />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </List>
              </div>
            </Drawer>
            {/* Search Bar and Chat List */}
            <div style={{ padding: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <IoIosSearch
                  style={{ color: "gray", marginRight: 8, fontSize: 20 }}
                />
                <input
                  type="text"
                  placeholder="Search Conversations"
                  style={{
                    width: "100%",
                    padding: 8,
                    border: "1px solid black",
                    borderRadius: 4,
                    outline: "none",
                    borderColor: "black",
                  }}
                />
              </div>

              {/* Chat List */}
              <div style={{ marginTop: 16 }}>
                {chatData.map((chat, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 12,
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onClick={() => handleSelectedChat(chat)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <Avatar
                      src="src/assets/placeholder-user.jpg"
                      sx={{ width: 48, height: 48 }}
                    />
                    <div style={{ marginLeft: 12, flex: 1 }}>
                      <Typography variant="body1" fontWeight="bold">
                        {chat?.userInfo.fullName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {chat?.lastMessage}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {chatselect?.userId > 0 ? (
            <>
              {/* Chat header */}
              <AppBar position="static" color="inherit" elevation={1}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Avatar
                    sx={{ width: 40, height: 40, mr: 2 }}
                    src="src/assets/placeholder-user.jpg"
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
                    >
                      {chatselect?.userInfo?.fullName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          backgroundColor: "green",
                          borderRadius: "50%",
                          marginRight: 4,
                        }}
                      ></span>
                      Online
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton color="inherit">
                    <Phone />
                  </IconButton>
                  <IconButton color="inherit">
                    <Videocam />
                  </IconButton>
                  <IconButton color="inherit">
                    <MoreVert />
                  </IconButton>
                </Toolbar>
              </AppBar>

              {/* Chat messages */}
              <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
                <List>
                  {chatselect?.messages?.map((message, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        justifyContent:
                          message.sender === "self" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor:
                            message.sender === "self"
                              ? "primary.main"
                              : "grey.200",
                          color:
                            message.sender === "self"
                              ? "primary.contrastText"
                              : "text.primary",
                          maxWidth: "80%", // Limit message width
                        }}
                      >
                        <ListItemText
                          primary={message.text}
                          secondary={message.time}
                          secondaryTypographyProps={{
                            sx: {
                              textAlign:
                                message.sender === "self" ? "right" : "left",
                              color:
                                message.sender === "self"
                                  ? "white"
                                  : "text.secondary", // Change color for self
                            },
                          }}
                        />
                      </Paper>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Emoji picker */}
              {emoji && (
                <Box sx={{ position: "absolute", bottom: 80, left: 10 }}>
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </Box>
              )}

              {/* Chat input */}
              <Paper
                component="form"
                onSubmit={handleSendMessage}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  borderTop: 1,
                  borderColor: "grey.300",
                  position: "relative",
                }}
              >
                <IconButton onClick={() => setEmoji(!emoji)}>
                  <EmojiEmotions />
                </IconButton>
                <TextField
                  variant="outlined"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  sx={{ flex: 1, mx: 1 }}
                  inputProps={{
                    style: { fontSize: { xs: "0.9rem", sm: "1rem" } },
                  }} // Responsive font size
                />
                <Button type="submit" variant="contained" color="primary">
                  <SendIcon />
                </Button>
              </Paper>
            </>
          ) : (
            // Default view when no chat is selected
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <FaComments size={72} color="#ccc" />
              <Typography variant="h5" color="textSecondary">
                Select a chat to start messaging
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default App;
