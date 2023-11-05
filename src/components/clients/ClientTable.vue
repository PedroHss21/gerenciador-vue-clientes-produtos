<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="12">
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
        <v-btn class="action-button mb-7 mt-5" color="primary" @click="openNewClientDialog">
          Novo Cliente
        </v-btn>
        <client-manager ref="clientManager"></client-manager>

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
                      <v-icon color='primary'>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar Cliente</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="openDeleteDialog(item)">
                      <v-icon color='primary'>mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Excluir Cliente</span>
                </v-tooltip>

              </td>
            </tr>
          </template>
        </v-data-table>
        <!-- Diálogo de Confirmação de Exclusão -->
        <v-dialog v-model="deleteDialog" persistent max-width="500px">
          <v-card>
            <v-card-title>Excluir Cliente</v-card-title>
            <v-card-text>
              Você tem certeza que deseja excluir o cliente <strong>{{ selectedCliente?.nome }}</strong>?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class='cancel-button' text @click="closeDeleteDialog">Cancelar</v-btn>
              <v-btn class='delete-button' text @click="deletarCliente">Excluir</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ClientManager from '@/views/ClientManager.vue';

export default {
  components: {
    ClientManager
  },
  data() {
    return {
      deleteDialog: false,
      selectedCliente: null,
      loading: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'CPF/CNPJ', value: 'cpfOuCnpj' },
        { text: 'Email', value: 'email' },
        { text: 'Telefone', value: 'telefone' },
        { text: 'Data de Cadastro', value: 'dataCadastro', sortable: false },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(['clientes']),
  },
  methods: {
    ...mapActions(['fetchClientes', 'deleteCliente']),
    openNewClientDialog() {
      this.$refs.clientManager.openDialog();
    },
    editarCliente(cliente) {
    this.$refs.clientManager.openDialog(true);
    this.$nextTick(() => {
      this.$refs.clientManager.cliente = { ...cliente };
    });
  },
    openDeleteDialog(cliente) {
      this.selectedCliente = cliente;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.selectedCliente = null;
    },
    deletarCliente() {
      if (this.selectedCliente) {
        this.loading = true;
        this.deleteCliente(this.selectedCliente.id)
          .then(() => {
            this.closeDeleteDialog();
          })
          .catch(error => {
            console.error('Erro ao excluir o cliente:', error);
            if (error.response && error.response.status === 401) {
              this.$router.push('/login');
              alert('Sessão expirada, por favor faça login novamente.');
            } else {
              alert('Erro ao excluir o cliente. Por favor, tente novamente.');
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
      }
    },
  },
  created() {
    this.fetchClientes();
  },
};
</script>

<style>
.action-button {
  text-transform: none;
  font-weight: normal;
}
.font-weight-normal {
  font-weight: normal;
}
</style>

<style scoped>
.cancel-button {
  border: 1px solid #a2a9ad;
  color: #929497;
  background-color: transparent;
  text-transform: none;
  font-weight: normal;
}
.delete-button {
  border: 1px solid #0081b8;
  color: white;
  background-color: #0081b8;
  text-transform: none;
  font-weight: normal;
}

.delete-button:hover {
  background-color: #0081b8;
  border-color: #0081b8;
  color: white;
}

.delete-button:active {
  background-color: #006f9b;
  border-color: #006f9b;
}
</style>