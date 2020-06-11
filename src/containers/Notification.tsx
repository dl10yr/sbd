import React, { useContext } from 'react';
import { store } from '../store';
import PropTypes from 'prop-types';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';

import NotificationBar from '../components/NotificationBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 10,
    },
  })
);

interface Props {
}


interface IAction {
  type: "increment" | "decrement";
}

const Notification: React.FC<Props> = props => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={state.isOpen}
      autoHideDuration={3000}
      onClose={() => dispatch({ type: "CLOSE_NOTIFICATION", variant: state.variant, message: state.message })}
      className={classes.root}
    >
      <NotificationBar
        onClose={() => dispatch({ type: "CLOSE_NOTIFICATION", variant: state.variant, message: state.message })}
        variant={state.variant}
        message={state.message}
      />
    </Snackbar>
  );
}


export default Notification;