import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import AppointmentList from './components/AppointmentList';
import TopBar from './components/TopBar';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <CssBaseline />
      <TopBar />
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/appointments" component={Appointments} />
      </div>
    </Router>
  );
}

function Home() {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '90%',
    },
  }));

  const classes = useStyles();

  return (
    <section className={classes.root}>
      <h2>Home</h2>
      Go to <Link to="/appointments">Appointments</Link>
      <p>
        The challenge is to write a fictional client-server calendar app that
        shows appointments that cliënts have made at our store. The main user is
        the store employee that uses this app to view, change and book
        appointments. Please read this document carefully before getting
        started.
      </p>
      <p>
        The front end should be a React application. You can use
        `create-react-app` to get started quickly. Feel free to come up with
        your own design and implement it with or without an existing UI library.
        For the back end we're looking for a REST api written as a server in
        NodeJS.
      </p>
      <p>
        When your done, delete node_modules folder and zip your project. Please
        send it back to us via email with instructions on how to run the
        application.
      </p>
      <p>
        Complete as many requirements as you can, as long as the requirements
        that you pick are working properly and are well written. We're looking
        for clean, simple and understandable code and complete features.
      </p>
      <h3>Requirements front end:</h3>
      <ul>
        <li>Show a list of appointments.</li>
        <li>
          Allow the user to filter the appointments by start and end date. Keep
          the filters if the url is copied to another window.
        </li>
        <li>
          If an appointment is clicked, the user should be taken to the client
          page where his or her details and their current appointments are
          listed. Allow the user to navigate back to the list of appointments.
        </li>
        <li>
          Make it possible to change and save the date of any appointment the
          client has on the client page.
        </li>
        <li>
          Add an option to add a new appointment for an existing client. Allow
          the user to select an existing client from a dropdown.
        </li>
      </ul>
    </section>
  );
}

function Appointments() {
  return <AppointmentList />;
}

export default App;
