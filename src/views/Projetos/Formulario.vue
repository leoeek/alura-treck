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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import useNotificador from '@/hooks/notificador'
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { ATUALIZAR_PROJETOS, CADASTRAR_PROJETOS } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    }
  },

  setup (props) {
    const router = useRouter()
    const store = useStore()
    const { notificar } = useNotificador()
    const nomeDoProjeto = ref('')
    
    if (props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = ''
      notificar(TipoNotificacao.SUCESSO, 'Boaaa!', 'O projeto foi cadastrado com sucesso ;)')
      router.push('/projetos')
    }

    const salvar = () => {
      if (nomeDoProjeto.value == '') {
        notificar(TipoNotificacao.FALHA, 'Ops!', 'Informe o nome do projeto.')
        return false
      }

      if (props.id) {
        store.dispatch(ATUALIZAR_PROJETOS, {
          id: props.id,
          nome: nomeDoProjeto.value
        })
        .then(() => lidarComSucesso())
      }
      else {
        store.dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => lidarComSucesso())
      }
    }

    return {
      nomeDoProjeto,
      salvar,
    }
  }
});
</script>

<style scoped>
.label {
  color:var(--texto-primario);
}
</style>