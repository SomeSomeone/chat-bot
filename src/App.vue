<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <SettingsDialog :settings.sync="settings"></SettingsDialog
    ></v-app-bar>
    <v-content>
      <v-container>
        <DialogContainer
          :history="history"
          :settings="settings"
        ></DialogContainer>
        <TextareaContainer
          :settings="settings"
          :loading="loading"
          v-on:send="send"
          v-on:start="start"
        ></TextareaContainer>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DialogContainer from "@/components/DialogContainer";
import SettingsDialog from "@/components/SettingsDialog";
import TextareaContainer from "@/components/TextareaContainer";
import axios from "axios";
export default {
  name: "App",

  components: {
    DialogContainer,
    SettingsDialog,
    TextareaContainer,
  },

  data: () => ({
    next: 0,
    messages: [],
    history: [],
    userData: {},
    loading: false,
    settings: {
      enter: true,
      sound: true,
      widgets: false,
      theme: "light",
    },
  }),
  methods: {
    send(input) {
      let currentBotMessage = this.messages[this.next - 1];
      if (currentBotMessage.ask) {
        this.userData[currentBotMessage.ask] = input;
      }
      this.addMessageToHistory({
        text: input,
        owner: "me",
        finish: true,
      });
      this.botSend();
    },
    botSend() {
      if (!this.messages[this.next]) {
        return;
      }

      let message = {
        owner: "him",
        ...this.messages[this.next],
      };
      if (typeof message.text === "function") {
        message.text = message.text(this.userData);
      }
      this.addMessageToHistory(message);

      this.next++;
      if (!this.messages[this.next - 1].ask) {
        this.botSend();
      }
    },
    addMessageToHistory(message = {}) {
      this.history.push({ finish: false, ...message });
    },
    start() {
      this.next = 0;
      this.history = [];
      this.userData = {};
      if (!this.messages.length) {
        this.loading = true;
        axios
          .get("messages.json")
          .then((e) => {
            this.messages = JSON.parse(e.request.response, function (
              key,
              value
            ) {
              if (
                typeof value === "string" &&
                value.startsWith("/Function(") &&
                value.endsWith(")/")
              ) {
                value = value.substring(10, value.length - 2);
                return (0, eval)("(" + value + ")");
              }
              return value;
            });
          })
          .then(() => this.botSend())
          .finally(() => (this.loading = false));
      } else {
        this.botSend();
      }
    },
    getSetting() {
      this.settings = {
        ...this.settings,
        ...JSON.parse(localStorage.getItem("settings") || "{}"),
      };
      this.setTheme(this.settings.theme);
    },
  },
  mounted() {
    this.getSetting();
  },
};
</script>

<style lang="scss"></style>
