import React from 'react';
import {
  Button,
  Paper,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useUser } from '../../context/user';

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Required").min(8, "Minimun 8 characters"),
  newPassword: yup.string().required("Required").min(8, "Minimun 8 characters").notOneOf([yup.ref("oldPassword")], "Current passoword and new password are same."),
  passwordRepeat: yup.string().required("Required").min(8, "Minimun 8 characters").oneOf([yup.ref("newPassword")], 'Passwords do not match'),
});

const useStyles = makeStyles({
  paper: {
    maxWidth: 400,
    margin: 'auto',
    padding: 30,
  },
  root: {
    marginTop: 30
  },
  title: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 25,
    marginBottom: 30,
  },
  error: {
    color: 'red'
  }
});

const PasswordChange = () => {
  const { methods: { changePassword } } = useUser();
  const history = useHistory();
  const { handleSubmit, control, errors } = useForm({
    validationSchema
  });
  const submit = (values) => {
    changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword });
    history.go(-1);
  }

  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography className={classes.title}>Change Your Password</Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Grid spacing={4} container >
          <Grid item xs={12}>
            <Controller
              name="oldPassword"
              control={control}
              as={
                <TextField
                  type="password"
                  label="Current Password"
                  fullWidth
                />}
            />
            <p className={classes.error}>{errors.oldPassword && errors.oldPassword.message}</p>
            </Grid>
          <Grid item xs={12}>
            <Controller
              name="newPassword"
              control={control}
              as={
                <TextField
                  type="password"
                  label="New Password"
                  fullWidth
                />}
            />
            <p className={classes.error}>{errors.newPassword && errors.newPassword.message}</p>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="passwordRepeat"
              control={control}
              as={
                <TextField
                  type="password"
                  label="Repeat Password"

                  fullWidth
                />}
            />
            <p className={classes.error}>{errors.passwordRepeat && errors.passwordRepeat.message}</p>
          </Grid>
          <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </div>
}

export default PasswordChange;