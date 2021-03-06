import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useCategory } from '../../context/category';
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});
export default function FormDialog({ open, handleClose, category }) {
  const { methods: { updateCategory } } = useCategory();
  const classes = useStyles();
  const [name, setName] = useState();
  const handleNameChange = (e) => setName(e.target.value);
  const handleSave = () => {
    if (!name) {
      return;
    }
    updateCategory(category.id, name);
    handleClose();
  }

  useEffect(() => {
    setName((category && category.name) || "");
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
      <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
      <DialogContent className={classes.root} >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Category Name"
          type="text"
          onChange={handleNameChange}
          value={name}
          defaultValue={(category && category.name) || ""}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
