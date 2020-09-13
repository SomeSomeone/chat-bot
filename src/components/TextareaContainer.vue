<template>
  <v-row class="textarea-container">
    <v-col cols="12" md="12">
      <v-textarea
        filled
        name="input"
        label="Type your message"
        v-model="input"
        no-resize
        :append-icon="settings.icon ? 'mdi-send' : undefined"
        :disabled="!active || disabled"
        v-on:click:append="send()"
        v-on:keyup.enter.exact="settings.enter && send()"
        :loading="settings.icon && loading"
      ></v-textarea>
      <v-overlay absolute :value="!active" v-if="settings.icon">
        <v-btn @click="start" color="primary" x-large>
          Let's chat <v-icon right>mdi-chat</v-icon>
        </v-btn>
      </v-overlay>
      <template v-else>
        <v-btn @click="start" v-if="!active" color="primary" x-large block>
          Let's chat <v-icon right>mdi-chat</v-icon>
        </v-btn>
        <v-btn
          @click="send"
          v-else
          color="primary"
          x-large
          block
          :loading="loading"
          :disabled="disabled"
        >
          Send Message <v-icon right>mdi-send</v-icon>
        </v-btn>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "TextareaContainer",
  props: {
    settings: {
      type: Object,
      default() {
        return {};
      },
    },
    loading: {
      type: Boolean,
      default() {
        return false;
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data: () => ({
    input: "",
    active: false,
  }),
  methods: {
    send() {
      if (!this.input) {
        return;
      }
      this.$emit("send", this.input);
      this.input = "";
    },
    start() {
      this.active = true;
      this.$emit("start");
    },
  },
};
</script>

<style scoped>
.textarea-container {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: #ffffff;
  margin: 0;
}
</style>
