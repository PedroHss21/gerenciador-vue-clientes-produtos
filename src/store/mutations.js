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
    }
};
