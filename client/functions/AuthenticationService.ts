import axios from 'axios';

// export const executeRegisterService = (username, password, name, birth, phone, postcode, address1, address2) => {
//   return axios.put('/register', {
//     username,
//     password,
//     name,
//     birth,
//     phone,
//     postcode,
//     address1,
//     address2,
//   });
// };

export const executeJwtAuthenticationService = (username: string, password: string) => {
  // return axios.post('/authenticate', {
  return axios.post('/authenticate', {
    username,
    password,
  });
};

export const executeHelloService = () => {
  setupAxiosInterceptors();
  console.log('===executeHelloService===');
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + '/hello')
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export const registerSuccessfulLoginForJwt = (authority: string, token: string, userId: string) => {
  sessionStorage.setItem('authority', authority);
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userId', userId);
  setupAxiosInterceptors();
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = 'ShinSeungWoo ' + token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};

export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('authority');
  sessionStorage.removeItem('userId');
};

export const isUserLoggedIn = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    return true;
  }
  return false;
};

export const getLoggedInUserName = () => {
  let user = sessionStorage.getItem('userId');
  if (user === null) return '';
  return user;
};
