export default {
  install(Vue) {
    Vue.mixin({
      methods: {
        getThemes: function () {
          return Object.entries(this.$vuetify.theme.defaults).map((i) => ({
            name: i[0],
            ...i[1],
          }));
        },
        setTheme: function (themeName) {
          if (themeName) {
            let themes = this.getThemes();
            let theme = themes.find((i) => i.name === themeName);
            if (theme) {
              this.$vuetify.theme.themes.light.primary = theme.primary;
              this.$vuetify.theme.themes.light.secondary = theme.secondary;
            }
          }
        },
      },
    });
  },
};
