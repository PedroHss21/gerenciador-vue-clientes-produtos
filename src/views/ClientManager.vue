<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="text-h5">
        <div class="flex-grow-1">{{ editMode ? 'Editar Cliente' : 'Novo Cliente' }}</div>
        <!-- Botão para fechar o diálogo -->
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="cliente.nome"
            :rules="nameRules"
            label="Nome"
            required
          ></v-text-field>
          <v-text-field
            v-model="cliente.cpfOuCnpj"
            :rules="cpfCnpjRules"
            label="CPF/CNPJ"
            required
          ></v-text-field>
          <v-text-field
            v-model="cliente.email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="cliente.telefone"
            :rules="telefoneRules"
            label="Telefone"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class='save_edit-button' text @click="salvarCliente">
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
    clienteParaEditar: Object
  },
  data() {
    return {
      dialog: false,
      valid: false,
      editMode: false,
      cliente: this.getDefaultCliente(),
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length >= 3) || 'Nome deve ter mais de 2 caracteres',
        v => (v && v.length <= 50) || 'Nome deve ter menos de 50 caracteres'
      ],
      cpfCnpjRules: [
        v => !!v || 'CPF/CNPJ é obrigatório',
        v => (v && v.length >= 11 && v.length <= 14) || 'CPF/CNPJ deve ter entre 11 e 14 caracteres'
      ],
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+/.test(v) || 'E-mail deve ser válido',
      ],
      telefoneRules: [
        v => !!v || 'Telefone é obrigatório',
        v => (v && v.length >= 8 && v.length <= 15) || 'Telefone deve ter entre 8 e 15 caracteres'
      ],
    };
  },
  methods: {
    salvarCliente() {
      if (this.$refs.form.validate()) {
        const actionName = this.editMode ? 'updateCliente' : 'createCliente';
        this.$store.dispatch(actionName, this.cliente)
          .then(() => {
            this.closeDialog();
            this.$emit('clienteAtualizado');
          })
          .catch(error => {
            console.error('Erro ao processar o cliente:', error);
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
      this.cliente = this.getDefaultCliente();
      this.valid = false;
    },
    openDialog(edit = false) {
      this.editMode = edit;
      this.dialog = true;
      if (edit && this.clienteParaEditar) {
        this.cliente = { ...this.clienteParaEditar };
      } else {
        this.cliente = this.getDefaultCliente();
      }
    },
    getDefaultCliente() {
      return {
        nome: '',
        cpfOuCnpj: '',
        email: '',
        telefone: '',
        dataCadastro: new Date().toISOString().substr(0, 10)
      };
    }
  },
  watch: {
    clienteParaEditar(newValue) {
      if (newValue) {
        this.cliente = { ...newValue };
        this.editMode = true;
      } else {
        this.editMode = false;
        this.resetForm();
      }
    }
  },
  created() {
    if (this.clienteParaEditar) {
      this.cliente = { ...this.clienteParaEditar };
      this.editMode = true;
    }
  }
};
</script>

<style scoped>

.cancel-button {
  border: 1px solid var(--tertiary-color);
  color: var(--tertiary2-color);;
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

