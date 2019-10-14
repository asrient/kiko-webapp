import $ from 'jquery';
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {Ask,Alert,newLayer,Loading,log} from "./common/main.js";
import KikoBar from "./parts/kikoBar.js";
import "./test.css";

import {socket,ifPodUpdates,store,mUpdates} from "./live.js";



class Test extends React.Component{
 
constructor(props){
  super(props);
this.state=store.getState()
 this.state.ISmUpdatesOn=false;

}
unsubscribe=null;

stopListeningToMates(){
  log('disconnecting from mUpdates...')
  var state=this.state;
  state.ISmUpdatesOn=false;
  this.setState(state)
  ////////////////
  mUpdates.disconnect();
  mUpdates.off('connect');
  mUpdates.off('disconnect');
  mUpdates.off('userUpdate');
  mUpdates.off('addUser');
  mUpdates.off('removeUser');
  mUpdates.off('msg');
  //////////////
}

listenForMates(){
  log('connecting to mUpdates...')
  var state=this.state;
  state.ISmUpdatesOn=true;
  this.setState(state)
///////////mUpdates/////////////
mUpdates.connect();

mUpdates.on('connect',()=>{
  log('Connected to mates channel as '+mUpdates.id,'green' )
})
mUpdates.on('userUpdate',(data)=>{
console.log('EVENT DETECTED: userUpdate on /mates channel :',data);
  log('EVENT DETECTED: userUpdate on /mates channel :'+data,'yellow' )
})
mUpdates.on('addUser',(data)=>{
  console.log('EVENT DETECTED: addUser on /mates channel :',data)
log('EVENT DETECTED: addUser on /mates channel :'+data,'yellow' )
})
mUpdates.on('removeUser',(data)=>{
console.log('EVENT DETECTED: removeUser on /mates channel :',data);
log('EVENT DETECTED: removeUser on /mates channel :'+data,'yellow' )
})
mUpdates.on('reply',(data)=>{
  log('Your secret mate:'+data,'#c485ff' )
})
mUpdates.on('disconnect',()=>{
  log('Disconnected from mates channel','red' )
})
//////////////////////
}

componentDidMount=()=>{
  $('#console').html(window.prevLogs);
    log('Welcome to Test Lab!','blue');
 
   this.unsubscribe= store.subscribe(()=>{
     var state=this.state;
     var st=store.getState();
     state.userid=st.userid;
     state.pod=st.pod;
this.setState(state);
    })
   

}

getMatesButt(){
  if(!this.state.ISmUpdatesOn){
 return(<button className="button-green" onClick={()=>{
      this.listenForMates()
    }} >Connect to /Mates</button>)
    
  }
  else{
  return(
     <button className="button-red" onClick={()=>{
        this.stopListeningToMates()
      }} >Disconnect to /Mates</button>
  )
     
  }
}


componentWillUnmount(){
  this.unsubscribe()

}

 getPodCode(){
if(this.state.pod!=null){
  if(this.state.pod.code!=undefined){
    return(this.state.pod.name)
  }
else{
  window.setTimeout(() => {
     log('me.pod not null but me.pod.code undefined!','red');
  log(this.state.pod);
  }, 1000);
  
  return('undefined')
}
}
else{
  return('none')
}
 }

podStatus(){
  if(this.state.pod!=null){
    return(
   <div style={{display:'flex'}}>
      <div className="tst_status center"><div className="size-xs ink-dark"> 🎧</div>&nbsp; {this.state.pod.listeners}</div>
      <div className="tst_status center"><div className="size-xs ink-dark"> role</div>&nbsp;| {this.state.pod.role}</div>
      <div className="tst_status center"><div className="size-xs ink-dark"> 🔈</div>&nbsp; {this.state.pod.now_playing}</div>
      <div className="tst_status center"><div className="size-xs ink-dark"> 🏆</div>&nbsp; {this.state.pod.trophies}</div>
      <div className="tst_status center"><div className="size-xs ink-dark"> 👍</div>&nbsp; {this.state.pod.voted_for}</div>
   </div>
     
    )
  }
  else{
    return
  }
}

  render(){
   
    
    return(
      <div>
    <KikoBar/>
    <div className='size-xl ink-black base-light'>Live kit <Loading/></div>
  <div id="screen"></div>
  <div className='center'><div id="console"></div></div>
  <div id="tst_opts">
    <div >
      <button className="button-red" onClick={()=>{
        $('#console').html('');
        window.prevLogs='';
      }}>Clear</button> 
      <button className="button-blue" onClick={()=>{
        var s=store.getState();
        s.auth='[AUTH URL]';
       log(JSON.stringify(s));
      }}>me</button> 
   {this.getMatesButt()}
    </div>
    <hr/>
   <div>
   <div className="size-m ink-black base-semibild">Status</div>
    <div style={{display:'flex'}}>
        <div className="tst_status center"><div className="size-xs ink-dark">UserID</div>&nbsp;| {this.state.userid}</div>
        <div className="tst_status center"><div className="size-xs ink-dark">Pod</div>&nbsp;| {this.getPodCode()}</div>
       {this.podStatus()}
       
    </div>
     </div>  
    <hr/>
    <div className="size-m ink-black base-semibild">Fire</div>
    <button className="button-green" onClick={()=>{
      var code='91dd1d15845eb8d70d53';
      socket.emit('join',code);
      log('EVENT FIRED: join','purple');
    }}>Join</button>
     <button className="button-orange" onClick={()=>{
      socket.emit('leave');
      log('EVENT FIRED: leave','purple');
    }}>Leave</button>
    <button className="button-purple" onClick={()=>{
      mUpdates.emit('msg','hi!');
      log('You: hi!','#6755b2');
    }}>Send message</button>
    <br/><br/><br/>
  </div>
  </div>
   
    )
  }
 
}
 
    


   
  


          export {Test,log};