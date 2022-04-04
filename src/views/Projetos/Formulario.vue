<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input "
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" type="submit">Salvar</button>
        </div>
        <div class="control">
          <button 
            class="button is-link is-light" 
            type="button"
            @click="this.$router.push('/projetos')"
          >
            Voltar
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import useNotificador from '@/hooks/notificador'
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { ATUALIZAR_PROJETOS, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    }
  },

  mounted () {
    if (this.id) {
      const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data () {
    return {
      nomeDoProjeto: '',
    };
  },

  methods: {
    async salvar () {
      if (this.nomeDoProjeto == '') {
        this.notificar(TipoNotificacao.FALHA, 'Ops!', 'Informe o nome do projeto.')
        return false
      }

      if (this.id) {
        this.store.dispatch(ATUALIZAR_PROJETOS, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
        .then(() => {
            this.nomeDoProjeto = ''
            this.notificar(TipoNotificacao.SUCESSO, 'Boaaa!', 'O projeto foi atualizado com sucesso ;)')
            this.$router.push('/projetos')
          })
      }
      else {
        this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
          .then(() => {
            this.nomeDoProjeto = ''
            this.notificar(TipoNotificacao.SUCESSO, 'Boaaa!', 'O projeto foi cadastrado com sucesso ;)')
            this.$router.push('/projetos')
          })
      }
    }, 
  },

  setup () {
    const store = useStore()
    const { notificar } = useNotificador()

    return {
      store,
      notificar
    }
  }
});
</script>

<style scoped>
.label {
  color:var(--texto-primario);
}
</style>