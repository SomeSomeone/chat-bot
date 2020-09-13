<template>
  <v-app>
    <v-overlay absolute :value="!active">
      <v-btn @click="start" color="primary" x-large>
        Let's chat <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-overlay>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-content>
      <v-container>
        <DialogContainer :history="history"></DialogContainer>
        <v-row class="textarea-container">
          <v-col cols="12" md="12">
            <v-textarea
              filled
              name="input"
              label="Type your message"
              v-model="input"
              no-resize
              append-icon="mdi-send"
              :disabled="!active"
              v-on:click:append="send()"
              v-on:keyup.enter.exact="send()"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DialogContainer from "@/components/DialogContainer";
import axios from "axios";
export default {
  name: "App",

  components: {
    DialogContainer,
  },

  data: () => ({
    next: 0,
    input: "",
    active: false,
    messages: [],
    history: [],
    userData: {},
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
    end() {
      this.active = false;
    },
  },
  mounted() {},
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
