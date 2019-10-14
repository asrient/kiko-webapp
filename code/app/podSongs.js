import $ from "jquery";
import React  from "react";
import {View,Icon,log,Loading,Alert} from "../common/main.js";
//import {Link } from "react-router-dom";
import SongView from "./views/song.js"
import {socket,sUpdates} from "../live.js";

class PodSongs extends React.Component {

 constructor(props){
      super(props);
    this.state={ list:null,totalVotes:0};
    }

    refresh=()=>{
        log('EVENT DETECTED: refresh [podSongs]','yellow');
  console.warn('refreshing podSongs');
this.download();
    }

    componentDidMount=()=>{
        console.log('podSongs mounted');
 this.download();
  
  sUpdates.connect();
  sUpdates.on('connect',()=>{
    log('Connected to songs channel as '+sUpdates.id,'green' )
})
sUpdates.on('votes',(data)=>{
//Alert('Someone just voted!');
    log('EVENT DETECTED: [votes] on /songs channel :'+data,'yellow' )
    var state=this.state;
    var isrc=data.isrc;
    var votes=data.votes;
    var prevIndex=null;
   var prev= state.list.find((item,index)=>{
   if(item.isrc==isrc){
       prevIndex=index;
       return true
   }
   else{return false}
    })
    if(prevIndex!=null){
      state.list[prevIndex].votes=votes;
      if(prev.votes!=undefined){
     state.totalVotes=state.totalVotes-prev.votes;
     state.totalVotes=state.totalVotes+votes;
      }
      //call sort func here
      state.list=this.sort(state.list);
      this.setState(state)
    }
    else{
        console.error('event votes received with track thats not on list [podSongs]');
    }
})
sUpdates.on('msg',(data)=>{
    log('Message from the server :'+data,'yellow' )
})
sUpdates.on('disconnect',()=>{
    log('Disconnected from songs channel','red' )
})

socket.on('refresh', this.refresh)

    }

componentWillUnmount=()=>{
     sUpdates.disconnect();
    sUpdates.off('connect');
    sUpdates.off('disconnect');
    sUpdates.off('votes');
    sUpdates.off('msg');

    socket.removeListener('refresh',this.refresh)
}

download(){
    /*//////////
    var state=this.state;
    state.list=null;
      this.setState(state);
    //////////*/
           $.get("/apis/pod/songs?code="+this.props.pod).done((dat)=>{
 
            if(dat.result=='SUCCESS'){
                var state=this.state;
                state.list=dat.data.items;

                //setting extra props only if user's on the pod
                if(this.props.mypod!=null&&this.props.mypod.code==this.props.pod){
                    var votes=0;
                    state.list=state.list.map((item)=>{
                        if(item.votes!=undefined){
                            votes=votes+item.votes;  
                        }
                        //setting voted_for
                if(this.props.mypod.voted_for!=null&&this.props.mypod.voted_for==item.isrc){
                    item.is_voted_for=true;
                }
                else{
                    item.is_voted_for=false;
                }
                //setting is_playing
                if(this.props.mypod.now_playing!=null&&this.props.mypod.now_playing==item.isrc){
                    item.is_playing=true;
                }
                else{
                    item.is_playing=false;
                }
                return item;
                })
                //call sort func here
                state.list=this.sort(state.list);
                state.totalVotes=votes;
                }
                  this.setState(state);
            }
             else{
                var state=this.state;
                state.list='error';
                state.error=dat.data;
                  this.setState(state);
             }
            
        
            }); 
}
    

    build(){
var list=this.state.list;
var res=[];
var type='basic';
//run this only if user is on this pod
if(this.props.mypod!=null&&this.props.mypod.code==this.props.pod){
    if(this.props.mypod.voted_for==null){
      type='button';
    }
 }
var isVoted=false;
if(this.props.mypod!=null&&this.props.mypod.code==this.props.pod){
    if(this.props.mypod.voted_for!=null){
     isVoted=true;
    }
 }
 
res=list.map((item,index)=>{

        if(isVoted){
          item.total_votes=this.state.totalVotes;
    item.rank=index+1;
        }
       
return(<SongView data={item} key={item.isrc} button={<Icon className="size-s clickable" src="/icon/vote.svg" />}
 type={type} click={(isrc)=>{
    socket.emit('vote',isrc)
  }}/>)
})
if(res.length){
    return res;
}
else{
    return(<div>No songs on this pod</div>)
}
    }
   
    componentWillReceiveProps(next){
        var isOn=false;
        var willBeOn=false;
        if(this.props.mypod!=null){
            if(this.props.mypod.code==this.props.pod){
            isOn=true;
        }
        }
        if(next.mypod!=null){
        if(next.mypod.code==this.props.pod){
            willBeOn=true;
        }
        }
        //console.log('getting new props [podPeople]')
        if(isOn!=willBeOn){
            //user has either left or joinned the pod. get fresh list
          //  console.log('user has either left or joinned the pod. [podSongs]');
           // console.log('Re-downloading [podSongs]')
        this.download();
        }
            }



sort=(list)=>{
list.sort((a,b)=>{
return b.votes-a.votes;
})
return list;
}



    render(){

       // console.log('songs lists rerendering');
        if(this.state.list!=null){
            if(this.state.list=='error') {
                return(
                    <div style={{margin:'0.6rem'}}>{this.state.error}</div>
                )
            }
            else{
 
                return(<div className="group">{this.build()}</div>)
            }
         }
         else{
            return(
          <div style={{height:'20rem'}} className="center"> <Loading size='1.5rem'/></div>
         )  
         }
    }
}

export default PodSongs