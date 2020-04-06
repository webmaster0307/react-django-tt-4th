import React, { useState } from 'react';
import { Paper, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../../context/user';

const useStyles = makeStyles({
  root: {
    width: 500,
    marginTop: 40,
    marginBottom: 40,
    margin: 'auto',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
  },
  info: {
    marginBottom: 30
  },
  addButton: {
    marginRight: 30
  }
});
export const CategoryCreate = ({ userId }) => {
  const { methods: { sendEnquiery } } = useUser();
  const classes = useStyles();
  const [content, setContent] = useState();
  const handleContentChange = (e) => setContent(e.target.value);
  const handleSubmit = () => {
    if (content.length < 50) {
      return;
    }
    sendEnquiery(userId, content);
    setContent("");
  }
  return (
    <Paper className={classes.root}>
      <TextField
        className={classes.content}
        rows={8} multiline
        type="text"
        value={content}
        onChange={handleContentChange}
        placeholder="Enter your enquiry."/>
      <Typography className={classes.info}>Minimum 50 characters</Typography>
      <Button color="primary" variant="contained" className={classes.addButton} onClick={handleSubmit}>Send a message</Button>
      <Button color="secondary" variant="contained" onClick={() => setContent("")}>Clear</Button>
    </Paper>
  )
};

export default CategoryCreate;