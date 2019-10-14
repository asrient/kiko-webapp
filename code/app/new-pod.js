import $ from "jquery";
import React  from "react";
import "./new-pod.css";
import SongPicker from "./SongPicker.js";
import {View,Alert,Icon,newLayer} from "../common/main.js";
import {Link } from "react-router-dom";
import ReactDOM from "react-dom";
/**
 * `state.status` @normal @wait @error
 */
class NewPod extends React.Component {
      constructor(props){
        super(props);
        this.state={songs:[],status:'normal'}
      }

done=()=>{
    var state=this.state;
    state.status='wait';
            this.setState(state);
            $.get('/apis/pod/new?name='+$('#np_in_name').val()+'&description='+$('#np_in_desp').val()+'&songs='+JSON.stringify(this.state.songs)).done(
                (res)=>{
                    if(res.result=='SUCCESS'){
this.props.history.push('/pod/'+res.data);
                    }
                    else{
                        var state=this.state;
                        state.status='error';
                        state.error=res.data;
                        this.setState(state);
                    }
                }
            )
}
actions=()=>{
if(this.state.status=='wait'){
  return(<div>Please Wait</div>) 
}
else if(this.state.status=='error'){
return(<div>
  {this.state.error}<br/>
   <button onClick={()=>{
       var state=this.state;
       state.status='normal';
       this.setState(state)}}>Try again</button>
    </div>)
}
else{
    return(
        <div> 
            <button className="button-blue" onClick={this.done}>Create</button>
        <button className="button-orange" onClick={()=>{window.history.back()}}>Cancel</button>
        </div>
       
    )
}
}
showSpicker=()=>{
  //  console.log('showing up song picker...');
    var nlayer=newLayer();
    nlayer.style.width='100%';
    ReactDOM.render(<SongPicker holder={nlayer} type="multiSelect" kill="unmount" selected={this.state.songs} return={(songs)=>{
var state=this.state;
state.songs=songs;
        this.setState(state);
    }}/>
    ,nlayer);

}
showSel=()=>{
return(<div className="size-s ink-black base-semibold">{this.state.songs.length} songs selected</div>)
}
      render(){
          return(  
              <div className="center-col">

              <div className="container-fluid center-col size-xl base-bold" id="np_hed">Host your own pod<br/>
 <div className="ink-white base-semilight" style={{padding:'3vh'}}>
 <div className="size-xs">A Pod is where you listen to your Music,<br/>Vote for the next Song,<br/> And let Others join you.</div>
 </div>
 </div>
 <div className="container center-col" id="np_bdy" style={{padding:'2vh'}}>
 
 
 <div id="np_opts" >
 <div className="ink-blue center-col" style={{margin:'1rem'}}><img src="/icon/art.png" style={{height:'9rem',marginTop:' 0%'}}/>Change</div>
 <div className="center-col base-regular ink-black">
<input type="text" className="input-line-bordered-dark" id="np_in_name" placeholder="Pod name"/>
<div className="size-m center-col" >Description <textarea id="np_in_desp"  className="input-line-bordered-dark"></textarea></div>
</div>
</div>
<div id="np_songs">
<div className="ink-black size-l base-semibold">Songs on the pod</div>
<br/>
<div>{this.showSel()}</div>
<button className="button-blue-light" onClick={()=>{this.showSpicker()}}>Add songs</button>
</div>
<div style={{borderTop:'solid thin',width:'100%',paddingTop:'1rem'}}>
 
  {this.actions()}
  <br/>
  <br/>
  <br/>
    </div>
 </div>
   
              </div>
             
               
             
          )
      }
    }

    export default NewPod;

