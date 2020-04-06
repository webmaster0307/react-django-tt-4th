import React, { useEffect } from 'react';
import { useCategory } from '../../context/category'
import { 
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
}));

const SubCategoryFilter = ({ defaultValue = 0, variant="outlined", defaultText="All Sub Categories", error, category = 0, onChangeHanlder = () => {}}) => {
  const classes = useStyles();
  const [subCategory, setSubCategory] = React.useState(defaultValue);
  const { data: { subCategories, categories }, methods: { getSubCategories } } = useCategory();

  useEffect(() => {
    if(!subCategories.length) {
      getSubCategories();
    }
  }, []);

  useEffect(() => {
    if ((!subCategories.filter(sub => sub.category.id === category).some(sub => subCategory === sub.id))) {
      setSubCategory(0);
    }
  }, [category]);

  useEffect(() => {
    setSubCategory(defaultValue);
  }, [defaultValue]);

  const handleChange = event => {
    setSubCategory(event.target.value);
    onChangeHanlder(event.target.value);
  };

  const categorySubCategories = subCategories.filter(subCategory => subCategory.category.id === category || !category);
  const getSubCategory = () => {
    if(!categories.some(cat => cat.id === category)) {
      return 0;
    }
    if(categorySubCategories.some(sub => sub.id === subCategory)) {
      return subCategory;
    }
    return 0;
  }
  return (
    <FormControl variant={variant} className={classes.formControl}>
      <InputLabel id="sub-category-filter-label">Sub Category</InputLabel>
      <Select
        value={getSubCategory()}
        onChange={handleChange}
        label="Sub Category"
        labelId="sub-category-filter-label"
        id="sub-category-filter-filled"
        error={error}
      >
        <MenuItem value={0}>
          {defaultText}
        </MenuItem>
        {categorySubCategories.map(subCategory => <MenuItem key={subCategory.id} value={subCategory.id}>
          {subCategory.name}
        </MenuItem>)}
      </Select>
    </FormControl>
  )
}

export default SubCategoryFilter;