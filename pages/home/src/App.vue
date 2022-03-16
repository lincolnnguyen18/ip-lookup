<script>
export default {
  data() {
    return {
      url: 'google.com',
      look_for: 'myself',
      mode: 'input',
      country: 'N/A',
      region: 'N/A',
      timezone: 'N/A',
      city: 'N/A',
      coordinates: 'N/A',
    }
  },
  computed: {
    lookingForMyself() {
      return this.look_for === 'myself'
    },
    lookingForURL() {
      return this.look_for === 'url'
    },
    modeIsInput() {
      return this.mode === 'input'
    },
    modeIsOutput() {
      return this.mode === 'output'
    }
  },
  methods: {
    lookup() {
      this.mode = 'output'
      console.log(this.url)
    },
    setLookfor(look_for) {
      this.look_for = look_for
      if (look_for === 'url') {
        this.$refs.url.select()
      }
    },
    setMode(mode) {
      this.mode = mode
    }
  }
}
</script>

<template>
<div class="left">
  <h1>IP and Address<br />Lookup</h1>
  <div class="left-body">
    <div class="input-mode" v-if="modeIsInput">
      <div class="slider">
        <span :class="{'selected': lookingForMyself}" @click="setLookfor('myself')">For myself</span>
        <span :class="{'selected': lookingForURL}" @click="setLookfor('url')">For URL</span>
      </div>
      <div class="input" :class="{'disabled': lookingForMyself}">
        <span>Enter URL</span>
        <input type="text" v-model="url" @keyup.enter="lookup" ref="url">
      </div>
      <button class="lookup" @click="lookup">Lookup</button>
    </div>
    <!-- Country: US
    Region: NY
    Timezone: America/New_York
    City: Stony Brook
    Coordinates: 40.9076° N, -73.122° W -->
    <div class="output-mode" v-if="modeIsOutput">
      <span><b>Country:</b> {{ country }}</span>
      <span><b>Region:</b> {{ region }}</span>
      <span><b>Timezone:</b> {{ timezone }}</span>
      <span><b>City:</b> {{ city }}</span>
      <span><b>Coordinates:</b> {{ coordinates }}</span>
      <button class="back" @click="setMode('input')">Back</button>
    </div>
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
#app {
  display: grid;
  grid-template-columns: 333px 1fr;
}
.left {
  display: flex;
  gap: 24px;
  flex-direction: column;
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
.left h1 {
  text-align: center;
}
.left-body {
  width: 200px;
}
.input {
  display: flex;
  flex-direction: column;
}
.input input {
  width: 100%;
}
input[type=text] {
  font-size: 16px;
  padding: 10px;
  border: 1px solid #808080;
  border-radius: 7px;
  margin-top: 6px;
  box-sizing: border-box;
}
.input-mode {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.output-mode {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-content: flex-start;
  width: 100%;
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
.lookup, .back {
  align-self: flex-end;
}
.right {
  background: blue;
}
.disabled {
  pointer-events: none;
  opacity: 0.1;
}
</style>