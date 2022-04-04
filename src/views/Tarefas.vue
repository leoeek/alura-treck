<template>
    <Formulario />
    <div class="lista">
        <Box v-if="semTarefas">
            Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas" :tarefa="tarefa" :key="index"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from '@/store'
import { OBTER_TAREFAS } from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box
  },
  
  setup () {
    const store = useStore()    

    store.dispatch(OBTER_TAREFAS)
    
    return {
      store,
      tarefas: computed(() => store.state.tarefas),
      semTarefas: computed(() => store.state.tarefas.length === 0)
    }
  }
});
</script>