<template>
  <v-row>
    <ul class="dialog px-3" ref="dialog">
      <li
        v-for="(message, index) in historyForRender"
        :class="{ [message.owner]: true, primary: message.owner === 'me' }"
        v-bind:key="index"
      >
        <vue-typed-js
          v-if="!message.finish"
          :strings="[message.text]"
          @onComplete="message.finish = true"
          :typeSpeed="45"
        >
          <span class="typing"></span>
        </vue-typed-js>
        <span v-else>
          {{ message.text }}
        </span>
      </li>
    </ul>
  </v-row>
</template>

<script>
export default {
  name: "DialogContainer",
  props: {
    history: {
      type: Array,
      default() {
        return [];
      },
    },
    settings: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    historyForRender() {
      let lastNotFinish = this.history.findIndex((i) => !i.finish);
      if (lastNotFinish === -1) {
        return this.history;
      } else {
        this.playSound();
        return this.history.slice(0, lastNotFinish + 1);
      }
    },
  },
  methods: {
    scroll() {
      this.$nextTick(() => {
        let el = this.$refs.dialog;
        el.scrollTop = el.scrollHeight - el.clientHeight;
      });
    },
    playSound() {
      if (this.settings.sound) {
        let audio = new Audio("just-maybe.mp3");
        audio.play();
      }
    },
  },
  watch: {
    historyForRender() {
      this.scroll();
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  scroll-behavior: smooth;
  list-style: none;
  margin: 0;
  position: absolute;
  left: 0;
  right: 0;
  overflow-y: scroll;
  height: 600px;
  max-height: calc(100vh - 360px);
  z-index: 0;
  padding: 0 0 20px;
  li {
    display: inline-block;
    clear: both;
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 2px;
    font-family: Helvetica, Arial, sans-serif;
  }
  .him {
    background: #eee;
    float: left;
    & + .me {
      border-bottom-right-radius: 5px;
    }
  }

  .me {
    float: right;
    color: #fff;
    & + .me {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    &:last-of-type {
      border-bottom-right-radius: 30px;
    }
  }
}
</style>
