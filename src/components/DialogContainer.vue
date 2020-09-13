<template>
  <v-row>
    <ul class="dialog px-3" ref="dialog">
      <li
        v-for="(message, index) in history"
        v-bind:key="index"
        :class="message.owner"
      >
        {{ message.text }}
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
  watch: {
    history() {
      this.$nextTick(() => {
        let el = this.$refs.dialog;
        el.scrollTop = el.scrollHeight - el.clientHeight;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
  overflow-y: scroll;
  height: 600px;
  z-index: 0;
  padding-bottom: 100px;
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
