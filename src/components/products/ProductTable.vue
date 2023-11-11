<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="12">
      <v-container>

        <!-- Espaçamento no topo -->
        <div class="mt-5"></div>

        <!-- Título Produtos com ícone -->
        <v-row align="center">
          <v-col cols="12" sm="auto" class="d-flex align-items-center">
            <v-icon large color="primary">mdi-package</v-icon>
            <h2 class="ml-2 mb-0 font-weight-normal primary--text">Produtos</h2>
          </v-col>
        </v-row>

        <!-- Linha horizontal personalizada -->
        <v-divider class="my-3" :style="{ 'backgroundColor': 'tertiary' }"></v-divider>

        <!-- Botão de Novo Produto -->
        <v-btn class="action-button mb-7 mt-5" color="primary" @click="openNewProductDialog">
          Novo Produto
        </v-btn>
        <product-manager ref="productManager"></product-manager>

        <!-- Tabela de Produtos -->
        <v-data-table :headers="headers" :items="produtos" :loading="loading" class="elevation-1" mobile-breakpoint="500"
          dense>
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.nome }}</td>
              <!-- Ocultar algumas colunas em telas pequenas -->
              <td class="d-none d-md-table-cell">{{ item.valor | currency }}</td>
              <td class="d-none d-md-table-cell">{{ item.quantidadeEstoque }}</td>
              <td class="d-none d-md-table-cell">{{ item.observacao }}</td>
              <td class="d-none d-md-table-cell">{{ item.dataCadastro | formatDate }}</td>
              <td>
                <!-- Ícones de editar e excluir com alinhamento horizontal -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="editarProduto(item)">
                      <v-icon color='primary'>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar Produto</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="openDeleteDialog(item)">
                      <v-icon color='primary'>mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Excluir Produto</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>

        <!-- Diálogo de Confirmação de Exclusão -->
        <v-dialog v-model="deleteDialog" persistent max-width="500px">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              Excluir Produto
              <!-- Botão de fechar no canto superior direito -->
              <v-btn icon @click="closeDeleteDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              Você tem certeza que deseja excluir o produto <strong>{{ selectedProduto?.nome }}</strong>?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class='delete-button' text @click="deletarProduto">Excluir Produto</v-btn>
              <v-btn class='cancel-button' text @click="closeDeleteDialog">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-col>
  </v-row>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';
import ProductManager from '@/views/ProductManager.vue';

export default {
  components: {
    ProductManager
  },
  data() {
    return {
      deleteDialog: false,
      selectedProduto: null,
      loading: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'nome' },
        { text: 'Valor', value: 'valor' },
        { text: 'Estoque', value: 'quantidadeEstoque' },
        { text: 'Observação', value: 'observacao' },
        { text: 'Data de Cadastro', value: 'dataCadastro', sortable: false },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(['produtos']),
  },
  methods: {
    ...mapActions(['fetchProdutos', 'deleteProduto']),
    openNewProductDialog() {
      this.$refs.productManager.openDialog();
    },
    editarProduto(produto) {
      this.$refs.productManager.openDialog(true);
      this.$nextTick(() => {
        this.$refs.productManager.produto = { ...produto };
      });
    },
    openDeleteDialog(produto) {
      this.selectedProduto = produto;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.selectedProduto = null;
    },
    deletarProduto() {
      if (this.selectedProduto) {
        this.loading = true;
        this.deleteProduto(this.selectedProduto.id)
          .then(() => {
            this.closeDeleteDialog();
          })
          .catch(error => {
            console.error('Erro ao excluir o produto:', error);
            if (error.response && error.response.status === 401) {
              this.$router.push('/login');
              alert('Sessão expirada, por favor faça login novamente.');
            } else {
              alert('Erro ao excluir o produto. Por favor, tente novamente.');
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
      return '';
    },
    currency(value) {
      if (value != null) {
        const numberValue = Number(value); // Converte a entrada para um número
        return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
      return '';
    },
  },
  created() {
    this.fetchProdutos();
  },
};
</script>
  
<style scoped>
.action-button {
  text-transform: none;
  font-weight: normal;
}

.font-weight-normal {
  font-weight: normal;
}

.cancel-button {
  border: 1px solid var(--primary-color);
  color: var(--white-color);
  background-color: var(--primary-color);
  text-transform: none;
  font-weight: normal;
}

.cancel-button:hover {
  border: 1px solid var(--secondary-color);
  color: var(--white-color);
  background-color: var(--secondary-color);
  text-transform: none;
  font-weight: normal;
}

.delete-button {
  border: 1px solid var(--tertiary-color);
  color: var(--tertiary2-color);
  background-color: transparent;
  text-transform: none;
  font-weight: normal;
}

.delete-button:hover {
  border: 1px solid var(--tertiary-color);
  color: var(--tertiary2-color);
  background-color: transparent;
  text-transform: none;
  font-weight: normal;
}

.delete-button:active {
  border: 1px solid var(--tertiary-color);
  color: var(--tertiary2-color);
  background-color: transparent;
  text-transform: none;
  font-weight: normal;
}
</style>