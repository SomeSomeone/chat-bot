<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container>
        <DialogContainer :history="history"></DialogContainer>
        <v-row class="textarea-container">
          <v-col cols="12" md="12">
            <v-textarea
              filled
              name="input-7-1"
              label="Type your message"
              v-model="input"
            ></v-textarea>
          </v-col>
          <v-flex class="pa-3">
            <v-btn
              @click="send"
              x-large
              color="primary"
              class="mr-2"
              :disabled="!active"
              >Send Message</v-btn
            >
            <v-btn
              @click="start"
              x-large
              color="primary"
              class="mr-2"
              :disabled="active"
              >Let's chat</v-btn
            >
            <v-btn
              @click="end"
              x-large
              color="primary"
              class="mr-2"
              :disabled="!active"
              >End</v-btn
            >
          </v-flex>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DialogContainer from "@/components/DialogContainer";
export default {
  name: "App",

  components: {
    DialogContainer,
  },

  data: () => ({
    next: 0,
    input: "",
    active: false,
    messages: [
      {
        text: "Hi, I'm Peter!",
      },
      {
        text: "What's your name?",
        ask: "name",
      },
      {
        text: "Nice to meet you!",
      },
      {
        text: "How was your day?",
        ask: "feeling",
      },
      {
        text: "Where're you from?",
        ask: "location",
      },
      {
        text: "Nice!",
      },
      {
        text: "How old are you?",
        ask: "age",
      },
      {
        text: "What's your favorite hobby?",
        ask: "hobby",
      },
      {
        text: "Wow, cool",
      },
    ],
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
      });
      this.input = "";
      this.botSend();
    },
    botSend() {
      if (!this.messages[this.next]) {
        this.end();
        return;
      }
      this.addMessageToHistory({
        owner: "him",
        ...this.messages[this.next],
      });

      this.next++;
      if (!this.messages[this.next - 1].ask) {
        this.botSend();
      }
    },
    addMessageToHistory(message = {}) {
      this.history.push(message);
    },
    start() {
      this.active = true;
      this.next = 0;
      this.history = [];
      this.userData = {};
      this.botSend();
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
  z-index: 100;
  background: #ffffff;
}
</style>
