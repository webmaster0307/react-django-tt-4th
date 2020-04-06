import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PostEnquiry from './post-enquiry';
import { useUser } from '../../context/user';

const useStyles = makeStyles({
  paper: {
    marginTop: 10,
    padding: 10
  },
  root: {
    marginTop: 30,
    width: 500,
    margin: 'auto',

  },
  title: {
    textAlign: 'center'
  },
  label: {
    fontWeight: 600,
  },
  enquiry: {
    textAlign: 'left',
    fontSize: 15,
    wordBreak: 'break-all'
  },
});

const Enquiries = ({ enquiries, user }) => {
  const { data: { currentUser } } = useUser();
  const classes = useStyles();
  if(!enquiries.length) {
    return (<div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          No Enquiries Found
      </Typography>
      {(user.id === currentUser.id) ? null : <PostEnquiry userId={user.id}/> }
    </div>)
  }
  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom className={classes.title}>
          Enquiries
        </Typography>
        {enquiries.filter(enquiry => enquiry).map(enquiry => (
          <Paper key={enquiry.id} className={classes.paper}>
            <Typography variant="h5" component="h1" color="primary" gutterBottom className={classes.enquiry}>
            {enquiry.content}
            </Typography>
          </Paper>
        )) 
        }
       {(user.id === currentUser.id) ? null : <PostEnquiry userId={user.id}/> }
    </div>
  )
};

export default Enquiries;