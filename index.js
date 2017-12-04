import m from "./mithril.js"
import anime from './anime.js'

/*********************Flow************************/
//Lol
//<drop Top bar, show online/offline>
//? -> ken
//Hoy! maghimu daw ta group message, ready namu? (with subtitle)
//(Y) -> jake, shine, kuting, bess, jp, kath, denz, charles, em, chrish
//Okay let's make this one quick.
//.
//.
//Hello,
//We are batch 19.
//Let us start with some throwbacks.
//<pic><pic><pic>
//(puke) "gross"? <sticker>
//I know right?,...hahahaha
//Next.
//I belive you guys have something to say.
//<pic> message X10
//insert ken/mark/jessie reactions
//we done?
//ok good.
//phew! amazing 5 years.
//otsukaresama deshita minna! <sticker>
//before i end this, I would like to say thanks to 
//--kyasu for our christmas dinner this 25th!
//--bossing for the visit *soon
//--bessie & shine for the disgusting pics!
//--marvel for the new avengers movie
//--DC for trying :D 笑
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
  getScene: ()=>{
    return m("#messages",
      [
        m(Message, {isLeft: true}),
        m(Message, {isLeft: false}),
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
var TopBar = {
  view: (vnode)=>{
    return m(".topBar", [

    ]);
  } 
}
var Message = {
  view: (vnode)=>{
    let isLeft = vnode.attrs.isLeft;
    return m(".message",{
        className:  isLeft? "message_left":"message_right"
      } ,[
      m(".name", "Jan Miranda"),
      m(Bubble, {message: "Hello there angel from my nightmare.", isLoading: false, isLeft: isLeft}),
      m(Bubble, {message: "•••", isLoading: true, isLeft: isLeft}),
      m(Avatar, {isLeft: isLeft, isOnline: true})
    ]);
  } 
}
var Avatar = {
  view: (vnode)=>{
    return m(".avatar",{
      className: vnode.attrs.isLeft?"avatar_left":"avatar_right"
    },
      m(".avatar_status", {
        className: vnode.attrs.isOnline?"avatar_status_online":"avatar_status_offline"
      })
    );
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
        { value: 0.3, duration: 500, easing: 'easeInOutSine' }
      ],
      scale: [
        { value: 1.1, duration: 500, easing: 'easeInOutSine' }
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
  oninit: (vnode)=>{
  },

  oncreate: (vnode)=>{
  },

  view: (vnode)=>{
    return Scenes.getScene();
  }
}

//Mount it baby one more time.
m.mount(document.getElementById("root"), App);