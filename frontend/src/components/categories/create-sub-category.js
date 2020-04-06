import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCategory } from '../../context/category';

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: 'auto',
    padding: 20,
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
  },
  name: {
    margin: 'auto',
  },
  addButton: {
    marginRight: 30
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  },
  category: {
    fontWeight: "bold",
  }

});
export const SubCategoryCreate = ({ open, handleClose, category}) => {
  const classes = useStyles();
  const [name, setName] = useState();
  const { methods: { createSubCategory } } = useCategory();
  const handleNameChange = (e) => setName(e.target.value);
  const handleSubCreateCategory = () => {
    createSubCategory(category.id, name);
    handleClose()
  }

  return (
    <Dialog open={open}>
      <DialogTitle id="form-dialog-title">
        Create new sub category under the category <span className={classes.category}>{(category && category.name) || ""}</span>
      </DialogTitle>
      <DialogContent className={classes.root}>
        <TextField  fullWidth className={classes.name} type="text" value={name} onChange={handleNameChange} placeholder="Sub Category Name"/>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" className={classes.addButton} onClick={handleSubCreateCategory}>Create</Button>
        <Button color="secondary" variant="contained" onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
};

export default SubCategoryCreate;