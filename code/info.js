import $ from "jquery";
import React  from "react";
import ReactDOM from "react-dom";
import "./common/global.css";




ReactDOM.render(<div>

<div id="screen"></div>

 <div className="size-m center ink-green base-regular container-fluid" id="hed" style={{display:'none'}}>
 <i>It's</i> &nbsp;<img src="icon/kiko-dark.png" className="size-m icon"/>
 </div>
  <img src="icon/play.png" className="icon clickable" id="opening_butt" onClick={()=>{opening_play()}}/>
<audio id="player" src="media/opening.mp3"></audio>
<div id="wrapper" >
 <div className="center" id="topico"> <img src="/icon/kiko-dark.png" className="icon size-l"/></div>
  <div id="top" className="size-l ink-black base-semibold">
<div id="title" className="center">Best way to listen to music with friends.</div>
    <div id="sec1"></div>
  </div>


 
  <div className="container center" id="appbar" style={{borderBottom:'solid thin'}}>
    <div className="center container" style={{justifyContent:'space-evenly', maxWidth:'30rem'}}>
  <img src="/icon/app-icon.png" id="iapp" className="icon"/ >
  <div className="center-col size-l base-regular ink-dark">
    <div>Kiko app</div>
<div style={{marginTop:'1rem'}}> <button className="button-blue-light" onClick={()=>{ window.location="/"}}>Get In</button></div>
  </div>
</div>
  </div>
<br/><br/>
<div className="sec center-col">
    <div className="size-l ink-black base-semibold center" style={{minHeight:'6vh',padding:'1rem',paddingBottom:'3rem'}}>
       Keep Listening to Music with friends,<br/> No matter where ever you are.</div>
     <img src="/media/alldev.png" style={{maxHeight:'60vh',maxWidth:'97vw'}}/ > 
     <div className="center size-s ink-dark base-semilight" style={{height:'5vh',marginTop:'2rem'}}>Available on ios, Android and Web.</div>
 </div>

<div id="sec2" className="sec center container base-regular ink-black size-l">
  <div>Explore what People around You Listens to<br/><br/>
<div className="base-semilight ink-dark size-s">
Listen to Music with them right now.<br/><br/><br/>
</div>
</div>
<div className="center"><img src="media/screenshort.png" id="screenshort"/></div>

</div>


<div id="sec2" className="sec center container base-regular ink-black size-l">
  <img src="media/screenshort.png" id="screenshort"/>
  <div><br/><br/>You Got a Say too!<br/><br/>
  <div className="base-semilight ink-dark size-s">
  Kick the song you wanna hear, and most kicked Song gets Played.
  </div>
  </div>
  
  </div>

<div>
<img src="/media/ad1.png" style={{maxWidth:'100%', marginBottom:'8vh'}}/>
<div className="sec center-col base-semibold ink-black size-l">
  Songs are in a pod<br/>
Your friends are too.
<div className="container center base-regular ink-dark size-m">
  <br/>
  Browse through a collection of varity of pods.
</div>
</div>
<div className="sec" id="cards">

<div className="card" id="c1">
<div className="ink-white base-semibold size-l">Picks for You</div>
</div>
<div className="card" id="c2">
    <div className="ink-white base-semibold size-l">What friends are listening</div>
    </div>
    <div className="card" id="c3">
        <div className="ink-white base-semibold size-l">Pods with songs you love</div>
        </div>
        <div className="card" id="c4">
            <div className="ink-white base-semibold size-l">Trending right now</div>
            </div>
</div>
</div>
<div id="end" className="size-l ink-light">
<div id="connect-tray" className="container-fluid">
Get Engaged
<div id="connect" className="size-l center">
<img className="icon" src="/icon/instagram.png"/>
<img className="icon" src="/icon/facebook.png"/>
<img className="icon" src="/icon/twitter.png"/>
<img className="icon" src="/icon/youtube.png"/>
</div>
</div>
<div className="container-fluid center-col" style={{paddingTop:'2rem'}}>
<img className="icon size-l" src="/icon/icon-noborder.png"/>
<div className=" ink-dark size-s base-semilight" style={{paddingTop:'1rem'}}>Made with ❤ by Aritra.</div>
</div>
</div>
</div>

</div>
,document.getElementById("root"));













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