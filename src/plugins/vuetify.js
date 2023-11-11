import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#165091',
                secondary: '#247daa',
                tertiary: '#d0d2d3',
                tertiary2: '#929497',
                white: '#FFFFFF'
            },
            dark: {
                primary: '#165091',
                secondary: '#247daa',
                tertiary: '#d0d2d3',
                tertiary2: '#929497',
            }
        },
    },
});
