import produce from 'immer';
import {
  GET_CATEGORIES_SUCCESS,
  GET_SUB_CATEGORIES_SUCCESS,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_CREATE_SUCCESS,
  SUB_CATEGORY_CREATE_SUCCESS,
  SUB_CATEGORY_DELETE_SUCCESS,
  SUB_CATEGORY_UPDATE_SUCCESS,
} from './actions';

import { initialState } from './context';

export default (
  state = initialState,
  action = { type: undefined, payload: undefined }
) => {
  const { type, payload } = action;
  return produce(state, draft => {
    switch(type) {
      case GET_CATEGORIES_SUCCESS:
        draft.categories = payload;
        draft.categoryLoading = false;
        break;
      case GET_SUB_CATEGORIES_SUCCESS:
        draft.subCategories = payload;
        draft.subCategoryLoading = false;
        break;
      case CATEGORY_UPDATE_SUCCESS:
        draft.categories = draft.categories.map(category => category.id === payload.id ? payload : category);
        break;
      case CATEGORY_DELETE_SUCCESS:
        draft.categories = draft.categories.filter(category => category.id !== payload)
        break;
      case CATEGORY_CREATE_SUCCESS:
        draft.categories = draft.categories.concat(payload)
        break;
      case SUB_CATEGORY_CREATE_SUCCESS:
        const category = draft.categories.filter(category => category.id === payload.categoryId)[0] || {};
        draft.subCategories = draft.subCategories.concat({ ...payload.subCategory, category });
        break;
      case SUB_CATEGORY_DELETE_SUCCESS:
        draft.subCategories = draft.subCategories.filter(subCategory => subCategory.id !== payload);
        break;
      case SUB_CATEGORY_UPDATE_SUCCESS:
        draft.subCategories = draft.subCategories.map(
          subCategory => subCategory.id === payload.id ? { ...subCategory, name: payload.name } : subCategory);
        break;
     default:
        break;
    }
  }) 
}