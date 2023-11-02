import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#00609c',
                secondary: '#0081b8',
                tertiary: '#a2a9ad'
            },
        },
    },
});
