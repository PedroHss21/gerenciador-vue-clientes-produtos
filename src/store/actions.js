import api from '@/services/api/api.js';

export default {
    loginUser({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            api.post('/login', credentials)
                .then(response => {
                    const token = response.data.token;
                    const user = response.data.user;
                    commit('SET_TOKEN', token);
                    commit('SET_USER', user);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    logoutUser({ commit }) {
        return new Promise((resolve, reject) => {
            api.delete('http://localhost:3400/logout', {
                headers: {
                    'Authorization': localStorage.getItem('userToken')// Pega o token do localStorage
                }
            })
                .then(response => {
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('userInfo');
                    commit('CLEAR_USER_DATA');
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};