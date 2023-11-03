<template>
  <v-row justify="center">
    <v-col cols="5" md="10" lg="18">
      
      <!-- Adiciona um espaçamento acima do container -->
      <v-container class="mt-15">
        <!-- Botão de Novo Cliente -->
        <v-btn class="action-button" color="primary" @click="novoCliente">
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
            <v-btn icon @click="editarCliente(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deletarCliente(item)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
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
      // Implemente a lógica para adicionar um novo cliente, por exemplo, abrir um modal ou redirecionar para um formulário
    },
    // eslint-disable-next-line no-unused-vars
    editarCliente(cliente) {
      // Implemente a lógica para editar um cliente existente, por exemplo, abrir um modal com o formulário de cliente preenchido
    },
    deletarCliente(cliente) {
      if (confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome}?`)) {
        // Chama a ação de deletar o cliente
        this.deleteCliente(cliente.id).then(() => {
          // Recarrega a lista de clientes após a exclusão
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
</style>
