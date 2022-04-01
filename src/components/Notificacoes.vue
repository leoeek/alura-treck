<template>
  <div class="notificacoes">
      <article 
        v-for="notificacao in notificacoes"
        :key="notificacao.id"
        class="message"
        :class="contexto[notificacao.tipo]"
        >
        <div class="message-header">
            {{ notificacao.titulo }}
        </div>
        <div class="message-body">
            {{ notificacao.texto }}
        </div>
      </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'

export default defineComponent({
    name: 'Notificacoes',

    data () {
        return  {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger',
            }
        }
    },

    setup () {
        const store = useStore()

        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 120;
    width: 300px;
}
</style>