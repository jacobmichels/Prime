import { Box } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./Pages/About";
import Games from "./Pages/Games";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Questions from "./Pages/Questions";
import Register from "./Pages/Register";

interface AuthContextInterface {
  username: string;
  setUsername: (a: string) => void;
}

export const AuthContext = React.createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

function App() {
  const [username, setUsername] = useState<string>("");

  const initialValues: AuthContextInterface = {
    setUsername: setUsername,
    username: username,
  };

  return (
    <AuthContext.Provider value={initialValues}>
      <Router>
        <Box margin="auto">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
