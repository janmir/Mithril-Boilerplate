import m from "./mithril.js"
import anime from './anime.js'

/*********************SVGs************************/
import back from './images/back.svg'

/*********************Flow************************/
//Lol
//<drop Top bar, show online/offline>
//? -> ken
//Hoy! maghimu daw ta group message, ready namu? (with subtitle)
//(Y) -> jake, shine, kuting, bess, jp, kath, denz, charles, em, 
//Whatever man -> chrish
//Nice.
//Okay, let's make this one quick.
//.
//.
//.
//Hello World,
//We are batch 19.
//To start here are some throwbacks.
//<pic><pic><pic>
//(puke) "gross"? <sticker>
//I know right?,...hahahaha
//Next.
//I belive you guys have something to say.
//<pic> message X10
//insert ken/mark/jessie reactions
//We done?
//Ok good.
//Phew! amazing 5 years, congrats!
//otsukaresama deshita minna! <sticker>
//Before i end this, I would like to say thanks to 
//--kyasu for our christmas dinner this 25th!
//--bossing for the visit *soon - chicken joy please.
//--bessie & shine for the disgusting pics!
//--marvel for the new avengers movie
//--DC for trying :D 
//--笑
//Now, i'll leave you with a slideshow of our more recent pics.
//enjoi!
//bye bye!
//yeah! <drop mic> <sticker>
//<pics><pic><pic>
//以上
//to offline all in order nice! random permutation
//name is now offline
/*********************Data************************/
/*
[
  {//scene
    name: ["jan miranda"],
    left: false,
    message: [ //message 1
          {
            content:{
              type: "message", //message(chat message), text(center message), image, function
              data: "message here",
              data: ()=>{
                //show element
              },
              data: [
                {
                  url:"",
                  zoom: false,
                  zoom_in: false,
                }
              ]
            },
            delay: 100, //ms,
            subtitle: ""
          },
          ...
    ]
  },
  {[...]} //scene/message 2
]
*/
/*********************Snippets************************/
/*
  anime({
    targets: el,
    opacity: [
      { value: 1, duration: 500, delay: 0, easing: 'easeInOutSine' }
    ],
    rotate: [
      { value: 0, duration: 500, delay: 0, easing: 'easeInOutSine' }
    ],
  });
*/
/*********************Scenes************************/
var Scenes = {
  timeline: 0,
  
  getScene: ()=>{
    return m("#messages",
      [
        m(Message, {msg: "This is a sample sentence.", isLeft: true, name: "Jan Miranda"}),
        m(Message, {msg: "This one is supposed to be longer but i can't think of any words to write anymore. Sad, really sad.", isLeft: false, name: "Jan Miranda"}),
        m(Text, {text: "Jan", sub: "is now offline"}),
        m(Text, {text: "Kuting", sub: "is now offline"}),
        m(Text, {text: "Kennron", sub: "is now offline"}),
        
        //Top most element
        m(TopBar),
      ]
    );
  }
}
/*********************Components************************/
var TouchFeedBack = {
  view: (vnode)=>{
    console.log("--view--");
    return m("#hello2", "Hello! Worlds Po!!!!");
  } 
}
var BigPics = {
  view: (vnode)=>{
    console.log("--view--");
    return m("#hello2", "Hello! Worlds Po!!!!");
  } 
}
var Text = {
  view: (vnode)=>{
    return m(".text", [
      m("span.text_main", vnode.attrs.text),
      " ",
      m("span.text_sub", vnode.attrs.sub)
    ]);
  } 
}
var TopBar = {
  showAll: (node)=>{
    let nodes = node.querySelectorAll(".avatar");
    anime({
      targets: nodes,
      opacity: [
        { value: 1, duration: 300, easing: 'easeInOutSine' }
      ],
      scale: [
        { value: 0, duration: 0, easing: 'easeInOutSine' },
        { value: 1, duration: 1200, delay: 10, easing: 'easeOutElastic' }
      ],
      delay: function(target, index) {
        return index * 200;
      },
    });
  },
  oncreate: (vnode)=>{
    TopBar.showAll(vnode.dom);
  },
  view: (vnode)=>{
    return m(".topBar", [
      m(".topBar_left", [
        m.trust(back),
        "Batch19, Thenaj"
      ]),
      m(".topBar_center",[
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Jan Miranda", src: "./images/jp.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Jake Santiago", src: "./images/jake.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Sheena Mae Egama", src: "./images/shine.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Christine Ronquillo", src: "./images/kuting.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Bessie Mae Carnaje", src: "./images/bessie.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Charles Go", src: "./images/charles.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Catherine Idul", src: "./images/cath.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Dennis Alvarez", src: "./images/dennis.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Emelyn Raneses", src: "./images/em.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Christopher Maister", src: "./images/chrish.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Mark Cordova", src: "./images/mark.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Jessie De Guia Seva", src: "./images/0.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Kennron Damsin", src: "./images/ken.jpg"}),
      ]),
      m(".topBar_right", "Details"),      
    ]);
  } 
}
var Message = {
  view: (vnode)=>{
    let isLeft = vnode.attrs.isLeft;
    let isProfile = false;
    let name = vnode.attrs.name;
    let msg = vnode.attrs.msg;
    
    return m(".message",{
        className:  isLeft? "message_left":"message_right"
      } ,[
      m(".name", "Jan Miranda"),
      m(Bubble, {message: msg, isLoading: false, isLeft: isLeft}),
      m(Bubble, {message: "•••", isLoading: true, isLeft: isLeft}),
      m(Avatar, {isLeft: isLeft, isOnline: true, isProfile: false, name: name})
    ]);
  } 
}
var Avatar = {
  oncreate: (vnode)=>{
    if(vnode.attrs.isLeft !== null){
      let el = vnode.dom;
      el.classList.add("avatar_animate");
    }
  },
  view: (vnode)=>{
    let isLeft = vnode.attrs.isLeft;
    return m(".avatar",{
      className: isLeft !== null ? vnode.attrs.isLeft?"avatar_left":"avatar_right":"avatar_inline"
    },[
      m("img.avatar_image", {src: vnode.attrs.src || "./images/0.jpg"}),
      m(".avatar_status", {
        className: vnode.attrs.isOnline?"avatar_status_online":"avatar_status_offline"
      }),
      vnode.attrs.isProfile ? m(".avatar_name", vnode.attrs.name) : null,
    ]);
  } 
}
var Bubble = {
  oncreate: (vnode)=>{
    let el = vnode.dom.querySelector(".bubble");
    let rotate = vnode.attrs.isLeft ?"bubble_rotate_left":"bubble_rotate_right";
    el.classList.add(rotate);

    if(vnode.attrs.isLoading){
      setTimeout(()=>{
        let float = vnode.attrs.isLeft ?"bubble_float_left":"bubble_float_right";
        el.classList.replace(rotate, float);
      }, 1000);
    }
  },
  view: (vnode)=>{
    let classes = [];
    classes.push( vnode.attrs.isLeft ? "bubble_left":"bubble_right");
    
    if(!vnode.attrs.isLoading){
      return m(".bubble_parent", 
        m(".bubble",{
          className: classes
        }, vnode.attrs.message)
      );
    }else{
      return m(".bubble_parent", 
        m(".bubble", {
          className: classes
        },m(LoadingDots))
      );
    }
  } 
}
var LoadingDots = {
  oncreate: (vnode)=>{
    let els = vnode.dom.querySelectorAll(".dot");
    anime({
      targets: els,
      opacity: [
        { value: 0.3, duration: 300, easing: 'easeInOutSine' }
      ],
      scale: [
        { value: 1.1, duration: 300, easing: 'easeInOutSine' }
      ],
      direction: 'alternate',
      loop: true,
      delay: function(target, index) {
        return index * 200;
      },
    });
  },
  view: (vnode)=>{
    return m(".loading_dots",[
      m(".dot"),
      m(".dot"),
      m(".dot")
    ]);
  } 
}
var LoadingCartWheel = {
  view: (vnode)=>{
    console.log("--view--");
    return m("#hello3", "Hello! Worlds Po!!!!");
  } 
}
var App = {  
  view: (vnode)=>{
    return Scenes.getScene();
  }
}

//Mount it baby one more time.
m.mount(document.getElementById("root"), App);