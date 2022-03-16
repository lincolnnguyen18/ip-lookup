import { o as openBlock, c as createElementBlock, a as createBaseVNode, n as normalizeClass, w as withDirectives, v as vModelText, b as withKeys, d as createCommentVNode, e as createTextVNode, t as toDisplayString, F as Fragment, f as createApp } from "./vendor.69fb1ce0.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var App_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {
  data() {
    return {
      url: "google.com",
      look_for: "myself",
      mode: "input",
      ip: "N/A",
      country: "N/A",
      region: "N/A",
      timezone: "N/A",
      city: "N/A",
      coordinates: "N/A"
    };
  },
  computed: {
    lookingForMyself() {
      return this.look_for === "myself";
    },
    lookingForURL() {
      return this.look_for === "url";
    },
    modeIsInput() {
      return this.mode === "input";
    },
    modeIsOutput() {
      return this.mode === "output";
    }
  },
  methods: {
    lookup: async function() {
      console.log(this.look_for);
      console.log(this.lookingForMyself);
      console.log(this.lookingForURL);
      if (this.lookingForMyself) {
        await this.lookupMyself();
      } else {
        await this.lookupURL();
      }
      this.mode = "output";
    },
    lookupMyself: async function() {
      await fetch("/getIpInfo").then((res) => res.json()).then((data) => {
        this.ip = data.ip ? data.ip : "N/A";
        this.country = data.country ? data.country : "N/A";
        let query = "";
        let queryLL = "";
        if (data.country) {
          query = data.country;
        }
        this.region = data.region ? data.region : "N/A";
        if (data.region) {
          query = `${data.region}, ${data.country}`;
        }
        this.timezone = data.timezone ? data.timezone : "N/A";
        this.city = data.city ? data.city : "N/A";
        if (data.city) {
          query = `${data.city}, ${data.region}, ${data.country}`;
        }
        if (data.ll) {
          let latitude = data.ll[0] > 0 ? `${data.ll[0]}\xB0N` : `${data.ll[0]}\xB0S`;
          let longitude = data.ll[1] > 0 ? `${data.ll[1]}\xB0E` : `${data.ll[1]}\xB0W`;
          this.coordinates = `${latitude}, ${longitude}`;
          queryLL = `${data.ll[0]}, ${data.ll[1]}`;
        }
        let queryString = `https://www.google.com/maps/embed/v1/place?key=AIzaSyB_LFO1wB7HlWiDPLWtbEu2qRSz6iJDqOA
          &q=${query}
          &center=${queryLL}
          &zoom=3
          &maptype=roadmap`;
        this.$refs.iframe.src = queryString;
      });
    },
    lookupURL: async () => {
      return null;
    },
    setLookfor(look_for) {
      this.look_for = look_for;
      if (look_for === "url") {
        this.$refs.url.select();
      }
    },
    setMode(mode) {
      this.mode = mode;
    }
  }
};
const _hoisted_1 = { class: "left" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("h1", null, [
  /* @__PURE__ */ createTextVNode("IP and Address"),
  /* @__PURE__ */ createBaseVNode("br"),
  /* @__PURE__ */ createTextVNode("Lookup")
], -1);
const _hoisted_3 = { class: "left-body" };
const _hoisted_4 = {
  key: 0,
  class: "input-mode"
};
const _hoisted_5 = { class: "slider" };
const _hoisted_6 = /* @__PURE__ */ createBaseVNode("span", null, "Enter URL", -1);
const _hoisted_7 = {
  key: 1,
  class: "output-mode"
};
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("b", null, "IP:", -1);
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("b", null, "Country:", -1);
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("b", null, "Region:", -1);
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("b", null, "Timezone:", -1);
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("b", null, "City:", -1);
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("b", null, "Coordinates:", -1);
const _hoisted_14 = { class: "right" };
const _hoisted_15 = {
  id: "map-iframe",
  ref: "iframe",
  style: { "border": "0" },
  loading: "lazy",
  allowfullscreen: "",
  src: "https://www.google.com/maps/embed/v1/view?key=AIzaSyB_LFO1wB7HlWiDPLWtbEu2qRSz6iJDqOA\n  &center=0,0\n  &zoom=2\n  &maptype=roadmap"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      _hoisted_2,
      createBaseVNode("div", _hoisted_3, [
        $options.modeIsInput ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("span", {
              class: normalizeClass({ "selected": $options.lookingForMyself }),
              onClick: _cache[0] || (_cache[0] = ($event) => $options.setLookfor("myself"))
            }, "For myself", 2),
            createBaseVNode("span", {
              class: normalizeClass({ "selected": $options.lookingForURL }),
              onClick: _cache[1] || (_cache[1] = ($event) => $options.setLookfor("url"))
            }, "For URL", 2)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["input", { "disabled": $options.lookingForMyself }])
          }, [
            _hoisted_6,
            withDirectives(createBaseVNode("input", {
              type: "text",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.url = $event),
              onKeyup: _cache[3] || (_cache[3] = withKeys((...args) => $options.lookup && $options.lookup(...args), ["enter"])),
              ref: "url"
            }, null, 544), [
              [vModelText, $data.url]
            ])
          ], 2),
          createBaseVNode("button", {
            class: "lookup",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.lookup && $options.lookup(...args))
          }, "Lookup")
        ])) : createCommentVNode("", true),
        $options.modeIsOutput ? (openBlock(), createElementBlock("div", _hoisted_7, [
          createBaseVNode("span", null, [
            _hoisted_8,
            createTextVNode(" " + toDisplayString($data.ip), 1)
          ]),
          createBaseVNode("span", null, [
            _hoisted_9,
            createTextVNode(" " + toDisplayString($data.country), 1)
          ]),
          createBaseVNode("span", null, [
            _hoisted_10,
            createTextVNode(" " + toDisplayString($data.region), 1)
          ]),
          createBaseVNode("span", null, [
            _hoisted_11,
            createTextVNode(" " + toDisplayString($data.timezone), 1)
          ]),
          createBaseVNode("span", null, [
            _hoisted_12,
            createTextVNode(" " + toDisplayString($data.city), 1)
          ]),
          createBaseVNode("span", null, [
            _hoisted_13,
            createTextVNode(" " + toDisplayString($data.coordinates), 1)
          ]),
          createBaseVNode("button", {
            class: "back",
            onClick: _cache[5] || (_cache[5] = ($event) => $options.setMode("input"))
          }, "Back")
        ])) : createCommentVNode("", true)
      ])
    ]),
    createBaseVNode("div", _hoisted_14, [
      createBaseVNode("iframe", _hoisted_15, "\n", 512)
    ])
  ], 64);
}
var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
createApp(App).mount("#app");
