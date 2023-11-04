<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="18">
      <v-container>

        <!-- Espaçamento no topo -->
        <div class="mt-5"></div>

        <!-- Título Clientes com ícone -->
        <v-row align="center">
          <v-col cols="12" sm="auto" class="d-flex align-items-center">
            <v-icon large color="primary">mdi-account-group</v-icon>
            <h2 class="ml-2 mb-0 font-weight-normal primary--text">Clientes</h2>
          </v-col>
        </v-row>
        
        <!-- Linha horizontal personalizada -->
        <v-divider class="my-3" :style="{ 'backgroundColor': 'tertiary' }"></v-divider>

        <!-- Botão de Novo Cliente -->
        <v-btn class="action-button mb-7 mt-5" color="primary" @click="novoCliente">
          Novo Cliente
        </v-btn>

        <!-- Tabela de Clientes -->
        <v-data-table
          :headers="headers"
          :items="clientes"
          :loading="loading"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.nome }}</td>
              <td>{{ item.cpfOuCnpj }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.telefone }}</td>
              <td>{{ item.dataCadastro | formatDate }}</td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="editarCliente(item)">
                      <v-icon color="#0081b8">mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar Cliente</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="deletarCliente(item)">
                      <v-icon color="#0081b8">mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Excluir Cliente</span>
                </v-tooltip>

              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'CPF/CNPJ', value: 'cpfOuCnpj' },
        { text: 'Email', value: 'email' },
        { text: 'Telefone', value: 'telefone' },
        { text: 'Data de Cadastro', value: 'dataCadastro' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(['clientes']),
  },
  methods: {
    ...mapActions(['fetchClientes', 'deleteCliente']), // Adicione as ações necessárias aqui
    novoCliente() {
    },
    // eslint-disable-next-line no-unused-vars
    editarCliente(cliente) {
    },
    deletarCliente(cliente) {
      if (confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome}?`)) {
        this.deleteCliente(cliente.id).then(() => {
          this.fetchClientes();
        });
      }
    },
    formatDate(value) {
      if (value) {
        return new Date(value).toLocaleDateString();
      }
    },
  },
  created() {
    this.loading = true;
    this.fetchClientes().then(() => {
      this.loading = false;
    });
  },
};
</script>

<style>
.action-button {
  text-transform: none;
  font-weight: normal;
}
.font-weight-normal {
  font-weight: normal; /* Remove o negrito do texto */
}

</style>