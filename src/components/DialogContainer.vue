<template>
  <v-row>
    <ul class="dialog px-3" ref="dialog">
      <li
        v-for="(message, index) in historyForRender"
        :class="message.owner"
        v-bind:key="index"
      >
        <vue-typed-js
          v-if="!message.finish"
          :strings="[message.text]"
          @onComplete="message.finish = true"
          :typeSpeed="35"
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
  },
  computed: {
    historyForRender() {
      let lastNotFinish = this.history.findIndex((i) => !i.finish);
      if (lastNotFinish === -1) {
        return this.history;
      } else {
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
  z-index: 0;
  padding: 0 0 100px;
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
    background: #0084ff;
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
