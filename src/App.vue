<template>
  <v-app>
    <v-overlay :absolute="absolute" :value="!active">
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
      {
        text: (userData) =>
          `Your name is ${userData.name}.
           Your day is ${userData.feeling}.
           Your from ${userData.location}.
           You are ${userData.age} old.
           Your favorite hobby is ${userData.hobby}`,
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
  background: #ffffff;
}
</style>
