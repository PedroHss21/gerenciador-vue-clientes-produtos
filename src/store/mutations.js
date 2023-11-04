export default {
    // Define a mutação para configurar as informações do usuário
    SET_USER(state, user) {
        state.user = user;
    },

    // Define a mutação para configurar o token do usuário
    SET_TOKEN(state, token) {
        state.token = token;
    },

    // Define a mutação para limpar os dados do usuário e o token
    CLEAR_USER_DATA(state) {
        state.user = null;
        state.token = null;
    },

    // Atualiza o estado com a lista de clientes
    SET_CLIENTES(state, clientes) {
        state.clientes = clientes;
    },
    ADD_CLIENTE(state, cliente) {
        state.clientes.push(cliente);
    },
    UPDATE_CLIENTE(state, updatedCliente) {
        const index = state.clientes.findIndex(c => c.id === updatedCliente.id);
        if (index !== -1) {
            state.clientes.splice(index, 1, updatedCliente);
        }
    },
    DELETE_CLIENTE(state, clienteId) {
        state.clientes = state.clientes.filter(c => c.id !== clienteId);
    }

};
