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
        <v-row class="textarea-container">
          <v-col cols="12" md="12">
            <v-textarea
              filled
              name="input"
              label="Type your message"
              v-model="input"
              no-resize
              :append-icon="settings.icon && 'mdi-send'"
              :disabled="!active"
              v-on:click:append="send()"
              v-on:keyup.enter.exact="settings.enter && send()"
            ></v-textarea>
            <v-overlay absolute :value="!active" v-if="settings.icon">
              <v-btn @click="start" color="primary" x-large>
                Let's chat <v-icon right>mdi-chat</v-icon>
              </v-btn>
            </v-overlay>
            <template v-else>
              <v-btn
                @click="start"
                v-if="!active"
                color="primary"
                x-large
                block
              >
                Let's chat <v-icon right>mdi-chat</v-icon>
              </v-btn>
              <v-btn @click="send" v-else color="primary" x-large block>
                Send Message <v-icon right>mdi-send</v-icon>
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DialogContainer from "@/components/DialogContainer";
import SettingsDialog from "@/components/SettingsDialog";
import axios from "axios";
export default {
  name: "App",

  components: {
    DialogContainer,
    SettingsDialog,
  },

  data: () => ({
    next: 0,
    input: "",
    active: false,
    messages: [],
    history: [],
    userData: {},
    settings: {
      enter: true,
      sound: true,
      widgets: false,
      theme: "light",
    },
  }),
  methods: {
    send() {
      if (!this.input) {
        return;
      }
      let currentBotMessage = this.messages[this.next - 1];
      if (currentBotMessage.ask) {
        this.userData[currentBotMessage.ask] = this.input;
      }
      this.addMessageToHistory({
        text: this.input,
        owner: "me",
        finish: true,
      });
      this.input = "";
      this.botSend();
    },
    botSend() {
      if (!this.messages[this.next]) {
        //this.end();
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
      this.active = true;
      this.next = 0;
      this.history = [];
      this.userData = {};
      if (!this.messages.length) {
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
          .then(() => this.botSend());
      } else {
        this.botSend();
      }
    },
    getSetting() {
      this.settings = {
        ...this.settings,
        ...JSON.parse(localStorage.getItem("settings") || "{}"),
      };
    },
  },
  mounted() {
    this.getSetting();
  },
};
</script>

<style lang="scss">
.textarea-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: #ffffff;
}
</style>
