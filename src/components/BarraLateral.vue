<template>
  <header>
      <h1>
        <img src="../assets/logo.png" alt="">  
      </h1>
      <div class="has-text-centered">
        <button class="button" @click="alterarTema">
          {{ textoBotao }}
        </button>
      </div>

      <aside class="menu mt-6">
        <ul class="menu-list">
            <li>
              <router-link to="/" class="link">
                <i class="fas fa-tasks"></i> Tarefas              
              </router-link>
            </li>
            <li>
              <router-link to="/projetos" class="link">
                <i class="fas fa-project-diagram"></i> Projetos              
              </router-link>
            </li>
        </ul>
      </aside>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],
  data () {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
    textoBotao () {
      if (this.modoEscuroAtivo) {
        return 'Desativar modo escuro'
      }
      return 'Ativar modo escuro'
    }
  },
  methods: {
    alterarTema () {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
    }
  }
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
.menu-list {
  text-align: left;
}
/* .panel li {
  margin: 16px 0;
  text-align: left;
}
.panel li i {
  margin-right: 14px;
} */
.link {
  color: #FFF;
}
.link:hover {
  color: #FAF0CA;
}
.link.router-link-active {
  color: #be9b0f;
}
.menu-list li a:hover {
    background-color: #0086c6;
    color: #FFF;
}
</style>
