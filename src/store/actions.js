import api from '@/services/api/api.js';
import axios from 'axios';


export default {
    loginUser({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            api.post('/login', credentials)
                .then(response => {
                    const token = response.data.token;
                    const user = response.data.user;
                    localStorage.setItem('userToken', token);
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
    },

    fetchClientes({ commit }) {
        return axios.get('http://localhost:3400/clientes', {
            headers: {
                'Authorization': localStorage.getItem('userToken')
            }
        })
            .then(response => {
                commit('SET_CLIENTES', response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar clientes:', error);
            });
    },

    createCliente({ commit }, clienteData) {
        return axios.post('http://localhost:3400/clientes', clienteData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('userToken')
            }
        })
            .then(response => {
                commit('ADD_CLIENTE', response.data);
            })
            .catch(error => {
                console.error('Erro ao criar cliente:', error);
            });
    },

    updateCliente({ commit }, clienteData) {
        return axios.put(`http://localhost:3400/clientes/${clienteData.id}`, clienteData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('userToken')
            }
        })
            .then(response => {
                commit('UPDATE_CLIENTE', response.data);
            })
            .catch(error => {
                console.error('Erro ao atualizar cliente:', error);
            });
    },

    deleteCliente({ commit }, clienteId) {
        return axios.delete(`http://localhost:3400/clientes/${clienteId}`, {
            headers: {
                'Authorization': localStorage.getItem('userToken')
            }
        })
            .then(() => {
                commit('DELETE_CLIENTE', clienteId);
            })
            .catch(error => {
                console.error('Erro ao deletar cliente:', error);
            });
    },

    fetchProdutos({ commit }) {
        return axios.get('http://localhost:3400/produtos', {
            headers: {
                'Authorization': localStorage.getItem('userToken')
            }
        })
            .then(response => {
                commit('SET_PRODUTOS', response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
    },

    createProduto({ commit }, produtoData) {
        return axios.post('http://localhost:3400/produtos', produtoData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('userToken')
            }
        })
            .then(response => {
                commit('ADD_PRODUTO', response.data);
            })
            .catch(error => {
                console.error('Erro ao criar produto:', error);
            });
    },

    updateProduto({ commit }, produtoData) {
        return axios.put(`http://localhost:3400/produtos/${produtoData.id}`, produtoData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('userToken')
            }
        })
            .then(response => {
                commit('UPDATE_PRODUTO', response.data);
            })
            .catch(error => {
                console.error('Erro ao atualizar produto:', error);
            });
    },

    deleteProduto({ commit }, produtoId) {
        return axios.delete(`http://localhost:3400/produtos/${produtoId}`, {
            headers: {
                'Authorization': localStorage.getItem('userToken')
            }
        })
            .then(() => {
                commit('DELETE_PRODUTO', produtoId);
            })
            .catch(error => {
                console.error('Erro ao deletar produto:', error);
            });


    }

}