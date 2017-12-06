import m from "./mithril.js"
import anime from './anime.js'

/*********************SVGs************************/
import back from './static/back.svg'
import { setTimeout } from "timers";

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
/*********************Snippets************************/
/*
  oldChild = Array.prototype.slice.call(oldChild);
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
/*********************Data************************/
const replyDelay = 2000;
const textDelay = 200;
const data = [
  {
    delay: 1000,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Janeth Elano", sub: "joined the group."},
      }}
    ]
  },  
  {//thenaj
    name: "Janeth Elano",
    src: "./static/thenaj.jpg",
    left: true,
    online: true,
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "LOL",
        },
        pre_delay: 1000,
        post_delay: replyDelay,
        subtitle: null
      },
    ]
  },
  {//ken
    name: "Kennron Damsid",
    src: "./static/ken.jpg",
    left: false,
    online: false,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "?",
        },
        pre_delay: 500, 
        post_delay: replyDelay,
        subtitle: null
      }
    ]
  },
  {//online-kuting
    delay: textDelay,
    message: [ 
    {content:{
        type: "text",
        data: {text: "Christine", sub: "is now online."},
      }}
    ]
  },  
  {//online-jp
    delay: textDelay,
    message: [ 
    {content:{
        type: "text",
        data: {text: "Jp", sub: "is now online."},
      }}
    ]
  },  
  {//online-jake
    delay: textDelay,
    message: [ 
    {content:{
        type: "text",
        data: {text: "Jake", sub: "is now online."},
      }}
    ]
  },  
  {//online-shine
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Sheena Mae", sub: "is now online."},
        }}
    ]
  },  
  {//online-bessie
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Bessie Mae", sub: "is now online."},
        }}
    ]
  },  
  {//online-cath
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Pikyasu", sub: "is now online."},
        }}
    ]
  },  
  {//online-dennis
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Dennis", sub: "is now online."},
        }}
    ]
  },  
  {//online-christopher
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Christopher", sub: "is now online."},
        }}
    ]
  },  
  {//online-charles
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Charles", sub: "is now online."},
        }}
    ]
  },  
  {//online-em
    delay: 1000,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Emelyn", sub: "is now online."},
        }}
    ]
  },  
  {//thenaj
    name: "Janeth Elano",
    src: "./static/thenaj.jpg",
    left: true,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "Hoy, mga ate og kuya!",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Paghimu daw mo og message.",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "5-year anniversary, char!",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
    ]
  },
  {//mark
    name: "Mark Cordova",
    src: "./static/mark.jpg",
    left: false,
    online: false,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "HAHAHAHAHA XD! Congrats mga Migs!",
        },
        pre_delay: 2000, 
        post_delay: replyDelay,
        subtitle: null
      }
    ]
  },
  {//thenaj
    name: "Janeth Elano",
    src: "./static/thenaj.jpg",
    left: true,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "Ready namu?",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
    ]
  },
  {//chrish
    name: "Christopher Maister",
    src: "./static/chrish.jpg",
    left: false,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "Yeah, whatever.",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
    ]
  },
  {//dennis
    name: "Dennis Alvarez",
    src: "./static/dennis.jpg",
    left: false,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "::trap::",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      }
    ]
  },
  {//kuting
    name: "Christine Ronquillo",
    src: "./static/kuting.jpg",
    left: false,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "::like::",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      }
    ]
  },
  {//me
    name: "Jan Paul Miranda",
    src: "./static/jp.jpg",
    left: false,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "::noooo::",
        },
        pre_delay: 200, 
        post_delay: 500,
        subtitle: null
      },
    ]
  },
  {//thenaj
    name: "Janeth Elano",
    src: "./static/thenaj.jpg",
    left: true,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "Nice!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Let's make this \"Short But Sweet\"!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: ".",
        },
        pre_delay: 0, 
        post_delay: 200,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: ".",
        },
        pre_delay: 0, 
        post_delay: 200,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: ".",
        },
        pre_delay: 0, 
        post_delay: 2000,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "::hi::",
        },
        pre_delay: 0, 
        post_delay: 500,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Hello minna-san!",
        },
        pre_delay: 1000, 
        post_delay: 3000,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "First, here are some throwbacks.",
        },
        pre_delay: 4000, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "{{1,2,3,4,5}}",
        },
        pre_delay: 200, 
        post_delay: 1000 * 3 * (5 + 2),
        subtitle: null
      }
    ]
  },
  {//Charles
    name: "Charles Go",
    src: "./static/charles.jpg",
    left: false,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "HAHA",
        },
        pre_delay: 4000, 
        post_delay: replyDelay,
        subtitle: null
      }
    ]
  },
  {//thenaj
    name: "Janeth Elano",
    src: "./static/thenaj.jpg",
    left: true,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "I know right!",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Next!",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "I believe you guys want to say something?",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Let's start with Kuting. XD",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
    ]
  },
  {//kuting
    name: "Christine Ronquillo",
    src: "./static/kuting.jpg",
    left: false,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "Hello, I'm Kuting.",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "::kuting::",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Ummm",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Just wanna say...",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Sa tanang naa utang naku",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Bayad namu!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Also,",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Thanks, AWS.",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      }
    ]
  },
  {//thenaj
    name: "Janeth Elano",
    src: "./static/thenaj.jpg",
    left: true,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "Kyasu! I choose you!",
        },
        pre_delay: 100, 
        post_delay: replyDelay,
        subtitle: null
      },
    ]
  },
  {//Cath
    name: "Catherine Gallardo Idul",
    src: "./static/cath.jpg",
    left: false,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "Err....mam? K",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "::cath::",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Cath here.",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Cath there.",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "AWS",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Thanks & Goodbye!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
    ]
  },
  {//me
    name: "Jan Miranda",
    src: "./static/jp.jpg",
    left: true,
    online: true,    
    delay: 0,
    message: [ 
      {
        content:{
          type: "message",
          data: "We done?",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "Good!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      }, 
      {
        content:{
          type: "message",
          data: "Phew! amazing 5 years, congrats!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      //otsukaresama deshita minna! <sticker>
      {
        content:{
          type: "message",
          data: "Otsukaresamadeshita minna!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      //Before i end this, I would like to say thanks to 
      {
        content:{
          type: "message",
          data: "Before i end this, I would like to say thanks to:",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      //--kyasu for our christmas dinner this 25th!
      {
        content:{
          type: "message",
          data: "1. Kyasu: for our christmas dinner this 25th!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      //--bossing for the visit *soon - chicken joy please.
      {
        content:{
          type: "message",
          data: "2. Bossing: for the visit *soon - chicken joy please.",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      //--bessie & shine for the disgusting pics!
      {
        content:{
          type: "message",
          data: "3. Kuting, em, bessie & shine: for the disgusting pics!",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      //--marvel for the new avengers movie
      {
        content:{
          type: "message",
          data: "4. Marvel: for the new avengers movie",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      //--DC for trying :D 
      {
        content:{
          type: "message",
          data: "& 5. DC for trying :D ",
        },
        pre_delay: 200, 
        post_delay: replyDelay,
        subtitle: null
      },
      /*{
        content:{
          type: "message",
          data: "::hi::",
        },
        pre_delay: 0, 
        post_delay: 500,
        subtitle: null
      },*/
      //Now, i'll leave you with a slideshow of our more recent pics.
      {
        content:{
          type: "message",
          data: "Now, I'll leave you with more pictures.",
        },
        pre_delay: 4000, 
        post_delay: replyDelay,
        subtitle: null
      },
      //enjoi!
      {
        content:{
          type: "message",
          data: "Enjoy!",
        },
        pre_delay: 4000, 
        post_delay: replyDelay,
        subtitle: null
      },
      {
        content:{
          type: "message",
          data: "{{13,7,8,9,10,11,12,14}}",
        },
        pre_delay: 200, 
        post_delay: 1000 * 3 * (7 + 2),
        subtitle: null
      }
    ]
  },
  {//offline-jessie
    delay: textDelay,
    message: [ 
    {content:{
        type: "text",
        data: {text: "Jessie", sub: "is already offline."},
      }}
    ]
  },  
  {//offline-mark
    delay: textDelay,
    message: [ 
    {content:{
        type: "text",
        data: {text: "Mark", sub: "is already offline."},
      }}
    ]
  },  
  {//offline-ken
    delay: 5000,
    message: [ 
    {content:{
        type: "text",
        data: {text: "Kennron", sub: "is already offline."},
      }}
    ]
  },  
  {//offline-cath
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Catherine", sub: "has gone offline."},
        }}
    ]
  }, 
  {//offline-charles
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Charles", sub: "has gone offline."},
        }}
    ]
  }, 
  {//offline-kuting
    delay: textDelay,
    message: [ 
    {content:{
        type: "text",
        data: {text: "Christine", sub: "has gone offline."},
      }}
    ]
  },  
  {//offline-jp
    delay: textDelay,
    message: [ 
    {content:{
        type: "text",
        data: {text: "JP", sub: "has gone offline."},
      }}
    ]
  },  
  {//offline-jake
    delay: textDelay,
    message: [ 
    {content:{
        type: "text",
        data: {text: "Jake", sub: "has gone offline."},
      }}
    ]
  },  
  {//offline-shine
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Sheena Mae", sub: "has gone offline."},
        }}
    ]
  },  
  {//offline-bessie
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Elaine", sub: "has gone offline."},
        }}
    ]
  },   
  {//offline-dennis
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Dennis", sub: "has gone offline."},
        }}
    ]
  },  
  {//offline-christopher
    delay: textDelay,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Christopher", sub: "has gone offline."},
        }}
    ]
  },   
  {//offline-em
    delay: 1000,
    message: [ 
      {content:{
          type: "text",
          data: {text: "Emelyn", sub: "has gone offline."},
        }}
    ]
  }, 
];
/*********************Scenes************************/
var Scenes = {
  scenes: [],

  timeline_main: 0,
  timeline_sub: 0,
  
  play: ()=>{
    let main = Scenes.timeline_main;
    let sub = Scenes.timeline_sub;    

    let el = data[main];

    let name = el.name || null;
    let left = el.left || false;
    let delay = el.delay || 0; //delay per scene
    let avatarSrc = el.src || null;
    let online = el.online || false;
    let message = el.message[sub] || null;

    //check if end
    let isStart = 0 == sub;
    let isEnd = el.message.length == sub;
    
    console.log("StartEnd:", isStart, isEnd);

    if(!isEnd && message !== null){
      let subtitle = message.subtitle || null;
      let content = message.content;
      let pre_delay = message.pre_delay || 0; //bubble loading
      let post_delay = message.post_delay + pre_delay || 0; //per message
      
      switch(content.type){
        case "text":{
          Scenes.scenes.push(
            m(Text, {text: content.data.text, sub: content.data.sub, delay: delay}),
          );    
        }break;
        case "picture":{

        }break;     
        case "message":{
          //start push it
          if(isStart){
            let msg = content.data || null;
            Scenes.scenes.push(
              Message.getMessage(
                {msg: msg, isLeft: left, name: name, src: avatarSrc, online: online,  delay: pre_delay}
              )
            );
          }
          //If not just update it
          else{
            let oldMessage = Scenes.scenes.pop();
            let msg = content.data || null;
            
            //push
            Scenes.scenes.push(
              Message.updateMessage(
                oldMessage, 
                {msg: msg, isLeft: left, name: name, src: avatarSrc, online: online, delay: pre_delay}
              )
            );
          }
        }break;
      }

      //call play again
      m.redraw();
      
      setTimeout(()=>{
        //increment
        Scenes.timeline_sub++;
        Scenes.play();
      }, post_delay);

    }else{
      console.log("End of current sub data.");

      //reset
      Scenes.timeline_main++;      
      Scenes.timeline_sub = 0;

      //check if end
      let isEnd = data.length == Scenes.timeline_main;

      if(!isEnd){
        setTimeout(()=>{
          Scenes.play();
        }, delay);
      }else{
        console.log("End of everything.");

        TopBar.hideAll();
      }
    }
  },

  getScene: ()=>{    
    return Scenes.scenes;
  }
}
/*********************Components************************/
var Text = {
  oncreate: (vnode)=>{
    let els = vnode.dom;
    let duration = vnode.attrs.delay / 2;
    anime({
      targets: els,
      opacity: [
        { value: 1, duration: duration, easing: 'easeInOutSine' }
      ]
    });
  },
  view: (vnode)=>{
    return m(".text", [
      m("span.text_main", vnode.attrs.text),
      " ",
      m("span.text_sub", vnode.attrs.sub)
    ]);
  } 
}
var TopBar = {
  shown: false,
  popTimeout: 10000,
  showAll: (node)=>{
    let nodes = node.querySelectorAll(".avatar");

    if(!TopBar.shown){
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
          return index * 100;
        },
        complete: ()=>{
          TopBar.shown = true;
        }
      });

    }else{
      nodes.forEach(el=>{
        el.style.opacity = 1;
        el.style.transform = "scale(1)";
      });
    }
  },
  hideAll: (node)=>{
    let nodes = document.querySelectorAll(".topBar_center .avatar");

    if(TopBar.shown){
      anime({
        targets: nodes,
        opacity: [
          { value: 0, duration: 300, easing: 'easeInOutSine' }
        ],
        scale: [
          { value: 0, duration: 1200, easing: 'easeOutElastic' }
        ],
        delay: function(target, index) {
          return index * 300;
        },
        complete: ()=>{
          TopBar.shown = false;
        }
      });

    }
  }, 
  oncreate: (vnode)=>{
    setTimeout(()=>{
      TopBar.showAll(vnode.dom);
    }, TopBar.popTimeout);
  },
  view: (vnode)=>{
    return m(".topBar", [
      m(".topBar_left", [
        m.trust(back),
        "Batch19, Thenaj"
      ]),
      m(".topBar_center",[
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Jan Miranda", src: "./static/jp.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Jake Santiago", src: "./static/jake.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Sheena Mae Egama", src: "./static/shine.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Christine Ronquillo", src: "./static/kuting.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Bessie Mae Carnaje", src: "./static/bessie.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Charles Go", src: "./static/charles.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Catherine Idul", src: "./static/cath.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Dennis Alvarez", src: "./static/dennis.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Emelyn Raneses", src: "./static/em.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Christopher Maister", src: "./static/chrish.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Mark Cordova", src: "./static/mark.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Jessie De Guia Seva", src: "./static/0.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Kennron Damsin", src: "./static/ken.jpg"}),
      ]),
      m(".topBar_right", "Details"),      
    ]);
  } 
}
var Message = {
  updateMessage: (message, data)=>{
    let oldChild = message.dom.querySelectorAll(".bubble_parent > .bubble > :first-child");    
    let newChild = [];

    //push majors
    newChild.push(m(".name", data.name));
    newChild.push(m(Avatar, {isLeft: data.isLeft, isOnline: true, isProfile: false, 
      name: data.name, src: data.src, isOnline: data.online}));

    //push old bubbles
    oldChild.forEach(el=>{
      let text = el.innerHTML || null;
      let src = el.src || null;

      console.log("----------", text, "-----", src)

      newChild.push(m(Bubble, {src: src, message: text, isLeft: data.isLeft}));
    });
    
    //push new bubble
    newChild.push(m(Bubble, {message: data.msg, isLeft: data.isLeft, animate: true, delay: data.delay}));
    
    return m(".message",{
      className:  data.isLeft? "message_left":"message_right"
    }, newChild);
  },
  getMessage: (data)=>{
    //play pop
    App.pop();

    return m(Message, data);
  },
  view: (vnode)=>{
    let isLeft = vnode.attrs.isLeft;
    let isProfile = false;
    let name = vnode.attrs.name;
    let msg = vnode.attrs.msg;
    let src = vnode.attrs.src;
    let online = vnode.attrs.online;
    let delay = vnode.attrs.delay || 100;
    
    return m(".message",{
        className:  isLeft? "message_left":"message_right"
      } ,[
        m(".name", name),
        m(Avatar, {isLeft: isLeft, isOnline: online, isProfile: false, name: name, src: src}),
        msg ? m(Bubble, {message: msg, isLeft: isLeft, animate: true, delay: delay}) : null,
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
      m("img.avatar_image", {src: vnode.attrs.src || "./static/0.jpg"}),
      m(".avatar_status", {
        className: vnode.attrs.isOnline?"avatar_status_online":"avatar_status_offline"
      }),
      vnode.attrs.isProfile ? m(".avatar_name", vnode.attrs.name) : null,
    ]);
  } 
}
var Bubble = {
  oncreate: (vnode)=>{
    let bubble = vnode.dom.querySelector(".bubble");
    let dots = bubble.querySelector(".loading_dots");
    let album = bubble.querySelector(".bubble_album");
    let image = bubble.querySelector(".bubble_image");
    let message = bubble.querySelector(".bubble_message");
    let animate = vnode.attrs.animate || false;
    let delay = vnode.attrs.delay / 2;
    
    if(image !== null){
      image.addEventListener("load", function() {
        image.style.display = "inline";
        bubble.style.backgroundColor = "white";      
        //window.scrollTo(0,document.querySelector("#root").scrollHeight);
      });
    }
    
    if(animate){
      //Rotate it
      let rotate = vnode.attrs.isLeft ?"bubble_rotate_left":"bubble_rotate_right";
      bubble.classList.add(rotate);

      setTimeout(()=>{
        //Float it
        let float = vnode.attrs.isLeft ?"bubble_float_left":"bubble_float_right";
        bubble.classList.replace(rotate, float);

        //Make it still
        setTimeout(()=>{
          //Remove float effect
          bubble.classList.remove(float);

          //Hide dots
          anime({
            targets: dots,
            opacity: [
              { value: 0, duration: 200, easing: 'easeInOutSine' }
            ],
            complete: (anim)=>{
              dots.style.display = "none";

              //show message
              if(message !== null){
                message.style.display = "inline";                

                anime({
                  targets: message,
                  opacity: [
                    { value: 1, duration: 400, easing: 'easeInOutSine' }
                  ]
                });

              }else if(album !== null){
                anime({
                  targets: image,
                  opacity: [
                    { value: 0.7, duration: 400, easing: 'easeInOutSine' }
                  ],
                  complete: ()=>{
                    App.scrollTop();
                  }
                });

                //resize
                bubble.classList.add("bubble_album_size");

                //show dimmer
                setTimeout(()=>{
                  let files = vnode.attrs.files;

                  App.showDimmer(files);                  
                },1000);

              }else if(image !== null){
                anime({
                  targets: image,
                  opacity: [
                    { value: 1, duration: 400, easing: 'easeInOutSine' }
                  ],
                  complete: ()=>{
                    App.scrollTop();
                  }
                });

                //resize
                bubble.classList.add("bubble_sticker");
                
              }
            }
          });
        }, delay);
      }, delay + 100);
    }else{
      dots.style.display = "none";

      if(message !== null){
        message.style.display = "inline";
        message.style.opacity = 1;
      }else   
      if(album !== null){
      }else  
      if(image !== null){
        image.style.display = "inline";
        image.style.opacity = 1;

        //resize
        bubble.classList.add("bubble_sticker");                        
      }        
    }
  },
  view: (vnode)=>{
    let classes = [];
    let data = vnode.attrs.message;
    let src = vnode.attrs.src;
    let count = 0;

    let isSticker = false;
    let isAlbum = false;
    let isMessage = false;
    
    //check if emoticon
    if(data !== null){
      let sticker = /::(\w+)::/.exec(data);
      let album = /{{([\d,]+)}}/.exec(data);
      
      if(sticker != null){
        console.log("Sticker Match: ", sticker)
        let file = sticker[1];
  
        isSticker = true;
        data = "./static/"+file+".jpg";
      }else
      if(album != null){
        console.log("Album Match: ", album)
        let files = album[1].split(",");
        count = files.length;

        isAlbum = true;
        data = "./static/"+files[0]+".jpg";

        vnode.attrs.files = files;
      }
    }else if(src !== null){
      isSticker = true;
      data = src;
    }

    isMessage = !isSticker && !isAlbum;
    classes.push( vnode.attrs.isLeft ? "bubble_left":"bubble_right");
    
    count = "+" + (count-1);

    return m(".bubble_parent", 
      m(".bubble", {
        className: classes
      },[
        isSticker ? m("img.bubble_image", {src: data}):null,
        isAlbum ? m(".bubble_album",[m("img.bubble_image", {src: data}),m(".bubble_counter", count)]):null,
        isMessage ? m("span.bubble_message",data):null,
        m(LoadingDots)
      ])
    );
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
var App = {
  start: false,
  index: 0,
  images: [],
  img: null,
  audio: null,
  
  oninit:()=>{
    //load audio
    App.audio = new Audio("./static/pop.mp3");
  },
  pop: ()=>{
    App.audio.play();
  },
  scrollTop: ()=>{
      //window.scrollTo(0,document.querySelector("#root").scrollHeight);  
      
      let height = document.querySelector("#root").scrollHeight;
      const scroll = {
        y: window.pageYOffset
      }

      anime({
        targets: scroll,
        y: height,
        //delay: 200,
        duration: 500,
        easing: 'easeInOutCubic',
        update: () => window.scroll(0, scroll.y)
      });
  },
  showDimmer: (files)=>{
    console.log("---ShowDimmer---");

    let dimmer = document.querySelector("#dimmer");
    let slide = document.querySelector("#slide");

    anime({
      targets: [dimmer, slide],
      duration: 800,
      opacity: 1,
      easing: 'easeInOutCubic',
      delay: function(target, index) {
        return index * 1000;
      },
    });
    //translate(-50%, -50%) scale(0.5,0.5)
    anime({
      targets: slide,
      delay: 1300,
      duration: 1000,
      height: "90%",
      width: "85%",
      easing: 'easeInOutCubic',
      complete: ()=>{
        let img = slide.querySelector("img");

        App.img = img;
        App.index =  0;
        App.images = files;
        App.showImages(img);
      }
    });
  },
  showImages: (img)=>{  
    App.img.src = "./static/" + App.images[App.index] + ".jpg";
    if(App.index == 0){
      img.addEventListener("load", App.kenBurns);
    }
  },
  kenBurns: ()=>{
    let img = App.img;
    let images = App.images;
    
    console.log("LOADED!!!", img.src);

    anime({
      targets: img,
      opacity: [
        { value: 0, duration: 100, delay: 0, easing: 'easeInOutSine' },
        { value: 1, duration: 100, delay: 1, easing: 'easeInOutSine' },
        { value: 0, duration: 100, delay: 100, easing: 'easeInOutSine' },
        { value: 1, duration: 200, delay: 200, easing: 'easeInOutSine' },
      ],
      scale: [
        { value: 1.1, duration: 0, delay: 0, easing: 'linear' },
        { value: 1, duration: 3000, delay: 1, easing: 'linear' }
      ],
      complete: ()=>{
        if(App.index < images.length -1 ){
          App.showImages(img, images, ++App.index);
        }else{
          App.hideSlide();
        }
      }
    });
  },
  hideSlide: ()=>{
    console.log("---ShowDimmer---");

    let dimmer = document.querySelector("#dimmer");
    let slide = document.querySelector("#slide");

    anime({
      targets: [slide, dimmer],
      duration: 800,
      opacity: 0,
      easing: 'easeInOutCubic',
      delay: function(target, index) {
        return index * 1000;
      },
      complete: ()=>{
        slide.style.height = "55%";
        slide.style.width = "50%";
        App.img.removeEventListener("load", App.kenBurns);        
        App.img.src = null;
        App.img = null;
        App.images = [];
        App.index = 0;
      }
    });
  },
  onupdate: ()=>{
    App.scrollTop();
  },
  oncreate: ()=>{
    setTimeout(()=>{
      App.start = true;
      Scenes.play();  
    }, 2000);
  },
  view: (vnode)=>{
    console.log("Redraw:", vnode);
    
    let scenes = [];
    
    if(App.start){  
      scenes = Scenes.getScene().slice();
    }
    
    return  m("div",[
      m(".container", scenes),
      m(TopBar),
      m("#dimmer"),
      m("#slide",
        m("img")
      ),
    ]);
  }
}

//Mount it baby one more time.
m.mount(document.getElementById("root"), App);