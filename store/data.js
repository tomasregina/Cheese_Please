export const state = () => ({
    jokes: [
        {id: 1, text: 'Why won’t the elephant use the computer?….He’s afraid of the mouse!', thumbnail: 'https://images.unsplash.com/photo-1526226128118-9ef71fc2f34b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80' },
        {id: 2, text: 'What is a robot’s favorite snack?….Computer chips!', thumbnail: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1533&q=80' },
        {id: 3, text: 'How did the soldier fit his tank in his house?…It was a fish tank!', thumbnail: 'https://images.unsplash.com/photo-1566754077592-caea10abd0c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' },
        {id: 4, text: 'Where do cows go on dates?…MOOOOvies', thumbnail: 'https://images.unsplash.com/photo-1564085352725-08da0272627d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y293fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'},
        {id: 5, text: 'What room is a dead man most afraid of?…The living room!', thumbnail: 'https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
    ],
    qoutes: null
})

export const mutations = {
    setQoutes (state, qoutes) {
        state.qoutes = qoutes;
    }
}

export const actions = {
    setQoutes({commit}, qoutes) {
        commit('setQoutes', qoutes)
    }
}

export const getters = {
    getQuotes(state) {
        return state.jokes;
    }
}
