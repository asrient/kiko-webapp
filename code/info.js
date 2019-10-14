import $ from "jquery";
import React  from "react";
import ReactDOM from "react-dom";
import "./common/global.css";
import "./info.css";
import Footer from "./parts/footer.js";


ReactDOM.render(<div>

<div id="screen"></div>

 <div className="size-m center ink-green base-regular container-fluid" id="hed" style={{display:'none'}}>
 <i>It's</i> &nbsp;<img src="icon/Kiko-dark.png" className="size-m icon"/>
 </div>
  <img src="icon/play.png" className="icon clickable" id="opening_butt" onClick={()=>{opening_play()}}/>
<audio id="player" src="media/opening.mp3"></audio>
<div id="wrapper" >
 <div className="center" id="topico"> <img src="/icon/Kiko-dark.png" className="icon size-l"/></div>
  <div id="top" className="size-l ink-black base-semibold">
<div id="title" className="center">Best way to listen to music with friends.</div>
    <div id="sec1"></div>
  </div>


 
 

<div className="sec center container base-semibold ink-black size-l screens">
  <div>Discover what people around you listens to.<br/><br/>
<div className="base-semilight ink-dark size-s">
Find new songs with a little help from your friends. 
</div>
</div>
<div className="center"><img src="media/screenshort.png" id="screenshort"/></div>

</div>


<div id="sec2" className="sec center container base-semibold ink-black size-l screens">
  <img src="media/screenshort.png" id="screenshort"/>
  <div>Enjoy your favourite songs with friends.<br/><br/>
  <div className="base-semilight ink-dark size-s">
 You listen <span className="ink-red">LIVE</span> with friends on a pod.
  </div>
  </div>
  
  </div>


  <div className="sec center container base-semibold ink-black size-l screens">
  <div>Ok, but which song to play next? Let's vote!<br/><br/>
  <div className="base-semilight ink-dark size-s">
  The most voted song gets played.
  </div>
  </div>
  <div className="center"><img src="media/screenshort.png" id="screenshort"/></div>
  </div>



<div id="hero1"></div>


<div className="container center-col base-semibold ink-black size-l">
  Songs are in a pod<br/>
Choose one that fits your mood.
<div className="container center-col base-regular ink-dark size-m">
  <br/>
  Browse through a selection of hundreds of pods picked for you.
  <br/>
  <a className="size-s base-semilight" href="/pods">Take a look ></a>
</div>
</div>
<div id="showcase"></div>




<div className="container center-col base-semibold ink-black size-l sec" style={{maxWidth:'40rem'}}>
  All you have to do is connect your music app with us. That's all.
<div className="container center-col base-semilight ink-dark size-s">
  <br/>
   Kiko app works with Spotify, Apple Music and others,
  So that, you can keep enjoying music with friends without any new subscriptions or fees.
  <br/>
  <br/>
  <a className="size-s base-semilight" href="/pods">Learn more ></a>
</div>
</div>





<div id="manydev_img"></div>

<br/><br/>
<div className="sec center-col">
    <div className="size-l ink-black base-semibold center-col" style={{minHeight:'6vh',padding:'1rem',paddingBottom:'3rem'}}>
       Keep enjoying music with friends,<br/> No matter which device you are on.
       <div className="center size-s ink-dark base-semilight" style={{height:'5vh',marginTop:'2rem'}}>
       Available on ios, Android and Web.<br/><br/></div>
       <a className="size-s base-semilight">Get the app ></a>
       </div>
     <img src="/media/alldev.png" style={{maxHeight:'60vh',maxWidth:'97vw'}}/ >  
 </div>

<br/>
 <div className="container center-col base-semibold ink-black size-l" style={{maxWidth:'40rem'}}>
Get to know your friends through music.<br/>
</div>



<div className="container center" id="appbar">
    <div className="center container" style={{justifyContent:'space-evenly', maxWidth:'30rem'}}>
  <img src="/icon/app-icon.png" id="iapp" className="icon"/ >
  <div className="center-col size-l base-regular ink-dark">
    <div>Kiko app</div>
<div style={{marginTop:'1rem'}}> <button className="button-blue-light" onClick={()=>{ window.location="/"}}>Get In</button></div>
  </div>
</div>
  </div>



<div id="dev_hero"></div>



<Footer/>
</div>

</div>
,document.getElementById("root"));


var initpos=10;

window.setInterval(() => {
  initpos+=10;
  $("#showcase").css({backgroundPositionX:(initpos)+"%"})
}, 4000);








var ply=0;
  
  
function opening_play()
   {
    if(ply==0){
        document.getElementById("player").play();
           document.getElementById("player").currentTime=36;
            document.getElementById("opening_butt").setAttribute('src','icon/pause.png');
           ply=1;
    }
         else{
           ply=0;
             document.getElementById("player").pause();
              document.getElementById("opening_butt").setAttribute('src','icon/play.png');
         }
        
       }
     
  
  
  $(window).scroll(()=>{
   if(window.pageYOffset> document.getElementById("sec1").offsetHeight) {
    $("#hed").css("display","flex");
   }
   else{
    $("#hed").css("display","none");
   }
  });