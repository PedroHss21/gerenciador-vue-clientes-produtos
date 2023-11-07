import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#165091',
                secondary: '#247daa',
                tertiary: '#a2a9ad',
                tertiary2: '#58595b',
                white: '#FFFFFF'
            },
        },
    },
});
