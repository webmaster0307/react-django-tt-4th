import Axios from '../../utils/axios';

export const getUsers = async ({ page, search, category, subCategory, role }) => {
    const params = {
        offset: page * 10,
        search,
    };
    if (role && role !== 0) params.role = role;
    if (category && category !== 0) params.category = category;
    if (subCategory && subCategory !== 0) params.sub_category = subCategory;
    return Axios({
        method: 'GET',
        url: '/users/',
        params,
    }, true);
};

export const createUser = async(payload) => {
  const data = {
    ...payload,
    sub_category: payload.sub_category || null,
    category: payload.category || null,
  }
  return Axios({
    method: 'POST',
    url: '/users/',
    data,
  }, true)
}

export const login = async data => Axios({
  method: 'POST',
  url: '/token/',
  data,
});

export const getProfile = async data => Axios({
  method: 'GET',
  url: '/profile/',
  data,
}, true)

export const sendEnquiry = async (owner, content) => Axios({
  method: 'POST',
  url: '/enquiries/',
  data: {
    owner,
    content,
  },
}, false);


export const getUser = async id => Axios({
  method: 'GET',
  url: `/users/${id}/`,
  data: { id },
}, true);

export const deleteUser = async id => Axios({
  method: 'DELETE',
  url: `/users/${id}/`,
  data: { id },
}, true);

export const updateUser = async (id, params) => {
  const data = { ...params };
  if(params.sub_category === 0) {
    data.sub_category = null;
  }
  if(data.category == 0) {
    data.category = null;
  }
  return Axios({
    method: 'PATCH',
    url: `/users/${id}/`,
    data,
  }, true);
}

export const updateProfile = async payload => {
  if (payload.sub_category === 0) {
    payload.sub_category = null;
  }
  if (payload.category === 0) {
    payload.category = null;
  }
  return Axios({
  method: 'PATCH',
  url: `/profile/`,
  data: payload,
}, true)
};

export const changePassword = async data => Axios({
  method: 'POST',
  url: '/change-password/',
  data,
}, true)

export const signUp = async data => Axios({
  method: 'POST',
  url: '/signup/',
  data,
})