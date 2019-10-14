import $ from "jquery";

const spotifyLib=require('spotify-web-api-js');
var spotify = new spotifyLib();
import {store} from "./live.js";


 window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Kiko app',
      getOAuthToken: cb => { 
        $.get("/apis/keys").done(function(dat){              
          if(dat.result=='SUCCESS'){
            cb(dat.data)
          }
          else{
            console.error('err in updating acc token in playBack SDK')
            cb(null)
          }
          });
      }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });
  
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      if(me.source!=null){
         me.source.device_id=device_id;
      store.dispatch({'type':'update'})
      play();
      }
     
    });
  
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  
    // Connect to the player!
    player.connect();
  

  };



var init=()=>{  
    console.log('updating acc token');
    var source=store.getState().source;
    if(source!=null&&source.access_token!=null){
      console.log('setting access token',source.access_token);
        spotify.setAccessToken(source.access_token);
    }

store.subscribe(()=>{
    console.log('updating acc token');
    var source=store.getState().source;
    if(source!=null){
        spotify.setAccessToken(source.access_token);
    }
        })  
}

var checkLoved=(id,callback)=>{
    if(me.source!=null&&me.source.access_token!=null){
  if(me.source.app=='spotify'){
         console.log('checking for loved track in spotify',spotify);
        spotify.containsMySavedTracks([id])
        .then((data)=> {
     console.log(data)
          // An array is returned, where the first element corresponds to the first track ID in the query
          var is_loved =false;
          if(data!=undefined)
          {
             is_loved= data[0];
          }
         else{
           console.error('err while checking saved tracks',data)
         }
          if (is_loved) {
            console.log('Track was found in the user\'s Your Music library');
    callback(true);
          } else {
            console.log('Track was not found.');
            callback(false);
          }
        }, (err)=> {
          console.log('Something went wrong!', err);
          callback(false);
        });
    }
    else{
        //code for apple music
        callback(false);
    }
    }
    else{
        callback(false)
    }
  
    }

var play=()=>{
  if(me.pod!=null&&me.pod.trackObj!=undefined){
    var id=me.pod.trackObj.spotifyId;
   var time=new Date().getTime();
   var timeLeft=me.pod.next_refresh-time;
    var sleek=me.pod.track_length-timeLeft;
    if(me.source.device_id!=undefined){
        spotify.play({
          device_id: me.source.device_id,
      uris:['spotify:track:'+id],
      position_ms:sleek
    })
    }
  console.warn("DeviceID is not set yet.")
   // spotify.repeat({state:'track'});
  }

}

var pause=()=>{
spotify.pause({device_id:me.source.device_id})
}

window.setInterval(function(){
  $.get("/apis/pod/now-playing").done(function(dat){
      if(dat.result=='SUCCESS'){
        if(me.pod!=null){
          me.pod.trackObj=dat.data;
        play() 
        }
      }
      });
},1000000);


export {init,checkLoved,play,pause};