<template>
    <div class="login-background">
    <v-container class="fill-height justify-center align-center">
      <v-card class="pa-10" style="padding: 45px; max-width: 360px;">
        <img src="" class="mb-10" style="width: 270px;">
        <v-card-title class="headline mb-5">Login</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="E-mail" prepend-icon="mdi-email" type="email" required></v-text-field>
            <v-text-field label="Senha" prepend-icon="mdi-lock" type="password" required></v-text-field>
            
            <!-- Espaçamento adicional antes do botão -->
            <div class="mt-5"> <!-- adiciona uma margem superior -->
              <v-btn color="primary" block>Entrar</v-btn> <!-- block faz o botão estender ao máximo da largura -->
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
    </div>
  </template>

<style>

.login-background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/login-background.png');
  background-size: cover;
  background-position: center;
  background-color: #E2E6E9; /* Cor de fundo padrão */
  min-height: 100vh;
  background-repeat: no-repeat;
}

@media (max-width: 1000px) {
  .login-background {
    background-image: none; /* Remove a imagem de fundo quando a tela é menor que 1000px */
  }
}
</style>