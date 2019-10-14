/**
 * @ASRIENT 22 July 19.
 * exports the browse all pods
 */
import $ from "jquery";
import React, {Component}  from "react";
import {View,Alert,Icon,log,Loading} from "../common/main.js";
import SongPicker from "./SongPicker.js"
import { Link } from "react-router-dom";
class RemoveSongs extends Component {
 /**
  * @param done
  * @param podCode 
  */
    constructor(props){
        super(props);
        this.state={}
    }

send=(tracks)=>{
    if(tracks.length){
        tracks=JSON.stringify(tracks);
     $.get("/apis/pod/songs/remove?tracks="+tracks).done((dat)=>{
 
        if(dat.result=='SUCCESS'){
          this.props.done();
        }
        else{
            Alert(dat.data);
        }
    })   
    }
    else{
        this.props.done();
    }
}


    render=()=>{
     
        return(<div>
           <SongPicker containerClass="group" title="Remove Songs" contain={true}
            butt={(<Icon className="size-s clickable" src="/icon/remove.png" />)}
           activeButt={(<Icon className="size-s clickable" src="/icon/add-green.png" />)}
          api={"/apis/pod/songs?code="+this.props.podCode}
          isPaged={false}
          type="multiSelect"
          selected={[]}
          pre={(<div className="center"><Link to="/pod/songs/add"><button className="button-blue-light">Add new songs</button></Link></div>)}
           return={(tracks)=>{
               this.send(tracks)
           }}
           />
        </div>)
        }
        
}





export default RemoveSongs;