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
    },
    // Adiciona um novo produto ao estado
    ADD_PRODUTO(state, produto) {
        state.produtos.push(produto);
    },

    // Atualiza um produto existente no estado
    UPDATE_PRODUTO(state, updatedProduto) {
        const index = state.produtos.findIndex(p => p.id === updatedProduto.id);
        if (index !== -1) {
            state.produtos.splice(index, 1, updatedProduto);
        }
    },

    // Define o estado com a lista de produtos
    SET_PRODUTOS(state, produtos) {
        state.produtos = produtos;
    },

    // Remove um produto do estado
    DELETE_PRODUTO(state, produtoId) {
        state.produtos = state.produtos.filter(p => p.id !== produtoId);
    },

};
