import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { __RouterContext as RouterContext } from 'react-router';
import queryString from 'query-string';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import moment from 'moment';
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function getMoment(time) {
  return moment(time, 'DD-MM-YYYYTHH:mm');
}

function formatDateTime(startTime) {
  return getMoment(startTime).format('LLL');
}

function AppointmentList() {
  const router = useContext(RouterContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const searchParams = queryString.parse(router.location.search);
  const initialDate = searchParams.selectedDate
    ? searchParams.selectedDate
    : null;
  console.log(router);
  console.log(router.location);
  console.log(router.location.search);
  console.log(initialDate);

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = date => {
    setSelectedDate(date);
    router.history.push({
      pathname: '/appointments',
      search: `?selectedDate=${date.toISOString()}`,
    });
  };

  useEffect(() => {
    async function fetchAppointments() {
      const result = await axios(
        'http://localhost:3003/appointments?_expand=client&_sort=appointment_start&_order=asc',
      );
      setAppointments(result.data);
      setLoading(false);
    }
    fetchAppointments();
  }, []);

  const appointmentsToRender = appointments.filter(appointment => {
    if (selectedDate === null) return true;
    return getMoment(appointment.appointment_start).isSame(selectedDate, 'day');
  });

  return (
    <div className={classes.root}>
      {renderDatePicker(selectedDate, handleDateChange)}
      <List component="nav" aria-label="main appointments">
        {loading && 'Loading...'}
        {!loading &&
          appointmentsToRender.length === 0 &&
          'No appointments for selected date'}
        {appointmentsToRender.map(appointment => (
          <React.Fragment key={appointment.id}>
            {renderListItem(appointment, classes)}
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

function renderDatePicker(selectedDate, handleDateChange) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="DD.MM.YYYY"
        margin="normal"
        id="date-picker-inline"
        label="Filter by starting date"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

function renderListItem(appointment, classes) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={formatDateTime(appointment.appointment_start)}
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
  );
}

export default AppointmentList;
