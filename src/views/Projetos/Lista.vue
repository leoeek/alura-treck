<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button 
                class="button ml-2 is-danger"
                @click="excluir(projeto.id)"
            >
                <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import useNotificador from '@/hooks/notificador'
import { REMOVER_PROJETOS, OBTER_PROJETOS } from "@/store/tipo-acoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "Lista",

  methods: {
    excluir (id: string) {
      this.store.dispatch(REMOVER_PROJETOS, id)
        .then(() => {
          this.notificar(TipoNotificacao.SUCESSO, 'Boaaa!', 'O projeto foi excluído com sucesso ;)')
        })
    }
  },
    
  setup () {
    const store = useStore()
    const { notificar } = useNotificador()

    store.dispatch(OBTER_PROJETOS)

    return {
      notificar,
      projetos: computed(() => store.state.projeto.projetos),
      store,
    }
  }
});
</script>