import $ from "jquery";
import React  from "react";
import UserView from "./views/user.js"
import {View,Icon,log, Loading} from "../common/main.js";
import {Link } from "react-router-dom";
import {ifPodUpdates,socket,mUpdates} from "../live.js";

class PodPeople extends React.Component {

    constructor(props){
      super(props);
    this.state={ list:null};
    }
    download(){
        console.log('DOWNLOADING podPeople')
        $.get("/apis/pod/mates?code="+this.props.pod).done((dat)=>{
 
            if(dat.result=='SUCCESS'){
                var state=this.state;
                state.list=dat.data.items;
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
    console.log('user has either left or joinned the pod. [podPeople]');
    console.log('Re-downloading [podPeople]')
this.download();
}
    }

    refresh=()=>{
        log('EVENT DETECTED: refresh [podMates]','yellow');
  console.warn('refreshing podMates');
this.download();
    }


    componentDidMount(){
        this.download();
         
         mUpdates.connect();
         mUpdates.on('connect',()=>{
           log('Connected to mates channel as '+mUpdates.id,'green' )
       })
       mUpdates.on('userUpdate',(data)=>{
        //console.log('EVENT DETECTED: userUpdate on /mates channel :',data);
           log('EVENT DETECTED: userUpdate on /mates channel :'+data,'yellow' )
           var state=this.state;
           if(state.list!=null&&state.list!='error'){
       
             state.list.find((elem,index)=>{
             if(elem.userid==data.userid){
                  state.list.splice(index,1,data);
                   this.setState(state)
                    return true
             }
             else{
                 return false
             }
             })
                    
           }
       })
       mUpdates.on('addUser',(data)=>{
           //console.log('EVENT DETECTED: addUser on /mates channel :',data)
        log('EVENT DETECTED: addUser on /mates channel :'+JSON.stringify(data),'yellow' )
        var state=this.state;
       if(state.list!=null&&state.list!='error'){
           state.list.splice(0,0,data);
           this.setState(state)
       }
    })
    mUpdates.on('removeUser',(data)=>{
       // console.log('EVENT DETECTED: removeUser on /mates channel :',data);
        log('EVENT DETECTED: removeUser on /mates channel :'+data,'yellow' )
        var state=this.state;
        if(state.list!=null&&state.list!='error'){
    
          state.list.find((elem,index)=>{
          if(elem.userid==data){
               state.list.splice(index,1);
                this.setState(state)
                 return true
          }
          else{
              return false
          }
          })
                 
        }
    })
       
       mUpdates.on('disconnect',()=>{
           log('Disconnected from mates channel','red' )
       })

       socket.on('refresh', this.refresh);

           }
       
       componentWillUnmount(){
            mUpdates.disconnect();
           mUpdates.off('connect');
           mUpdates.off('disconnect');
           mUpdates.off('userUpdate');
           mUpdates.off('addUser');
           mUpdates.off('removeUser');
         
    socket.removeListener('refresh',this.refresh)
       }

build(){

    var voted=[];
    var notVoted=[];
   // console.log(this.state.list);
    this.state.list.forEach((item)=>{
        if(item.pod.voted_for!=undefined){
            voted.push(<UserView data={item} key={item.userid}/>)
        }
        else{
            notVoted.push(<UserView data={item} key={item.userid}/>)
        }

    })
    if(voted.length||notVoted.length){
         if(voted.length){
             //console.log('no one voted yet')
             return(<div>
                     <div className="group">{voted}</div>
                     <div style={{marginTop:'0.3rem'}}></div>
                     <div className="group">{notVoted}</div>
                 </div>)
         }
         else{
           return(<div className="group">{notVoted}</div>) 
         }
    }
    else{
        return(<div style={{minHeight:'12rem'}} className="group size-s center ink-light">
            No friends here yet,<br/> tell your friends about this pod.
            </div>)
    }
}


    render(){
      //  console.log('people lists rerendering');
        if(this.state.list!=null){
           if(this.state.list=='error') {
               return(
                   <div style={{margin:'0.6rem'}}>{this.state.error}</div>
               )
           }
           else{

               return(<div>{this.build()}</div>)
           }
        }
        else{
           return(
            <div style={{height:'20rem'}} className="center"> <Loading size='1.5rem'/></div>
        )  
        }
       
    }
}

export default PodPeople