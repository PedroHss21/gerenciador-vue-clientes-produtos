<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          {{ editMode ? 'Editar Cliente' : 'Novo Cliente' }}
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
          <v-btn color="red darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="salvarCliente">
            {{ editMode ? 'Atualizar' : 'Salvar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      clienteParaEditar: Object
    },
    data() {
      return {
        dialog: false,
        valid: true,
        editMode: false,
        cliente: {
          nome: '',
          cpfOuCnpj: '',
          email: '',
          telefone: '',
          dataCadastro: new Date().toISOString().substr(0, 10)
        },
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
          const action = this.editMode ? axios.put : axios.post;
          const url = this.editMode ? `/api/clientes/${this.cliente.id}` : '/api/clientes';
  
          action(url, this.cliente)
            .then(response => {
              console.log('Cliente processado com sucesso:', response.data);
              this.closeDialog();
              this.$emit('clienteSalvo', response.data);
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
        this.$refs.form.reset();
        this.cliente = this.getDefaultCliente();
        this.valid = false;
      },
      openDialog(edit = false) {
        this.editMode = edit;
        this.dialog = true;
        if (edit && this.clienteParaEditar) {
          this.cliente = { ...this.clienteParaEditar };
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
      clienteParaEditar: {
        immediate: true,
        handler(newValue) {
          if (newValue) {
            this.cliente = { ...newValue };
            this.editMode = true;
          } else {
            this.cliente = this.getDefaultCliente();
            this.editMode = false;
          }
        },
        deep: true
      }
    }
  };
  </script>
  