import React from 'react';
import {
  Button,
  Paper,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { useUser } from '../../context/user';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required("Required").min(8)
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
  },
  error: {
    color: 'red'
  },
  signup: {
    marginTop: 20,
  }
});

const Login = () => {
  const { methods: { login } } = useUser();
  const { handleSubmit, control, errors } = useForm({
    validationSchema
  });
  const submit = (values) => {
    login(values);

  }
  const classes = useStyles();
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography className={classes.title}>Login</Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Grid spacing={4} container >
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              as={
                <TextField
                  type="email"
                  label="Email"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />}
            />
            <p className={classes.error}>{errors.email && errors.email.message}</p>
            </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              as={
                <TextField
                  error={errors.password}
                  type="password"
                  label="Password"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />}
            />
            <p className={classes.error}>{errors.password && errors.password.message}</p>
          </Grid>
          <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
      </form>
      <Grid spacing={6} xs={12} className={classes.signup}>
              <Button type="submit" fullWidth variant="outlined" color="secondary"><Link to="/signup">Sign Up</Link></Button>
          </Grid>
    </Paper>
  </div>
}

export default Login;