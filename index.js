import m from "./mithril.js"
import anime from './anime.js'
import conf from './confetti.js'

/*********************Constants************************/
//https://url.janmir.me/batch19/static
const basePath =  "./static";
//const basePath =  "http://batch19.janmir.me.s3-website-ap-northeast-1.amazonaws.com/static";

/*********************SVGs************************/
import back from './static/back.svg';
import { setTimeout, setInterval } from "timers";

/*********************Scenes************************/
var Scenes = {
  scenes: [],

  timeline_main: 0,
  timeline_sub: 0,
  
  play: ()=>{
    let speed_adjust = 0.93;
    let data = App.data;
    let main = Scenes.timeline_main;
    let sub = Scenes.timeline_sub;    

    let el = data[main];
    console.log(el);

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

      let bubble_delay = message.bubble_delay * speed_adjust || 100; //bubble loading
      let chat_delay_multiple = message.chat_delay_multiple + 1 || 1; //per message
      let subMessage = message.submessage;
      let subTitle = message.subtitle || null;
      
      switch(content.type){
        case "text":{
          Scenes.scenes.push(
            m(Text, {text: content.data.text, sub: content.data.sub, delay: delay}),
          );    
        }break;
        case "message":{
          let gap = content.gap || 4000;
          console.log("GAP: " + gap);
          App.exposure = gap;

          //Check type of message
          let msg = content.data || null;
          let sticker = /::(\w+)::/.exec(msg);
          let album = /{{([\d,]+)}}/.exec(msg);
          let photo = /@([\w]+)/.exec(msg);
          let isMessage = !(sticker !== null || album !== null || photo !== null);

          //start playing
          if(msg == "First."){
            setTimeout(()=>{
              App.wish_audio.play();
            }, 1700);
          }else if(msg.includes("Enjoy!")){
            setTimeout(()=>{
              App.ost_audio.play();
            }, 3250);
          }

          if(isMessage){
            bubble_delay *= msg.length;
          }else if(album !== null){
            let files = album[1].split(",");

            bubble_delay = 200;
            chat_delay_multiple = ((gap * 1.35) / bubble_delay) * files.length;
          }else{
            chat_delay_multiple = 15;
          }

          //start push it
          if(isStart){
            Scenes.scenes.push(
              Message.getMessage(
                {msg: msg, isLeft: left, name: name, src: avatarSrc, online: online,  delay: bubble_delay,
                  subMessage: subMessage, isFirst: true, subTitle: subTitle}
              )
            );
          }
          //If not just update it
          else{
            let oldMessage = Scenes.scenes.pop();
            
            //push
            Scenes.scenes.push(
              Message.updateMessage(
                oldMessage, 
                {msg: msg, isLeft: left, name: name, src: avatarSrc, online: online, delay: bubble_delay,
                  subMessage: subMessage, subTitle: subTitle}
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
      }, bubble_delay * chat_delay_multiple);

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
    let duration = 200;//vnode.attrs.delay / 2;
    anime({
      targets: els,
      opacity: [
        { value: 1, duration: duration, easing: 'linear' }
      ]
    });

    if(vnode.attrs.sub.includes("online")){
      App.ting_audio.currentTime = 0;
      App.ting_audio.play();
    }else{
      App.tong_audio.currentTime = 0;
      App.tong_audio.play();  
    }
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
  popTimeout: 9000,
  showAll: ()=>{
    let nodes = document.querySelectorAll(".avatar");

    if(!TopBar.shown){
      anime({
        targets: nodes,
        opacity: [
          { value: 1, duration: 300, easing: 'easeInOutSine' }
        ],
        scale: [
          { value: 0, duration: 0, easing: 'easeInOutSine' },
          { value: 1, duration: 1000, delay: 10, easing: 'easeOutElastic' }
        ],
        delay: function(target, index) {
          return index * 200;
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
          { value: 0, duration: 200, easing: 'easeInOutSine' }
        ],
        scale: [
          { value: 0, duration: 800, easing: 'easeOutElastic' }
        ],
        delay: function(target, index) {
          return index * 200;
        },
        complete: ()=>{
          TopBar.shown = false;

          //show thanks
          App.showThanks();
        }
      });

    }
  }, 
  start: (vnode)=>{
    setTimeout(()=>{
      //show children
      TopBar.showAll();
    }, TopBar.popTimeout);
  },
  view: (vnode)=>{
    return m(".topBar", [
      m(".topBar_left", [
        m.trust(back),
        "Batch19"
      ]),
      m(".topBar_center",[
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Jan Miranda", src: "/jp.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Jake Santiago", src: "/jake.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Sheena Mae Egama", src:"/shine.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Christine Ronquillo", src: "/kuting.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Bessie Mae Carnaje", src: "/bessie.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Charles Go", src: "/charles.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Catherine Idul", src: "/cath.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Dennis Alvarez", src: "/dennis.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Emelyn Raneses", src: "/em.jpg"}),
        m(Avatar, {isLeft: null, isOnline: true, isProfile: true, name: "Christopher Maister", src: "/chrish.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Mark Cordova", src: "/mark.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Kennron Damsin", src: "/ken.jpg"}),
        m(Avatar, {isLeft: null, isOnline: false, isProfile: true, name: "Jessie De Guia Seva", src: "/0.jpg"}),
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
      let text = el.innerText || null;
      let src = el.src || null;

      console.log("----------", text, "-----", src)

      newChild.push(m(Bubble, {src: src, message: text, isLeft: data.isLeft, 
        subMessage: data.subMessage}));
    });
    
    //push new bubble
    newChild.push(m(Bubble, {message: data.msg, isLeft: data.isLeft, animate: true, 
      delay: data.delay, subMessage: data.subMessage, subTitle: data.subTitle}));
    
    return m(".message",{
      className:  data.isLeft? "message_left":"message_right"
    }, newChild);
  },
  getMessage: (data)=>{
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
    let subMessage = vnode.attrs.subMessage || null;
    let isFirst = vnode.attrs.isFirst || false;
    let subTitle = vnode.attrs.subTitle;
    
    return m(".message",{
        className:  isLeft? "message_left":"message_right"
      } ,[
        m(".name", name),
        m(Avatar, {isLeft: isLeft, isOnline: online, isProfile: false, name: name, src: src}),
        msg ? m(Bubble, {message: msg, isLeft: isLeft, animate: true, delay: delay, 
          subMessage: subMessage, isFirst: isFirst, subTitle: subTitle}) : null,
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
      m("img.avatar_image", {src: basePath + vnode.attrs.src || basePath + "/0.jpg"}),
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
    let subMessage = bubble.querySelector(".sub_message");
    let animate = vnode.attrs.animate || false;
    let delay = vnode.attrs.delay;
    let subTitle = vnode.attrs.subTitle;
    let pre_delay = delay;
    
    let isMessage = vnode.attrs.isMessage;
    let isPhoto = vnode.attrs.isPhoto;
    let isSticker = vnode.attrs.isSticker;
    let isAlbum = vnode.attrs.isAlbum;

    let isFirst = vnode.attrs.isFirst;
    
    if(image !== null){
      image.addEventListener("load", function() {
        image.style.display = "inline";
      });
    }
    
    if(animate){
      //Rotate it
      let rotate = vnode.attrs.isLeft ?"bubble_rotate_left":"bubble_rotate_right";
      bubble.classList.add(rotate);

      //hide subs
      App.hideSubtitle();

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

              //play pop
              //if(isFirst){
              App.pop();
              //}
              
              //show if there is subtitle
              if(subTitle !== null){
                App.showSubtitle(subTitle);
              }

              //show message
              if(isMessage){
    
                message.style.display = "inline";                

                anime({
                  targets: message,
                  opacity: [
                    { value: 1, duration: 400, easing: 'easeInOutSine' }
                  ]
                });

                if(subMessage !== null){
                  subMessage.style.display = "inline";    
                }

              }else if(isAlbum){
                anime({
                  targets: album.querySelector("img"),
                  opacity: [
                    { value: 1, duration: 300, delay: 100, easing: 'easeInOutSine' }
                  ],
                  complete: ()=>{
                    App.scrollTop();
                  }
                });

                //resize
                bubble.classList.add("bubble_album_size");

                //show dimmer
                setTimeout(()=>{
                  App.showDimmer(vnode.attrs.files);                  
                },1000);

              }else if(isSticker){
                //resize
                bubble.style.backgroundColor = "white";                      
                bubble.classList.add("bubble_sticker");                

                anime({
                  targets: image,
                  opacity: [
                    { value: 1, duration: 400, easing: 'easeInOutSine' }
                  ],
                  complete: ()=>{
                    App.scrollTop();
                  }
                });

              }else if(isPhoto){
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
                bubble.classList.add("bubble_photo");            
              }              
            }
          });
        }, pre_delay); //bubble load
      }, 500); //bubble twist
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
    let subMessage = vnode.attrs.subMessage || null;
    let count = 0;

    console.log(vnode.attrs);

    let isSticker = false;
    let isPhoto = false;
    let isAlbum = false;
    let isMessage = false;
    
    //check if emoticon
    if(data !== null){
      let sticker = /::(\w+)::/.exec(data);
      let album = /{{([\d,]+)}}/.exec(data);
      let photo = /@([\w]+)/.exec(data);
      
      if(sticker != null){
        console.log("Sticker Match: ", sticker)
        let file = sticker[1];
  
        isSticker = true;
        data = basePath + "/_"+file+".jpg";
      
      }else if(photo != null){
        console.log("Photo Match: ", photo)
        let file = photo[1];
  
        isPhoto = true;
        data = basePath + "/"+file+".jpg";

      }else if(album != null){
        console.log("Album Match: ", album)
        let files = album[1].split(",");
        count = files.length;

        isAlbum = true;
        data = basePath + "/"+files[0]+".jpg";

        vnode.attrs.files = files;
      }
    }else if(src !== null){
      let filename = src.split("/");
      filename = filename[filename.length-1];

      if(filename[0] === '_'){
        //has prefix '_'
        isSticker = true;
      }else{
        //no prefix
        isPhoto = true;
      }

      data = src;
    }

    isMessage = !isSticker && !isAlbum && !isPhoto;

    vnode.attrs.isAlbum = isAlbum;
    vnode.attrs.isSticker = isSticker;
    vnode.attrs.isPhoto = isPhoto;
    vnode.attrs.isMessage = isMessage;
    
    classes.push( vnode.attrs.isLeft ? "bubble_left":"bubble_right");
    
    count = "+" + (count-1);

    return m(".bubble_parent", [
      m(".bubble", {
        className: classes
      },[
        isSticker || isPhoto ? m("img.bubble_image", {src: data}) : null,
        isAlbum ? m(".bubble_album",[
          m("img.bubble_album_picture", {src: data}),
          m(".bubble_counter", count)
        ]) : null,
        isMessage ? m("span.bubble_message",data) : null,
        m(LoadingDots),
        subMessage !== null ? m(".sub_message", "Sent from iPhoneX") : null,
      ])
    ]);
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
  local: true,
  data: null,

  start: false,
  index: 0,
  images: [],

  pop_audio: null,
  woosh_audio: null,
  ting_audio: null,
  tong_audio: null,
  wish_audio: null,
  ost_audio: null,

  img1: null,
  img2: null,

  exposure: 4000,
  subTimer: 0,
  
  images: [],
  interval: null,

  check: (e,count)=>{
    let subTitle = document.getElementById("subtitle");    
    let done = 6;
    count += 1;

    console.log("%cAudio " + e.path[0].src + " loaded.", "color: orange");

    if(count == 2  ){
      subTitle.innerHTML = ".";
    }else if(count == 4){
      subTitle.innerHTML = "..";
    }else if(count == 4){
      subTitle.innerHTML = "...";
    }else if(count > done-1){
      return true;
    }

    return false;
  },
  oninit:()=>{
    //load data
    if(App.local){
      //App.data = data;
      App.data = require(basePath + "/data.json");
    }else{
      m.request({
        method: "GET",
        url: basePath + "/data.json",
        background: true,
      })
      .then(function(result) {
        console.log("Loaded!", result);
        App.data = result;
      });
    }
  },
  preload:()=>{
    let count = 0;
    let subTitle = document.getElementById("subtitle");

    subTitle.style.display = "inline-block";
    
    //load audio
    App.pop_audio = new Audio(basePath + "/pop.mp3");
    App.woosh_audio = new Audio(basePath + "/woosh.mp3");
    App.ting_audio = new Audio(basePath + "/ting.mp3"); 
    App.tong_audio = new Audio(basePath + "/tong.mp3"); 

    App.wish_audio = new Audio(basePath + "/wish.mp3"); 
    App.ost_audio = new Audio(basePath + "/ost.mp3"); 

    new Promise(function(resolve) {
      App.pop_audio.addEventListener("canplaythrough", (e)=>{if(App.check(e,count++)){resolve()}}, true);
      App.woosh_audio.addEventListener("canplaythrough", (e)=>{if(App.check(e,count++)){resolve()}}, true);
      App.ting_audio.addEventListener("canplaythrough", (e)=>{if(App.check(e,count++)){resolve()}}, true);
      App.tong_audio.addEventListener("canplaythrough", (e)=>{if(App.check(e,count++)){resolve()}}, true);
      App.wish_audio.addEventListener("canplaythrough", (e)=>{if(App.check(e,count++)){resolve()}}, true);
      App.ost_audio.addEventListener("canplaythrough", (e)=>{if(App.check(e,count++)){resolve()}}, true);
    }).then(()=>{
      clearInterval(App.interval);      
      console.log("All Audio Assets Loaded.");

      //preload images
      let counter = 0;
      let images = [25, "profile_me", "profile_shine", "profile_kuting", "profile_charles", "profile_chrish",
                    "profile_bessie", "profile_boss", "profile_em", "profile_jake", "profile_cath", "cath",
                    "charles", "bessie", "chrish", "dennis", "em", "jake", "jp", "ken", "kuting", "mark", "shine"];
      images.forEach(img=>{
        let type = typeof img;

        switch(type){
          case "number":{
            for(var j=1;j<=img;j++){
              let i = new Image();
              i.src = basePath + "/" + j + ".jpg";
              i.onload = (img)=>{
                console.log("%cImage " + img.path[0].src + " loaded.", "color: green");
                counter++;
              }      
            }
          }break;
          default:{
            let i = new Image();
            i.src = basePath + "/" + img + ".jpg";
            i.onload = (img)=>{
              console.log("%cImage " + img.path[0].src + " loaded.", "color: green");
              counter++;
              subTitle.innerHTML = "....";
              
              if(counter == (images[0] + images.length - 1)){
                console.log("All Image Assets Loaded.");
                subTitle.innerHTML = "Assets Preload Done!";

                setTimeout(()=>{
                  subTitle.innerHTML = "Turn ON sounds, please.";

                  setTimeout(()=>{
                    subTitle.style.display = "none";
                  },2000);
                },1000);
              }
            }          
          }break;
        }
      });
    });
  },
  pop: ()=>{
    App.pop_audio.currentTime=0;
    App.pop_audio.play();
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
        duration: 400,
        easing: 'easeInOutCubic',
        update: () => window.scroll(0, scroll.y)
      });
  },
  showThanks: ()=>{
    let ty = document.querySelector("#thanks");
    ty.style.display = "block";
    anime({
      targets: ty,
      delay: 1000,
      duration: 500,
      opacity: 1,
      easing: 'easeInOutCubic',
      complete: ()=>{
        //App.toggleConfetti();
      }
    });
  },
  showDimmer: (files)=>{
    console.log("---ShowDimmer---");
    let dimmer = document.querySelector("#dimmer");
    let slide = document.querySelector("#slide");

    anime({
      targets: [dimmer, slide],
      duration: 600,
      opacity: 1,
      easing: 'easeInOutCubic',
      delay: function(target, index) {
        return index * 600;
      },
    });
    //translate(-50%, -50%) scale(0.5,0.5)
    anime({
      targets: slide,
      delay: 600,
      duration: 600,
      height: "90%",
      width: "85%",
      easing: 'easeInOutCubic',
      complete: ()=>{
        let img1 = slide.querySelector(".img1");
        //let img2 = slide.querySelector(".img2");

        App.img1 = img1;
        //App.img2 = img2;

        App.index =  0;
        App.images = files;

        //Attach listener
        App.img1.addEventListener("load", App.kenBurns);        

        App.showImages();
      }
    });
  },
  showImages: ()=>{  
    App.img1.src = basePath + "/" + App.images[App.index] + ".jpg";
  },
  kenBurns: ()=>{
    console.log("LOADED!!!", App.img1.src);
    let wait = (App.exposure - 200);
    anime({
      targets: App.img1,
      /*translateX: [
        { value: "-50%", duration: 0, delay: 0, easing: 'linear' },
      ],
      translateY: [
        { value: "-50%", duration: 0, delay: 0, easing: 'linear' },
      ],*/
      opacity: [
        { value: 0, duration: 0, delay: 0, easing: 'easeInOutSine' },
        { value: 1, duration: 200, delay: 0, easing: 'easeInOutSine' },
        { value: 0, duration: 200, delay: wait, easing: 'easeInOutSine' },
      ],
      scale: [
        { value: 1.08, duration: 0, delay: 0, easing: 'linear' },
        { value: 1.0, duration: App.exposure, delay: 1, easing: 'linear' }
      ],
      complete: ()=>{
        if(App.index < App.images.length - 1 ){
          App.index++;

          if(App.index == App.images.length - 1){
            let isFinal = App.exposure <= 2000;
            let pluser = !isFinal ? 1000: 4000;

            App.exposure += pluser;

            //show confetti
            if(isFinal){
              App.showConfetti();
            }
          }

          App.showImages();
        }else{
          App.hideSlide();

          //hide
          App.toggleConfetti();
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

        App.img1.removeEventListener("load", App.kenBurns);        
        App.img1.src = "";
        //App.img2.src = "";
        App.img1 = null;
        //App.img2 = null;
        
        App.images = [];
        App.index = 0;
      }
    });
  },
  onupdate: ()=>{
    App.scrollTop();
  },
  startScene: ()=>{
    App.woosh_audio.play();

    //hide the cover
    let cover = document.getElementById("cover");
    anime({
      targets: cover,
      scale: [
        { value: 0.2, duration: 500, delay: 0, easing: 'easeInOutBack' }
      ],
      opacity: [
        { value: 0, duration: 200, delay: 200, easing: 'easeInOutBack' }
      ],
      complete:()=>{
        //hide the cover
        cover.style.display = "none";

        //show this
        let t = document.querySelector(".topBar");
          anime({
            targets: t,
            top: [
              { value: 0, duration: 300, easing: 'easeInOutSine' }
            ],
        });

        //start animation
        setTimeout(()=>{
          App.start = true;
          TopBar.start();
          Scenes.play();  
        }, 1000);
      }
    });
  },
  showSubtitle: (msg)=>{
    let subTitle = document.getElementById("subtitle");
    subTitle.innerHTML = msg;
    subTitle.style.display = "inline-block";

    let delay = 300 * msg.length;

    clearTimeout(App.subTimer);
    App.subTimer = setTimeout(()=>{
      App.hideSubtitle();
    }, delay);
  },
  hideSubtitle: ()=>{
    let subTitle = document.getElementById("subtitle");
    subTitle.style.display = "none";
  },
  showConfetti:()=>{
    console.log("SHOW CONFETTI!!!");
    conf.confetti();
  },
  toggleConfetti:()=>{
    conf.mp = 8;//conf.mp > 0 ? 0:200;
    setTimeout(()=>{
      conf.mp = 100;
    }, 39000);
  },
  oncreate:()=>{
    //setTimeout(App.showConfetti, 5000);
    //App.showConfetti();
    //App.wish_audio.play();

    App.preload();
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
      m("#slide",[
        //m("img.img2"),
        m("img.img1"),
        //<canvas id="grafitti"></canvas>
      ]),
      App.start ? null:m("#cover",
        {
          onclick: App.startScene
        },[
        m("#qoute",[
          m("img.qoute_left", {src:basePath + "/qoute_left.svg"}),
          m("span.msg",[
            m("div","Advanced World Systems, Inc. & Advanced World Solutions, Inc.."),
            m("div","From the bottom of our 💖s,"),
            m("div","Thank you!")
          ]),
          m("img.qoute_right", {src:basePath + "/qoute_right.svg"}),
          m(".by", "—— 🅰️ction 🅱️atch 1️⃣9️⃣")
        ])
      ]),
      m("#thanks", m("span",[
        m("div","以上です!"),
        m("div","どうもありがとうございました!")
      ])),
      m("#subtitle"),
      m("canvas#confetti"),
    ]);
  }
}

//Mount it baby one more time.
m.mount(document.getElementById("root"), App);