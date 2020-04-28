import axios from 'axios';

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: 'https://bw-dev-desk.herokuapp.com'
  });
};
