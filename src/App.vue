<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container >
        <v-row>
          <ul class="dialog" ref="dialog">
            <li v-for="(message, index) in history" v-bind:key="index" :class="message.owner">{{message.text}}</li>
          </ul>
        </v-row>
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
              <v-btn @click="send" x-large color="primary" class="mr-2" :disabled="!active">Send Message</v-btn>
              <v-btn @click="start" x-large color="primary" class="mr-2" :disabled="active">Start</v-btn>
              <v-btn @click="end" x-large color="primary" class="mr-2" :disabled="!active">End</v-btn>
          </v-flex>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    next: 0,
    input: '',
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
      }
    ],
    history:[],
    userData:{},
  }),
  methods: {
    send() {
      if(!this.input){
        return
      }
      let currentBotMessage=this.messages[this.next-1]
      if(currentBotMessage.ask){
        this.userData[currentBotMessage.ask]=this.input
      }
      this.addMessageToHistory({
        text: this.input,
        owner: "me"
      })
      this.input=""
      this.botSend()
    },
    botSend(){
      if(!this.messages[this.next]){
        this.end()
        return
      }
      this.addMessageToHistory({
        owner: "him",
        ...this.messages[this.next]
      })

      this.next++
      if(!this.messages[this.next-1].ask){
        this.botSend();
      }
    },
    scrollToBottom(){
      this.$nextTick(()=>{
        let el = this.$refs.dialog
        el.scrollTop = el.scrollHeight - el.clientHeight;
      })
    },
    addMessageToHistory(message={}){
      this.history.push(message)
      this.scrollToBottom()
    },
    start(){
      this.active=true
      this.next=0
      this.history=[]
      this.userData={}
      this.botSend()
    },
    end(){
      this.active=false
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss">
  .dialog{
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    left: 0;
    right: 0;
    overflow-y: scroll;
    height:600px;
    z-index: 0;
    padding-bottom: 100px;
    li{
      display:inline-block;
      clear: both;
      padding: 20px;
      border-radius: 30px;
      margin-bottom: 2px;
      font-family: Helvetica, Arial, sans-serif;
    }
    .him{
      background: #eee;
      float: left;
      & + .me{
        border-bottom-right-radius: 5px;
      }
    }

    .me{
      float: right;
      background: #0084ff;
      color: #fff;
      &  + .me{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &:last-of-type {
        border-bottom-right-radius: 30px;
      }
    }
  }
  .textarea-container{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    z-index: 100;
    background: #ffffff;
  }




</style>
