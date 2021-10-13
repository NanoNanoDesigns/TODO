import React, { Component } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { List, ListItem, ListItemText, withStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  red,
  orange,
  yellow,
  green,
  blue,
  deepPurple,
} from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: orange,
  },
});

const styles = {
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 400,
  },
  form: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-evenly",
  },
};

// function App() {
//   return <div className="App"></div>;
// }

class App extends React.Component {
  state = {
    exercises: [],
    title: " ",
  };

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });

  handleCreate = (e) => {
    e.preventDefault();
    if (this.state.title) {
      this.setState(({ exercises, title }) => ({
        exercises: [...exercises, { title, id: Date.now() }],
        title: "",
      }));
    }
  };

  handleDelete = (id) =>
    this.setState(({ exercises }) => ({
      exercises: exercises.filter((ex) => ex.id !== id),
    }));

  render() {
    const { title, exercises } = this.state;
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
          {" "}
          {/*did I wrap this correctly?*/}
          <Typography variant="h1" align="center" gutterBottom>
            TODO
          </Typography>
          <form onSubmit={this.handleCreate}>
            <TextField
              name="title"
              label="Task"
              value={title}
              onChange={this.handleChange}
              margin="normal"
            />
            <Button type="submit" color="primary" variant="contained">
              {" "}
              Create{" "}
            </Button>
          </form>
          <List>
            {exercises.map(({ id, title }) => (
              <ListItem key={id}>
                <ListItemText primary={title} />
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    onClick={() => this.handleDelete(id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
