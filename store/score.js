export const state = () => ({
    score: 0
})

export const mutations = {
    updateScore (state) {
        state.score += 1
    },
    resetScore (state) {
        state.score = 0
    }
}

export const actions = {
    updateScore(context) {
        context.commit('updateScore');
    },
    resetScore(context) {
        context.commit('resetScore');
    }
}

export const getters = {
    getScore(state) {
        return state.score;
    }
}