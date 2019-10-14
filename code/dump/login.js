import $ from "jquery";
import React  from "react";
import ReactDOM from "react-dom";
import "./common/global.css";
import "./login.css";
import IDcard from "./app/IDcard.js";




ReactDOM.render(
    
    <div>

<div id="screen"></div>
    <div id="frame">
      <div id="inf" className="center"><button id="info" className="button-blue-light">What's Kiko app ></button></div>  
<div id="hed">
    <div id="brnd" className="center">
        <img src="/icon/icon-noborder.png" className="icon size-l"/>&nbsp;
        <img className="icon ink-white base-regular size-m" src="/icon/kiko-light.png"/>
    </div>
    <div id="txt" className="ink-white base-light size-m center">
        Find a Pod where your friends are and Kick out the song You wanna hear with them.
    </div>
</div>
<div id="foot">
    <div className="size-l ink-white base-semilight center">Which app do you use?</div>
    <div id="opts" className="size-m ink-white base-semilight">
    <div className="opt clickable"> <img src="/icon/spotify.png" className="icon size-l"/><div>&nbsp;&nbsp;Spotify</div></div>
    <div className="opt clickable"> <img src="/icon/iTunes.png" className="icon size-l"/><div>&nbsp;&nbsp;Apple Music</div></div>
</div>
</div>
    </div>

    </div>
    
    
    
    ,document.getElementById("root"));










$("#info").click(()=>{
    location.href="/info";
});


var scopes="user-top-read%20user-read-private%20user-read-email%20user-read-birthdate%20user-follow-read%20user-modify-playback-state%20user-library-read%20user-library-modify%20user-read-playback-state%20user-read-currently-playing";

var auth=new URL("https://accounts.spotify.com/authorize?client_id="+cID+"&response_type=code&redirect_uri="+PURL+"&scope="+scopes);

$(".opt").click( ()=>{location.href=auth;})
   






   var curbg=1;
    window.setInterval(() =>
     {
        if(curbg>5){    curbg=1;  }
        if(curbg==2){
              $("#frame").css({
                  backgroundImage:"url(/media/bg"+curbg+".jpg)",
                  backgroundPositionX:"30%",
                  backgroundPositionY:"50%"
              });
              window.setTimeout(() => {
                   $("#txt").html("The Most Kicked Song gets Played.");
              },600 );
             
        }
       else if(curbg==3){
              $("#frame").css({
                  backgroundImage:"url(/media/bg"+curbg+".jpg)",
                  backgroundPositionX:"66%",
                  backgroundPositionY:"70%"
              });
              window.setTimeout(() => {
                     $("#txt").html("Find out what People around you Listens to.");
              },600 );
           
        }
        else if(curbg==4){
              $("#frame").css({
                  backgroundImage:"url(/media/bg"+curbg+".jpg)",
                  backgroundPositionX:"55%",
                  backgroundPositionY:"0%"
              });
              window.setTimeout(() => {
                     $("#txt").html("Everyone's listening to the same song at the same time as you.");
                },600 );
           
        }
        else if(curbg==5){
              $("#frame").css({
                  backgroundImage:"url(/media/bg"+curbg+".jpg)",
                  backgroundPositionX:"85%",
                  backgroundPositionY:"0%"
              });
              window.setTimeout(() => {
                   $("#txt").html("Explore new Trends before anyone else.");
                },600 );
             
        }
        else{
            window.setTimeout(() => {
                   $("#txt").html("Find a Pod where your friends are and Kick out the song You wanna hear with them.");
                },600 );
           
              $("#frame").css({
                  backgroundImage:"url(/media/bg"+curbg+".jpg)",
                  backgroundPositionX:"60%",
                  backgroundPositionY:"20%"
              });
        
        }
         curbg++;
    }, 10000);




/////////////////////CODE FOR IDCARD//////////////////////







  

     function visit(uid){
  $.get("apis/user/get_info.php?userid="+uid).done(function(data){
        data=JSON.parse(data);
        if(data.result=="SUCCESS"){
             data=data.data;
        //  console.log(data);
          ReactDOM.render(
            <IDcard data={data} opts="0" holder={document.getElementById("screen")}/>,
            document.getElementById('screen')
          );
        }
        else{
            alert("No user found.");
        }
          });
}

     if(tovisit!=null){
      visit(tovisit);
}



