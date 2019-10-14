import $ from "jquery";
import React,{Component}  from "react";
import ReactDOM from "react-dom";

import {View,newLayer,Alert,killAction,Ask,Icon,log} from "./common/main.js";
import {store} from "./live.js";
import {init as musicInit} from "./music.js";

import Pods from "./app/pods.js";
import People from "./app/people.js";
import IDcard from "./app/IDcard.js";
import Pod from "./app/Pod.js";

import Search from "./app/search.js";
import Followers from "./app/followers.js";
//
import {Test} from "./test.js";
import SongPicker from "./app/SongPicker.js";
import PodListeners from "./app/PodListeners.js";
import AddSongs from "./app/addSongs.js";
import { BrowserRouter as Router, Switch, Route, Link ,Redirect} from "react-router-dom";
import Footer from "./parts/footer.js";

window.prevLogs='';

var   previousLocation;
var isModal=false;
class Pages extends Component {
 
  constructor(props){
      super(props);
      console.log(this.props.location);
      previousLocation = this.props.location;
    
  }

 


callBGpage(){
  if(isModal){
   
      // console.log("bg page switch called...")
    return(this.switches(previousLocation,false))
    
   
  }
}
switches(loc,focus){
  return(
<Switch location={loc}>
{console.log("Switch to be matched: "+loc.pathname)}
  <Route path="/" exact component={()=>{
   if(me.pod==null)
   {return( <Redirect to='/pods'/>)}
   else{
     return(<Redirect to={'/pod/'+me.pod.code}/>)
   }
    }}/>
  <Route path="/pods" component={()=>{return(  <Pods focus={focus} />)}}/>
  <Route path="/people" component={(p)=>{return(  <People focus={focus}  {...p}/>)}}/>
  <Route path="/search" exact component={()=>{return(<Search focus={focus} />)}}/>
  <Route path="/test" exact component={()=>{return(<Test focus={focus} />)}}/>
  <Route path="/followers" exact component={()=>{return(<Followers focus={focus} />)}}/>
   <Route path="/pod/listeners" exact strict component={(p)=>{return(  <PodListeners focus={focus} />)}}/>
   <Route path="/pod/songs/add" exact strict component={(p)=>{return(  <AddSongs focus={focus} />)}}/>
  <Route path="/pod/:podCode" exact component={(p)=>{return(<Pod focus={focus}  history={p.history} url={p.location.pathname}/>)}}/>
  <Route path="/library" exact component={(p)=>{return(<SongPicker focus={focus}  kill="back" type="basic"/>)}}/>
  <Route path="/@:userid" exact strict component={(p)=>{return(  <IDcard focus={focus}  url={p.location.pathname}/>)}}/>
  <Route component={(p)=>{return(<Notfound {...p} />)}}/>
</Switch>)
}

  render(){
var p=this.props.location.pathname;

    if(p=="/search"||p=="/library"||p=="/pod/songs/add"){
    //  console.log('modal view case: '+this.props.location.pathname);
      if(window.innerWidth>=900){
        if( previousLocation == this.props.location){
        isModal=false;
       }
       else{
           isModal=true;
       }
       
      }
     else{console.log('modal view possible but not used')
     previousLocation = this.props.location;
     isModal=false;
    }
    }
    else{
    //  console.log('NOT a modal view case: '+this.props.location.pathname);
      isModal=false;
   previousLocation = this.props.location;
  }

       return(
         <div style={{position:'relative',height:'100%',width:'100%'}}>

<div className="bg_page">{this.callBGpage()}</div>

{this.switches(this.props.location,true)}
</div>
       )
  }
  
 
}

class Notfound extends Component{
  constructor(props){
    super(props);}
    path(){return(this.props.location.pathname)}
 render(){
   return(
   <div style={{height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',overflowY:'scroll'
   }}>
   <br/>
  <div className="center"> <Icon src="/icon/kiko-dark.png" className="size-xl"/></div>
   <br/>
  <div className="center-col" style={{width:"100%",minHeight:'40vh',padding:'1rem'}}>
  <h2 className="ink-red center">💔 The link's not valid.</h2><br/>
 <div className="ink-green size-l">{this.path()}</div> <br/>
  </div>
  <div style={{width:'100%'}}><Footer theme="light"/></div>
</div>
)}
 }

 
 

ReactDOM.render(<Router>
  <div style={{position:'relative',height:'100%',width:'100%'}}>
 <Route component={(p)=>{ return <Pages {...p} />}} />
 <div id="screen" style={{zIndex:"20",position:'fixed',top:'0px',left:'0px',width:'100%'}}></div>
  </div>
  </Router>
  ,document.getElementById("root"));





 



//Code for Spotify keys

function check_keys(data){
  console.log('/apis/keys: '+data.result);
if(data.result=="FAILED"){      
   
    var nlayer=newLayer();
    ReactDOM.render(
  <Ask holder={nlayer} title='Log In' body='We are having trouble connecting to your music app.'>
<button onClick={()=>{
location.href=me.auth;
 killAction(nlayer);
}}>Log In</button>
<button onClick={()=>{
killAction(nlayer)
location.reload()
}}>CANCEL</button>
    </Ask>
    ,nlayer)
  


}
else if(data.result=="SUCCESS"){
    console.log("new token recived!");
me.source.access_token=data.data;
store.dispatch({'type':'update'})
}
}



$(document).ready(()=>{
  if(me.source!=null){

    /////////////////
    $.get("/apis/keys").done(function(data){              
check_keys(data);
});
////////////////
musicInit();
window.setInterval(function(){
    $.get("/apis/keys").done(function(data){
        check_keys(data);
        });
},3600000);

  }
 
}
)
 





// This is the "Offline page" service worker

// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

// Check compatibility for the browser we're running this in
if ("serviceWorker" in navigator) {
  if (navigator.serviceWorker.controller) {
    console.log("[PWA Builder] active service worker found, no need to register");
  } else {
    // Register the service worker
    navigator.serviceWorker
      .register("/offlineWorker.js", {
        scope: "./"
      })
      .then(function (reg) {
        console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
      });
  }
}






