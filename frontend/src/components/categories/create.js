import React, { useState } from 'react';
import { Paper, Button, TextField, DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCategory } from '../../context/category';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
  name: {

  },
  addButton: {
    marginRight: 30
  }
});
export const CategoryCreate = ({ open, handleClose}) => {
  const classes = useStyles();
  const [name, setName] = useState();
  const { methods: { createCategory } } = useCategory();
  const handleNameChange = (e) => setName(e.target.value);
  const handleCreateCategory = () => {
    createCategory(name);
    handleClose();
  }

  return (
    <Dialog open={open}>
      <DialogTitle id="form-dialog-title" className={classes.root}>
        Create Category
      </DialogTitle>
      <DialogContent>
        <TextField className={classes.name} fullWidth type="text" value={name} onChange={handleNameChange} placeholder="Category Name"/>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" className={classes.addButton} onClick={handleCreateCategory}>Create</Button>
        <Button color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
};

export default CategoryCreate;