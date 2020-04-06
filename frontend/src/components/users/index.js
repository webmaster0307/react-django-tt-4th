import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableContainer,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useUser } from '../../context/user';
import DeleteConfirm from '../common/confirm';
import UserTableHeader from './table-header';
import UserControl from './control';
import { ROLE_MAP } from '../../utils/constants/role';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  loader: {
    margin: 'auto',
    height: '300px'
  },
  delete: {
    color: 'red',
  }
});
const Users = () => {
  const classes = useStyles();
  const { data: { users, loading, count, params, params: { page }, currentUser }, methods: { getUsers, deleteUser, isAdmin } } = useUser();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUsers(params);
  }, []);
  const handleChangePage = (e, pageNumber) => {
    getUsers({...params, page: pageNumber });
  }
  const confirmDeleteUser = (user) => {
    setOpen(true);
    setUser(user);
  }

  const handleUserDelete = () => {
    deleteUser(user.id)
    .then(() => {
      getUsers(params);
    });
  }
  const handleCancelUserDelete = () => {
    setOpen(false);
    setUser({});
  } 

  const getPage = () => Math.min(page, Math.ceil(count / 10) - 1);

  const renderActions = (user) => {
    const shouldRender = isAdmin();
    if(!shouldRender) {
      return null;
    }
    if(user.id === currentUser.id) {
      return (
        <TableCell>
          <IconButton>
            <Link to={`/profile`}><EditIcon color="primary"/></Link>
          </IconButton>
      </TableCell>
      )
    }
    return (
      <TableCell>
        <IconButton onClick={() => confirmDeleteUser(user)}>
          <DeleteIcon className={classes.delete} />
        </IconButton>
        <IconButton>
        <Link to={`/users/${user.id}`}><EditIcon color="primary"/></Link>
        </IconButton>
      </TableCell>
    )
  }

  const renderEmail = (user) => {
    if(currentUser.id !== user.id) {
      return (
        <TableCell>
          <Link to={`/users/${user.id}`}>{user.email}</Link>
        </TableCell>
      )
    } else {
      return (
        <TableCell>
          <Link to={`/profile`}>{user.email}</Link>
        </TableCell>
      )
    }
  }
  return (
    <div>
      <UserControl/>
      <DeleteConfirm
        open={open}
        message={`Are you sure to delete user "${user.first_name || ""} ${user.last_name || ""}"`}
        handleClose={handleCancelUserDelete}
        handleAction={handleUserDelete}
        />
      <Paper className={classes.root}>
        <TableContainer>
          <Table>
            <UserTableHeader/>
            {!loading ? <TableBody>
              {users.map((user, i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{i + 1}</Link>
                  </TableCell>
                  {isAdmin() ? renderEmail(user) : null}
                  <TableCell>
                    {user.first_name}
                  </TableCell>
                  <TableCell>
                    {user.last_name}
                  </TableCell>
                  <TableCell>
                    {user.country}
                  </TableCell>
                  <TableCell>
                    {user.city}
                  </TableCell>
                  {isAdmin() ? <TableCell>
                    {ROLE_MAP[user.role] || ""}
                  </TableCell> : null }
                  <TableCell>
                    {(user.category && user.category.name) || ""}
                  </TableCell>
                  <TableCell>
                    {(user.sub_category && user.sub_category.name) || ""}
                  </TableCell>
                  {renderActions(user)}
                </TableRow> 
              ))}
            </TableBody> :
            <div className={classes.loader}>
              <CircularProgress/>
            </div> }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={count}
          rowsPerPage={10}
          page={getPage()}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  )
}

export default Users;