import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { useCategory } from '../../context/category';
// import EditDialog from './edit';
import ConfirmDialog from '../common/confirm';
import CategoryCreate from './create';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 40,
  },
  loader: {
    margin: 'auto',
    height: '300px'
  },
  delete: {
    color: 'red',
  }
});
const Categories = () => {
  const classes = useStyles();
  const { data: { categories, loading }, methods: { getSubCategories } } = useCategory();
  const [category, setCategory] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const editCategory = (category) => {
    setCategory(category);
    setOpenEdit(true);
  }

  const openDeleteCategory = (category) => {
    setCategory(category);
    setOpenDelete(true);
  }

  const handleDeleteCategory = () => {
    deleteCategory(category.id);
  }

  const closeEdit = () => setOpenEdit(false);
  const closeDelete = () => setOpenDelete(false);
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={classes.root}>
      <Typography>
        Sub Categories
      </Typography>
      <ConfirmDialog 
        open={openDelete}
        handleAction={handleDeleteCategory}
        handleClose={closeDelete}
        title="Delete Category"
        message={`Are you sure to delete the category "${category && category .name || ""}"`}
      />
      <EditDialog open={openEdit} handleClose={closeEdit} category={category} />
      <CategoryCreate />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  No
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            {!loading ? <TableBody>
              {categories.map((category, i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    {i}
                  </TableCell>
                  <TableCell>
                    {category.name}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => openDeleteCategory(category)}>
                      <DeleteIcon className={classes.delete}/>
                    </IconButton>
                    <IconButton onClick={() => editCategory(category)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> :
            <div className={classes.loader}>
              <CircularProgress/>
            </div> }
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default Categories;