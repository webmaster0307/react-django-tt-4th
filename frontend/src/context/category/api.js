import Axios from '../../utils/axios';

export const getCategories = async () => 
  Axios({
      method: 'GET',
      url: '/category/',
  });

export const updateCategory = async (id, name) =>
  Axios({
    method: 'PUT',
    url: `/category/${id}/`,
    data: {
      name,
    }
  }, true);

export const getSubCategories = async () => 
  Axios({
      method: 'GET',
      url: '/sub-category/',
  });

export const deleteCategory = async (id) => 
  Axios({
      method: 'DELETE',
      url: `/category/${id}/`,
  }, true);

export const deleteSubCategory = async (id) => 
  Axios({
      method: 'DELETE',
      url: `/sub-category/${id}/`,
  }, true);

export const createCategory = async (name) => 
  Axios({
      method: 'POST',
      url: `/category/`,
      data: {
        name
      }
  }, true);

export const createSubCategory = async (category, name) =>
  Axios({
    method: 'POST',
    url: `/sub-category/`,
    data: {
      category,
      name
    }
  }, true);

export const updateSubCategory = async (id, name) =>
  Axios({
    method: 'PATCH',
    url: `/sub-category/${id}/`,
    data: {
      name,
    }
  }, true);
