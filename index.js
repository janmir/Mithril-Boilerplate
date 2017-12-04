import m from "./mithril.js"
import anime from './anime.js'

var App = {  
  oninit: function(vnode){
    console.log("--oninit--");
  },

  oncreate: function(vnode) {
    console.log("--oncreate--");
  },

  view: function(vnode) {
    console.log("--view--");
    return m("#hello", "Hello! Worlds!!!!");
  }
}

m.mount(document.getElementById("root"), App);