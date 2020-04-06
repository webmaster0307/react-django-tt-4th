import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchControl from './search-control';
import CategoryFilter from '../../common/category-filter';
import SubCategoryFilter from '../../common/sub-category-filter';
import { useUser } from '../../../context/user';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '30px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  category: {
    width: 200,
    marginRight: 15
  },
  subCategory: {
    width: 200,
    marginRight: 15,
  },
  link: {
    color: '#fff',
    textDecoration : 'none'
  },
  control: {
    display: 'flex',
  }
});

const UserControl = () => {
  const classes = useStyles();
  const { data: { params, params: { category, subCategory } }, methods: { getUsers, isAdmin } } = useUser();

  const handleCategoryChange = (selectedCategory) => {
    getUsers({...params, category: selectedCategory, subCategory: 0})
  }
  const handleSubCategoryChange = (selectedSubCategory) => {
    getUsers({...params, subCategory: selectedSubCategory})
  }
  return (
    <div className={classes.root}>
      <div>
        {isAdmin() ? <Button color="primary" variant="contained"><Link to='/users/new' className={classes.link}>Add New User</Link></Button> : null}
      </div>
      <div className={classes.control}>
        <div className={classes.category}>
          <CategoryFilter defaultValue={category} onChangeHanlder={handleCategoryChange}/>
        </div>
        <div className={classes.subCategory}>
          <SubCategoryFilter defaultValue={subCategory} category={category} onChangeHanlder={handleSubCategoryChange}/>
        </div>
        <SearchControl />
      </div>
    </div>
  )
}

export default UserControl;