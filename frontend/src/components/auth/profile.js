import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import CategoryFilter from '../common/category-filter';
import SubCategoryFilter from '../common/sub-category-filter';
import { useUser } from '../../context/user';
import Enquiries from '../users/enquiries';


const useStyles = makeStyles({
  paper: {
    maxWidth: '500',
    margin: 'auto',
  },
  root: {
    marginTop: 30
  },
  title: {
    textAlign: 'center'
  },
  error: {
    color: 'red'
  },
});

const Profile = ({ isSignup }) => {
  const { methods:  { signUp, isAdmin, updateProfile }, data: { currentUser } } = useUser();
  const [category, setCategory] = useState((currentUser.category && currentUser.category.id) || 0);
  const [subCategory, setSubCategory] = useState((currentUser.sub_category && currentUser.sub_category.id) || 0);
  let validationSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().email().required("Email is required"),
    country: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    category: yup.number().test('Categpru-test', 'Category is required when role is no a admin', 
      function(value) {
        return isAdmin() || value !== 0;
      }),
    sub_category: yup.number().test('SubCategory-test', 'SubCategory is required when role is not a admin', 
      function(value) {
        return isAdmin() || value !== 0;
      }),
  });

  if(isSignup)
  {
    validationSchema = yup.object().shape({
      first_name: yup.string().required("First Name is required"),
      last_name: yup.string().required("Last Name is required"),
      email: yup.string().email().required("Email is required"),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      password: yup.string().min(8).required('Password is required'),
      passwordRepeat: yup.string().required("Required").min(8).oneOf([yup.ref('password')], 'Passwords must match'),
      category: yup.number().test('Categpru-test', 'Category is required when role is no a admin', 
        function(value) {
          return isAdmin() || value !== 0;
        }),
      sub_category: yup.number().test('SubCategory-test', 'SubCategory is required when role is not a admin', 
        function(value) {
          return isAdmin() || value !== 0;
        }),
    });
  }
  const { handleSubmit, control, errors, setValue, register } = useForm({
    validationSchema,
    defaultValues: {
      ...currentUser,
      category: (currentUser.category && currentUser.category.id) || 0,
      sub_category: (currentUser.sub_category && currentUser.sub_category.id) || 0,
    }
  });
  const classes = useStyles();
  useEffect(() => {
    register({ name: 'category' });
    register({ name: 'sub_category' });
  }, [register]);
  const handleChangeCategory = category => {
    setCategory(category);
    setValue('category', category);
  };
  
  const handleSubCategoryChange = subCategory => {
    setSubCategory(subCategory);
    setValue('sub_category', subCategory);
  }
  
  const submit = (values) => {
    if (isSignup) {
      signUp(values);
    } else { 
      updateProfile(values);
    }
  }

  if(!currentUser.id && !isSignup) {
    return <CircularProgress />
  }
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          {!isSignup ? "User Profile" : "Sign Up"}
        </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <Paper style={{padding: '20px', width: '500px'}} className={classes.paper}>
            <Grid spacing={4} container >
              <Grid item xs={6}>
                <Controller
                  name="first_name"
                  control={control}
                  as={
                    <TextField
                      type="text"
                      label="First Name"
                      fullWidth
                      defaultValue={currentUser.first_name}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />}
                />
                <p className={classes.error}>{errors.first_name && errors.first_name.message}</p>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="last_name"
                  control={control}
                  as={
                    <TextField
                      type="text"
                      label="Last Name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                      defaultValue={currentUser.last_name}
                      fullWidth
                    />}
                />
                <p className={classes.error}>{errors.last_name && errors.last_name.message}</p>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  as={
                    <TextField
                      type="email"
                      label="Email"
                      defaultValue={currentUser.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />}
                />
                <p className={classes.error}>{errors.email && errors.email.message}</p>
              </Grid>
              {isSignup ? <>
                <Grid item xs={6}>
                  <Controller
                    name="password"
                    control={control}
                    as={
                      <TextField
                        type="password"
                        label="Password"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />}
                  />
                  <p className={classes.error}>{errors.password && errors.password.message}</p>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="passwordRepeat"
                    control={control}
                    as={
                      <TextField
                        type="password"
                        label="Password Repeat"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyIcon />
                            </InputAdornment>
                          ),
                        }}
                      />}
                  />
                  <p className={classes.error}>{errors.passwordRepeat && errors.passwordRepeat.message}</p>
                </Grid> 
              </> : null }
              <Grid item xs={6}>
                <CategoryFilter
                  variant="" 
                  defaultValue={category}
                  defaultText="Select Category"
                  error={errors.category}
                  onChangeHanlder={handleChangeCategory}
                />
                <p className={classes.error}>{errors.category && errors.category.message}</p>
              </Grid>
              <Grid item xs={6}>
                <SubCategoryFilter
                  variant=""
                  defaultValue={subCategory}
                  defaultText="Select Sub Category"
                  category={category}
                  onChangeHanlder={handleSubCategoryChange}
                />
                <p className={classes.error}>{errors.sub_category && errors.sub_category.message}</p>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="country"
                  control={control}
                  as={
                    <TextField
                      defaultValue={currentUser.country}
                      type="country"
                      label="Country"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                    />}
                />
                <p className={classes.error}>{errors.country && errors.country.message}</p>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="city"
                  control={control}
                  as={
                    <TextField
                      defaultValue={currentUser.city}
                      type="city"
                      label="City"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                    />}
                />
                <p className={classes.error}>{errors.city && errors.city.message}</p>
              </Grid>

            <Grid item xs={6}>
            {!isSignup ? 
              <Button type="submit" fullWidth variant="contained" color="primary">Update Profile</Button>
              :
              <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>}
            </Grid>
            <Grid item xs={6}>
            {!isSignup ? 
              <Button type="button" fullWidth variant="contained" color="secondary"><Link to='/password-change'>Change Password</Link></Button>
              :
              <Button type="button" fullWidth variant="outlined" color="secondary"><Link to="/login">Login</Link></Button>}
            </Grid>
            </Grid>
          </Paper>
        </form>
        {(isAdmin() || isSignup) ? null : <Enquiries enquiries={currentUser.enquiries} user={currentUser}/>}
    </div>
  )
};

export default Profile;