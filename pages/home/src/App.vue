<script>
export default {
  data() {
    return {
      url: 'google.com',
      mode: 'myself'
    }
  },
  computed: {
    modeIsMyself() {
      return this.mode === 'myself'
    },
    modeIsURL() {
      return this.mode === 'url'
    }
  },
  methods: {
    lookup() {
      console.log(this.url)
    },
    setMode(mode) {
      this.mode = mode
      if (mode === 'url') {
        this.$refs.url.select()
      }
    }
  }
}
</script>

<template>
<div class="left">
  <h1>IP and Address Lookup</h1>
  <div class="left-body">
    <div class="slider">
      <span :class="{'selected': modeIsMyself}" @click="setMode('myself')">For myself</span>
      <span :class="{'selected': modeIsURL}" @click="setMode('url')">For URL</span>
    </div>
    <div class="input" :class="{'disabled': modeIsMyself}">
      <span>Enter URL</span>
      <input type="text" v-model="url" @keyup.enter="lookup" ref="url">
    </div>
    <button class="lookup" @click="lookup">Lookup</button>
  </div>
</div>
<div class="right">

</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp');
html, body, #app {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
}
.left {
  width: 600px;
  display: flex;
  gap: 24px;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.slider {
  display: flex;
  gap: 16px;
}
.slider span {
  background: white;
  color: black;
  padding: 10px;
  border-radius: 7px;
  user-select: none;
  cursor: pointer;
}
.slider .selected {
  font-weight: bold;
  color: white;
  background: black;
}
/* get .slider span with not selecte class */
.slider span:not(.selected):hover {
  background: #f5f5f5;
}
.input {
  display: flex;
  flex-direction: column;
}
.input input {
  width: 225px;
}
input[type=text] {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #808080;
  border-radius: 7px;
  margin-top: 6px;
}
.left-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
button {
  border: none;
  background: black;
  color: white;
  padding: 10px;
  border-radius: 7px;
  font-size: 16px;
  font-weight: bold;
  width: fit-content;
  cursor: pointer;
}
button:hover {
  background: #333;
}
.lookup {
  align-self: flex-end;
}
.right {
  width: 100%;
  background: blue;
}
.disabled {
  pointer-events: none;
  opacity: 0.1;
}
</style>