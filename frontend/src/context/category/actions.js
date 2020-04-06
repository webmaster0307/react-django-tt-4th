import { toast } from 'react-toastify';

import * as API from './api';

export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_SUB_CATEGORIES_SUCCESS = 'GET_SUB_CATEGORIES_SUCCESS';
export const CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS';
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
export const CATEGORY_CREATE_SUCCESS = 'CATEGORY_CREATE_SUCCESS';
export const SUB_CATEGORY_CREATE_SUCCESS = 'SUB_CATEGORY_CREATE_SUCCESS';
export const SUB_CATEGORY_DELETE_SUCCESS = 'SUB_CATEGORY_DELETE_SUCCESS';
export const SUB_CATEGORY_UPDATE_SUCCESS = 'SUB_CATEGORY_UPDATE_SUCCESS';

export const getCategories = dispatch => async () => {
  try {
    
    const { data } = await API.getCategories();
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data,
    })
  } catch {

  }
}

export const updateCategory = dispatch => async (id, name) => {
  try {
    const { data } = await API.updateCategory(id, name);
    toast.success("Update Success !");
    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    })
  } catch(e){
    toast.error("Update Failed !");
    console.error("Category Update error ", e);
  }
}

export const getSubCategories = dispatch => async () => {
  try {
    
    const { data } = await API.getSubCategories();
    dispatch({
      type: GET_SUB_CATEGORIES_SUCCESS,
      payload: data,
    })
  } catch {
    
  }
}

export const deleteCategory = dispatch => async (id) => {
  try {
    await API.deleteCategory(id);
    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: id,
    });
    toast.success("Delete Success!");
  } catch (e) {
    console.log("Category Delete Error:", e);
    toast.error("Create Error!");
  }
}

export const deleteSubCategory = dispatch => async (id) => {
  try {
    await API.deleteSubCategory(id);
    dispatch({
      type: SUB_CATEGORY_DELETE_SUCCESS,
      payload: id,
    });
    toast.success("Delete Success!");
  } catch (e) {
    console.log("Category Delete Error:", e);
    toast.error("Create Error!");
  }
}

export const createCategory = dispatch => async (name) => {
  try {
    const { data } = await API.createCategory(name);
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
    toast.success("Create Success!");
  } catch (e) {
    toast.error("Create Error!");
    console.log("Category Create Error:", e)
  }
}

export const updateSubCategory = dispatch => async (categoryId, name) => {
  try {
    const { data } = await API.updateSubCategory(categoryId, name);
    dispatch({
      type: SUB_CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
    toast.success("Update Success!");
  } catch (e) {
    toast.error("Update Error!");
    console.log("Sub Category Update Error:", e)
  }
}

export const createSubCategory = dispatch => async (categoryId, name) => {
  try {
    const { data } = await API.createSubCategory(categoryId, name);
    dispatch({
      type: SUB_CATEGORY_CREATE_SUCCESS,
      payload: { subCategory: data, categoryId },
    });
    toast.success("Create Success!");
  } catch (e) {
    toast.error("Create Error!");
    console.log("Category Create Error:", e)
  }
}