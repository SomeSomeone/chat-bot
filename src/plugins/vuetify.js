import Vue from "vue";
import Vuetify from "vuetify/lib";
Vue.use(Vuetify);
const vuetify = new Vuetify({
  theme: {
    themes: {
      red: {
        primary: "#F44336",
        secondary: "#FFEBEE",
      },
      pink: {
        primary: "#E91E63",
        secondary: "#FCE4EC",
      },
      purple: {
        primary: "#9C27B0",
        secondary: "#F3E5F5",
      },
      deepPurple: {
        primary: "#673AB7",
        secondary: "#EDE7F6",
      },
      indigo: {
        primary: "#3F51B5",
        secondary: "#E8EAF6",
      },
      blue: {
        primary: "#2196F3",
        secondary: "#E3F2FD",
      },
      light: {
        primary: "#03A9F4",
        secondary: "#E1F5FE",
      },
      cyan: {
        primary: "#00BCD4",
        secondary: "#E0F7FA",
      },
      teal: {
        primary: "#009688",
        secondary: "#E0F2F1",
      },
      green: {
        primary: "#4CAF50",
        secondary: "#E8F5E9",
      },
      lightGreen: {
        primary: "#8BC34A",
        secondary: "#F1F8E9",
      },
      lime: {
        primary: "#CDDC39",
        secondary: "#F9FBE7",
      },
      yellow: {
        primary: "#FFEB3B",
        secondary: "#FFFDE7",
      },
      amber: {
        primary: "#FFC107",
        secondary: "#FFF8E1",
      },
      orange: {
        primary: "#FF9800",
        secondary: "#FFF3E0",
      },
      deepOrange: {
        primary: "#FF5722",
        secondary: "#FBE9E7",
      },
    },
  },
});

export default vuetify;
