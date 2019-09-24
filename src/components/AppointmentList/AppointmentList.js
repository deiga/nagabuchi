import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function formatDateTime(start_time) {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(start_time);
}

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchAppointments() {
      const result = await axios(
        'http://localhost:3003/appointments?_expand=client',
      );
      setAppointments(result.data);
    }
    fetchAppointments();
  }, []);

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main appointments">
        {appointments.map(appointment => (
          <React.Fragment key={appointment.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`Appointment ${formatDateTime(
                  appointment.appointment_start,
                )}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {appointment.client.first_name +
                        ' ' +
                        appointment.client.last_name}
                    </Typography>
                    {' – ' + appointment.client.address}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default AppointmentList;
