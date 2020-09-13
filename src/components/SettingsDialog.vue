<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon dark v-bind="attrs" v-on="on">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="settingsForForm.enter"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Send on enter</v-list-item-title>
            <v-list-item-subtitle>Send message on Enter</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="settingsForForm.sound"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-subtitle>
              Play sound after bot sends message
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="settingsForForm.icon"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Use icon for send </v-list-item-title>
            <v-list-item-subtitle>
              Automatically uses overlay for start dialog also
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>Color scheme</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <template v-for="(theme, index) in themes">
              <input
                v-bind:key="`color-input-${index}`"
                :id="`color-input-${index}`"
                class="color-input"
                type="radio"
                v-bind:value="theme.name"
                v-model="settingsForForm.theme"
              />
              <label
                v-bind:key="index"
                class="color-pallet ma-2"
                :for="`color-input-${index}`"
                :style="{ background: theme.primary }"
              >
              </label>
            </template>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SettingsDialog",
  data: () => ({
    dialog: false,
    settingsForForm: {},
    themes: [],
  }),
  props: {
    settings: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    save() {
      localStorage.setItem("settings", JSON.stringify(this.settingsForForm));
      this.$emit("update:settings", this.settingsForForm);
      this.dialog = false;
    },
    formSettings() {
      this.settingsForForm = Object.assign({}, this.settings);
    },
    setTheme(themeName) {
      if (themeName) {
        let theme = this.themes.find((i) => i.name === themeName);
        if (theme) {
          this.$vuetify.theme.themes.light.primary = theme.primary;
          this.$vuetify.theme.themes.light.secondary = theme.secondary;
        }
      }
    },
  },
  watch: {
    settings() {
      this.formSettings();
    },
    dialog() {
      this.formSettings();
      this.setTheme(this.settings.theme);
    },
    "settingsForForm.theme"() {
      this.setTheme(this.settingsForForm.theme);
    },
  },
  mounted() {
    this.themes = Object.entries(this.$vuetify.theme.defaults).map((i) => ({
      name: i[0],
      ...i[1],
    }));
  },
};
</script>

<style lang="scss" scoped>
.color-input {
  width: 0;
  height: 0;
  position: absolute;
  opacity: 1;
  &:checked + .color-pallet {
    outline: 2px solid black;
  }
}

.color-pallet {
  display: inline-block;
  flex: 50px 0 0;
  height: 20px;
  cursor: pointer;
}
</style>
