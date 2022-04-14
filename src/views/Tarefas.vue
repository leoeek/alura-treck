<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />

  <div class="lista">
    <Box v-if="semTarefas">
      Você não está muito produtivo hoje
      <span class="has-text-weight-bold">:(</span>
    </Box>

    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="texto"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <Modal :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho class="modal-card-head">
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:corpo class="modal-card-body">
        <div class="field">
          <label for="descricaoDaTarefa" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </div>
      </template>
      <template v-slot:rodape class="modal-card-foot">
        <button class="button is-success" @click="alterarTarefa">
          Salvar alterações
        </button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </template>
    </Modal>

    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :tarefa="tarefa"
      :key="index"
      @aoTarefaClicada="selecionarTarefa"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";
import ITarefa from "@/interfaces/ITarefa";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal,
  },

  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },

  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },

    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },

    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },

    fecharModal() {
      this.tarefaSelecionada = null;
    },
  },

  setup() {
    const store = useStore();
    const filtro = ref("");

    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    // const tarefas = computed(() => store.state.tarefa.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)))

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      store,
      filtro,
      tarefas: computed(() => store.state.tarefa.tarefas),
      semTarefas: computed(() => store.state.tarefa.tarefas?.length === 0),
    };
  },
});
</script>

<style scoped>
.lista {
  margin-left: 14px;
  margin-right: 14px;
}
</style>