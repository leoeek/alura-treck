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
import { collection, addDoc } from 'firebase/firestore';
import firestore from '@/database/db'
import { useStore } from "@/store";
import useNotificador from '@/hooks/notificador'
import { ADICIONA_PROJETOS, ALTERA_PROJETO } from '@/store/tipo-mutacoes'
import { TipoNotificacao } from "@/interfaces/INotificacao";
// import { notificacaoMixin } from '@/minixs/notificar'

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    }
  },

  // mixins: [notificacaoMixin],

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
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
      }
      else {
        this.store.commit(ADICIONA_PROJETOS, this.nomeDoProjeto)
      }

      try {
        const docRef = await addDoc(collection(this.db, "projects"), {
          id: new Date().toISOString(),
          name: this.nomeDoProjeto
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }


      this.nomeDoProjeto = ''
      this.notificar(TipoNotificacao.SUCESSO, 'Boaaa!', 'O projeto foi cadastrado com sucesso ;)')

      this.$router.push('/projetos')
    }, 
  },

  setup () {
    const store = useStore()
    const { notificar } = useNotificador()
    const db = firestore

    return {
      store,
      db,
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