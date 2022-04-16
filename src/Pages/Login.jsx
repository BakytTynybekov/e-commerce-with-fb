import { Grid, FormControl, Input, Button, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { GeneralAuthContext } from "../context/GeneralContext";
import { Navigate } from "react-router-dom";
function Login() {
  const [loginInformation, setLoginInformation] = useState({
    email: "",
    password: "",
  });
  const [seePassword, setSeePassword] = useState(false);
  const { loginWithEmail, user, sigUpwithEmailAndPassword } =
    useContext(GeneralAuthContext);
  const handleLogin = () => {
    loginWithEmail(loginInformation.email, loginInformation.password);
  };

  return (
    <div>
      {!user ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl>
                <TextField
                  autoComplete="on"
                  label="Email"
                  variant="outlined"
                  placeholder="Write your Email"
                  value={loginInformation.email}
                  onChange={(e) =>
                    setLoginInformation({
                      ...loginInformation,
                      email: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <TextField
                  type={seePassword ? "text " : "password"}
                  label="Password"
                  variant="outlined"
                  placeholder="Write your password"
                  autoComplete="on"
                  value={loginInformation.password}
                  onChange={(e) =>
                    setLoginInformation({
                      ...loginInformation,
                      password: e.target.value,
                    })
                  }
                />
                <Button onClick={() => setSeePassword(!seePassword)}>
                  See
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <Button variant="contained" onClick={() => handleLogin()}>
                  Login
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </div>
  );
}

export default Login;
