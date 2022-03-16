<script>
import Loading from './components/Loading.vue'
export default {
  data() {
    return {
      url: 'google.com',
      look_for: 'myself',
      mode: 'input',
      ip: 'N/A',
      country: 'N/A',
      region: 'N/A',
      timezone: 'N/A',
      city: 'N/A',
      coordinates: 'N/A',
      lookup_loading: false
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
    back() {
      this.setMode('input')
      setTimeout(() => {
        if (this.$refs.url && this.look_for === 'url')
          this.$refs.url.select()
      }, 1)
    },
    lookup: async function() {
      if (this.lookingForMyself) {
        this.lookup_loading = true
        await this.lookupMyself()
      } else if (this.url.trim()) {
        this.lookup_loading = true
        await this.lookupURL()
      } else {
        return;
      }
      this.mode = 'output'
      this.lookup_loading = false
    },
    setOutput(data) {
      this.ip = data.ip ? data.ip : 'N/A'
      this.country = data.country ? data.country : 'N/A'
      let query = ""
      let queryLL = ""
      const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
      if (data.country) {
        query = regionNamesInEnglish.of(data.country)
      }
      this.region = data.region ? data.region : 'N/A'
      if (data.region) {
        query = `${data.region}, ${regionNamesInEnglish.of(data.country)}`
      }
      this.timezone = data.timezone ? data.timezone : 'N/A'
      this.city = data.city ? data.city : 'N/A'
      if (data.city) {
        query = `${data.city}, ${data.region}, ${regionNamesInEnglish.of(data.country)}`
      }
      if (data.ll) {
        let latitude = data.ll[0] > 0 ? `${data.ll[0]}°N` : `${data.ll[0]}°S`
        let longitude = data.ll[1] > 0 ? `${data.ll[1]}°E` : `${data.ll[1]}°W`
        this.coordinates = `${latitude}, ${longitude}`
        queryLL = `${data.ll[0]}, ${data.ll[1]}`
      }
      let queryString = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB_LFO1wB7HlWiDPLWtbEu2qRSz6iJDqOA
      &q=${query}
      &center=${queryLL}
      &zoom=4
      &maptype=roadmap`
      this.$refs.iframe.src = queryString
    },
    lookupMyself: async function() {
      await fetch('/getIpInfo')
        .then(res => res.json())
        .then(data => {
          this.setOutput(data);
        })
    },
    lookupURL: async function() {
      await fetch(`/getDomainInfo?domain=${encodeURI(this.url)}`)
      .then(res => res.json())
      .then(data => {
        this.setOutput(data);
      });
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
  },
  mounted() {
    // listen for escape
    window.addEventListener('keydown', e => {
      if (e.key == 'Escape') {
        if (this.mode === 'output') {
          this.back()
        }
      }
    })
  },
  components: { Loading }
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
      <div class="lookup">
        <button @click="lookup" :class="{'invisible': lookup_loading}">Lookup</button>
        <Loading class="loading" v-if="lookup_loading"></Loading>
      </div>
    </div>
    <!-- Country: US
    Region: NY
    Timezone: America/New_York
    City: Stony Brook
    Coordinates: 40.9076° N, -73.122° W -->
    <div class="output-mode" v-if="modeIsOutput">
      <span><b>IP:</b> {{ ip }}</span>
      <span><b>Country:</b> {{ country }}</span>
      <span><b>Region:</b> {{ region }}</span>
      <span><b>Timezone:</b> {{ timezone }}</span>
      <span><b>City:</b> {{ city }}</span>
      <span><b>Coordinates:</b> {{ coordinates }}</span>
      <button class="back" @click="back">Back</button>
    </div>
  </div>
</div>
<div class="right">
<iframe
  id="map-iframe"
  ref='iframe'
  style="border:0"
  loading="lazy"
  allowfullscreen
  src="https://www.google.com/maps/embed/v1/view?key=AIzaSyB_LFO1wB7HlWiDPLWtbEu2qRSz6iJDqOA
  &center=0,0
  &zoom=2
  &maptype=roadmap">
</iframe>
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
#map-iframe {
  width: 100%;
  height: 100%;
}
#app {
  display: grid;
  grid-template-columns: 350px 1fr;
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

.slider span:not(.selected) {
  border: 1px solid #808080;
}

.slider span:not(.selected):hover {
  background: #f5f5f5;
}
.left h1 {
  text-align: center;
}
.left-body {
  width: 280px;
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
  cursor: pointer;
}
.lookup, .back {
  align-self: flex-end;
}
.lookup {
  position: relative;
}
.loading {
  position: absolute;
  right: 25px;
  top: 5px;
  align-self: flex-end;
}
.right {
  background: #e5e3df;
}
.disabled {
  pointer-events: none;
  opacity: 0.1;
}
.invisible {
  visibility: hidden;
}
</style>