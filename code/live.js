import $ from 'jquery';
import {createStore} from 'redux';
import {log, Loading,Ask,newLayer,killAction} from "./common/main.js";
import ReactDOM from "react-dom";
import {play,pause} from "./music.js";

var socket = io('/');
var sUpdates=io('/songs',{autoConnect: false, forceNew: false });
sUpdates.disconnect();
var mUpdates=io('/mates',{autoConnect: false, forceNew: false });
mUpdates.disconnect();


socket.on('connect',()=>{
    log(
     '<div> Connected to server as <br/><div class="size-xs ink-green base-semilight">'+socket.id+'</div> </div>');
  })
socket.on('refresh',()=>{
  log('EVENT DETECTED: refresh [live]','yellow');
})
  socket.on('disconnect',()=>{
    log('<div class="ink-red">Disconnected from server</div>');
    
  })


  var ifPodUpdates=(cb,obj)=>{
    socket.on('welcome',(data)=>{
      log('EVENT DETECTED: welcome','yellow');
         me.pod=data;
         me.IsTrackChanged=true;
         log(JSON.stringify(data));
       cb()
       })

       socket.on('bye',(data)=>{
        log('EVENT DETECTED: bye','yellow');
           me.pod=null;
           me.IsTrackChanged=true;
           cb()
          })
  
          socket.on('podUpdate',(data)=>{
            log('EVENT DETECTED: podUpdate','yellow');
            if(me.pod!=null){
                var keys=  Object.keys(data);
                var changed=false;
             keys.forEach((key)=>{
             me.pod[key]=data[key];
             if(key=='now_playing'){
                changed=true;
                console.log('Track changing!')
             }
             }) 
            if(changed){
              me.IsTrackChanged=true;
            }
            else{
              me.IsTrackChanged=false;
          }
            }
            log(JSON.stringify(data));
            cb()
          })
}



var storeKeeper=(prev,action)=>{
  log('updating store');
return me;
}

ifPodUpdates(()=>{
  var getNowPlaying=(cb)=>{
    $.get("/apis/pod/now-playing").done((dat)=>{
      if(dat.result=='SUCCESS'){
        cb(dat.data)
      }
      else{
       cb(null)
      }
    })
      }
      if(me.IsTrackChanged){
        console.warn("Track Changed!")
         if(me.pod!=null){
        getNowPlaying((obj)=>{
           me.pod.trackObj=obj;
           //play pod now_playing
           play();
           store.dispatch({'type':'update'})
        })
      }
      else{
        //stop playback
        pause();
        store.dispatch({'type':'update'})
      }
      }
      else{
        console.warn("Track did not Change with this update!")
        store.dispatch({'type':'update'})
      }
  
})

let store=createStore(storeKeeper);


socket.on(['reconnect_failed','reconnect_error','connect_timeout','connect_error'],()=>{
    var nlayer=newLayer();
    ReactDOM.render(    <Ask holder={nlayer} title='No internet' body='You wont be able to get live updates.'>
    <button onClick={()=>{
     socket.open();
       killAction(nlayer);
      }}>Try again</button>
    <button onClick={()=>{
      socket.close();
      killAction(nlayer)
      }}>OK</button>
          </Ask>
   ,nlayer )
        }
        )
/*
        socket.on('welcome',(data)=>{
         log('EVENT DETECTED: welcome','yellow');
          me.pod=data;
         log(JSON.stringify(data));
        })

        socket.on('bye',(data)=>{
            me.pod=null;
            log('EVENT DETECTED: bye','yellow');
           })
   
           socket.on('podUpdate',(data)=>{
            log('EVENT DETECTED: podUpdate','yellow');
           if(me.pod!=null){
               var keys=  Object.keys(data);
            keys.forEach((key)=>{
            me.pod[key]=data[key];
            }) 
           }
            log(JSON.stringify(data));
           })

*/



export {socket,ifPodUpdates,sUpdates,mUpdates,store}