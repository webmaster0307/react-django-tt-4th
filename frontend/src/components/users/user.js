import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import GroupIcon from '@material-ui/icons/Group';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import CategoryFilter from '../common/category-filter';
import SubCategoryFilter from '../common/sub-category-filter';
import { useUser } from '../../context/user';
import Enquiries from './enquiries';

const editValidationShape = {
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  country: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  role: yup.number().required("Role is required"),
  category: yup.number().test('Categpru-test', 'Category is required when role is no a admin', 
    function(value) {
      return this.parent.role === 1 || ((value && value > 0) && this.parent.role === 2);
    }),
  sub_category: yup.number().test('SubCategory-test', 'SubCategory is required when role is not a admin', 
    function(value) {
      return this.parent.role === 1 || ((value && value > 0) && this.parent.role === 2);
    }),
}

const createValidationShape = {
  ...editValidationShape,
  password: yup.string().min(8).required('Password is required'),
  passwordRepeat: yup.string().required().min(8).oneOf([yup.ref('password')], 'Passwords must match'),
}

// const validationSchema = yup.object().shape();

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
  }
});

const User = () => {
  const { id } = useParams();
  const creating = id === 'new';
  const validationShape = creating ? createValidationShape : editValidationShape;
  const [category, setCategory] = useState(0);
  const [role, setRole] = useState(0);
  const [sub_category, setSubCategory] = useState(0);
  const { methods:  { createUser, updateUser, getUser }, data: { user: selectedUser } } = useUser();
  const [user, setUser] = useState({});
  const[ loading, setLoading ] = useState(!creating);
  const classes = useStyles();

  const { handleSubmit, control, errors, setValue, register } = useForm({
    validationSchema: yup.object().shape(validationShape),  
  });
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setValue('role', e.target.value);
  };

  useEffect(() => {
    if(!creating) {
      getUser(id)
      .then((data) => {
        setLoading(false)
        setUser(data);
        setValue("first_name", data.first_name);
        setValue("last_name", data.last_name);
        setValue("email", data.email);
        setValue("role", data.role);
        setValue("category", ((data.category  && data.category.id) || 0));
        setCategory((data.category  && data.category.id) || 0);
        setValue("sub_category", ((data.sub_category  && data.sub_category.id) || 0));
        setSubCategory((data.sub_category  && data.sub_category.id) || 0);
        setValue("country", data.country);
        setValue("city", data.city);
        setRole(data.role);
      })
    } else {
      setCategory(0);
      setSubCategory(0);
    }
  }, [id]);

  useEffect(() => {
    if(user.category) {
      setCategory(user.category.id || 0)
    } else {
      setCategory(0);
    }
  }, [user.category])

  useEffect(() => {
    if(user.sub_category) {
      setSubCategory(user.sub_category.id || 0)
    } else {
      setSubCategory(0)
    }
  }, [user.sub_category]);


  useEffect(() => {
    register({ name: 'category' });
    register({ name: 'sub_category' });
    register({ name: 'role' });
  }, [register]);

  const handleChangeCategory = category => {
    setCategory(category);
    setValue('category', category);
  };

  const handleSubCategoryChange = sub_category => {
    setSubCategory(sub_category);
    setValue('sub_category', sub_category);
  }

  const submit = (values) => {
    if(creating) {
      createUser(values);
    } else {
      updateUser(user.id, values)
    }
  }

  if(loading) {
    return <CircularProgress />
  }


  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          {creating ? "Create User" : "Edit User"}
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
                      label="Last Name"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
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
                      fullWidth
                    />}
                />
                <p className={classes.error}>{errors.last_name && errors.last_name.message}</p>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="email"
                  control={control}
                  as={
                    <TextField
                      type="email"
                      label="Email"
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
              <Grid item xs={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    IconComponent={GroupIcon}
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>Regular User</MenuItem>
                  </Select>
                </FormControl>
                <p className={classes.error}>{errors.role && errors.role.message}</p>
              </Grid>
              {creating ? <>
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
                  </> : null}
                <Grid item xs={6}>
                  <CategoryFilter
                    variant=""
                    defaultText="Select Category" 
                    defaultValue={category}
                    error={errors.category}
                    onChangeHanlder={handleChangeCategory}
                  />
                </Grid>
                <Grid item xs={6}>
                  <SubCategoryFilter
                    variant=""
                    defaultValue={sub_category}
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
                      error={errors.country}
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

            <Grid item xs={4}>
              <Button type="submit" fullWidth variant="contained" color="primary">Submit</Button>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
              <Link to="/users/">
                Back to users
              </Link>
            </Grid>
            </Grid>
          </Paper>
        </form>
        {creating ? null : <Enquiries enquiries={selectedUser.enquiries || []} user={user} />}
    </div>
  )
};

export default User;