import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import http from '@/http'

import { 
    ADICIONA_PROJETOS, 
    ALTERA_PROJETO, 
    EXCLUIR_PROJETO,
    ADICIONA_TAREFA,
    ATUALIZA_TAREFA,
    REMOVE_TAREFA, 
    NOTIFICAR,
    DEFINIR_PROJETOS,
    DEFINIR_TAREFAS
} from './tipo-mutacoes'
import { INotificacao } from "@/interfaces/INotificacao";
import { ATUALIZAR_PROJETOS, CADASTRAR_PROJETOS, REMOVER_PROJETOS, OBTER_PROJETOS, OBTER_TAREFAS } from "./tipo-acoes";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETOS](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto

            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id = projeto.id)
            state.projetos[index] = projeto            
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },

        [ADICIONA_TAREFA](state, tarefa: ITarefa) { 
            tarefa.id = new Date().toISOString()
            state.tarefas.push(tarefa)
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(p => p.id == tarefa.id)
            state.tarefas[indice] = tarefa
        },
        [REMOVE_TAREFA] (state, id: string) {
            state.projetos = state.projetos.filter(p => p.id != id)
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },

        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            console.log('aqui notificacao', novaNotificacao)
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },

    }, 

    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('/projetos')
                .then(response => commit(DEFINIR_PROJETOS, response.data))
        },
        [CADASTRAR_PROJETOS](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ATUALIZAR_PROJETOS](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS](contexto, id: number) {
            return http.delete(`/projetos/${id}`)
                .then(() => this.commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS](contexto, id: number) {
            return http.get('/tarefas')
                .then(response => this.commit(DEFINIR_TAREFAS, response.data))
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}