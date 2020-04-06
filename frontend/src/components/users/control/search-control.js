import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

import { useUser } from '../../../context/user';

const useStyles = makeStyles({
  root: {
    marginTop: '12px',
    marginLeft: '15px',
  },
});

const UserControl = () => {
  const classes = useStyles();
  const { methods: { getUsers }, data: { params } } = useUser();
  const [search, setSearch] = useState(params.search || "");
  const handleKeyDown = e => {
    const { keyCode } = e;
    if (keyCode === 13) {
      getUsers({...params, search, page: 0 })
    }
  };

  const handleChange = (e) => setSearch(e.target.value);
  return (
    <TextField
        id="input-with-icon-textfield"
        label="Search Users"
        className={classes.root}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={search}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
    />
  )
}

export default UserControl;