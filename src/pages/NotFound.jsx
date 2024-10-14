import { useState, useCallback, startTransition } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Container,
} from "@mui/material";
import { FaHome, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);

  const handleGuess = useCallback(() => {
    startTransition(() => {
      const guessNum = parseInt(guess, 10);
      setAttempts((prev) => prev + 1);

      if (isNaN(guessNum)) {
        setMessage("Please enter a valid number.");
      } else if (guessNum === targetNumber) {
        setMessage(
          `Congratulations! You guessed the number in ${attempts + 1} attempts.`
        );
        setGameWon(true);
      } else if (guessNum < targetNumber) {
        setMessage("Too low! Try a higher number.");
      } else {
        setMessage("Too high! Try a lower number.");
      }
      setGuess("");
    });
  }, [guess, attempts, targetNumber]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        paddingX: 2,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: "6rem",
          fontWeight: "bold",
          color: "grey.900",
          marginBottom: 2,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h2"
        component="p"
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "grey.700",
          marginBottom: 2,
        }}
      >
        Oops! Page not found
      </Typography>
      <Typography variant="body1" color="grey.500" sx={{ marginBottom: 4 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Typography>

      <Paper
        elevation={3}
        sx={{ padding: 4, marginBottom: 4, textAlign: "center" }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          While you&apos;re here, play a game!
        </Typography>
        <Typography variant="body1" color="grey.600" sx={{ marginBottom: 2 }}>
          Guess a number between 1 and 100:
        </Typography>
        <Box sx={{ display: "flex", marginBottom: 2 }}>
          <TextField
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            variant="outlined"
            sx={{ flexGrow: 1, marginRight: 2 }}
            disabled={gameWon}
          />
          <Button
            variant="contained"
            onClick={handleGuess}
            disabled={gameWon}
            color="primary"
          >
            Guess
          </Button>
        </Box>
        {message && (
          <Typography
            variant="body2"
            color="blue"
            sx={{ fontWeight: "medium" }}
          >
            {message}
          </Typography>
        )}
        {gameWon && (
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            color="success"
            sx={{ marginTop: 2 }}
          >
            <FaPlay />
            Play Again
          </Button>
        )}
      </Paper>

      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" startIcon={<FaHome />}>
          Back to Homepage
        </Button>
      </Link>
    </Container>
  );
}
