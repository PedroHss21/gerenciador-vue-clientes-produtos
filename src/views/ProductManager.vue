<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="text-h5">
        <div class="flex-grow-1">{{ editMode ? 'Editar Produto' : 'Novo Produto' }}</div>
        <!-- Botão para fechar o diálogo -->
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="produto.nome"
            :rules="nameRules"
            label="Nome"
            required
          ></v-text-field>
          <v-text-field
            v-model="produto.valor"
            :rules="valueRules"
            label="Valor"
            prefix="R$"
            required
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="produto.quantidadeEstoque"
            :rules="stockRules"
            label="Quantidade em Estoque"
            required
            type="number"
          ></v-text-field>
          <v-textarea
            v-model="produto.observacao"
            label="Observação"
            hint="Informações adicionais sobre o produto"
            persistent-hint
            auto-grow
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class='save_edit-button' text @click="salvarProduto">
          {{ editMode ? 'Atualizar' : 'Gravar' }}
        </v-btn>
        <v-btn class='cancel-button' text @click="closeDialog">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    produtoParaEditar: Object
  },
  data() {
    return {
      dialog: false,
      valid: false,
      editMode: false,
      produto: this.getDefaultProduto(),
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length >= 3) || 'Nome deve ter mais de 2 caracteres',
        v => (v && v.length <= 50) || 'Nome deve ter menos de 50 caracteres'
      ],
      valueRules: [
        v => !!v || 'Valor é obrigatório',
        v => (v && v > 0) || 'Valor deve ser maior que 0'
      ],
      stockRules: [
        v => !!v || 'Quantidade em estoque é obrigatória',
        v => (v && v >= 0) || 'Quantidade em estoque não pode ser negativa'
      ],
    };
  },
  methods: {
    salvarProduto() {
      if (this.$refs.form.validate()) {
        const actionName = this.editMode ? 'updateProduto' : 'createProduto';
        this.$store.dispatch(actionName, this.produto)
          .then(() => {
            this.closeDialog();
            this.$emit('produtoAtualizado');
          })
          .catch(error => {
            console.error('Erro ao processar o produto:', error);
          });
      }
    },
    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      this.produto = this.getDefaultProduto();
      this.valid = false;
    },
    openDialog(edit = false) {
      this.editMode = edit;
      this.dialog = true;
      if (edit && this.produtoParaEditar) {
        this.produto = { ...this.produtoParaEditar };
      } else {
        this.produto = this.getDefaultProduto();
      }
    },
    getDefaultProduto() {
      return {
        nome: '',
        valor: 0,
        quantidadeEstoque: 0,
        observacao: '',
        dataCadastro: new Date().toISOString().substr(0, 10)
      };
    }
  },
  watch: {
    produtoParaEditar(newValue) {
      if (newValue) {
        this.produto = { ...newValue };
        this.editMode = true;
      } else {
        this.editMode = false;
        this.resetForm();
      }
    }
  },
  created() {
    if (this.produtoParaEditar) {
      this.produto = { ...this.produtoParaEditar };
      this.editMode = true;
    }
  }
};
</script>

<style scoped>

.cancel-button {
  border: 1px solid var(--tertiary-color);
  color: var(--tertiary2-color);
  background-color: transparent;
  text-transform: none;
  font-weight: normal;
}
.save_edit-button {
  border: 1px solid var(--primary-color);
  color: var(--white-color);
  background-color: var(--primary-color);
  text-transform: none;
  font-weight: normal;
}

.save_edit-button:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--white-color);
}

.save_edit-button:active {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}
</style>
