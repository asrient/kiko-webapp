/**
 * @ASRIENT 22 July 19.
 * exports the browse all pods
 */
import $ from "jquery";
import React, {Component}  from "react";
import {View,Alert,Icon,log,Loading} from "../common/main.js";
import SongPicker from "./SongPicker.js"
import { Link } from "react-router-dom";
class AddSongs extends Component {
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
     $.get("/apis/pod/songs/add?tracks="+tracks).done((dat)=>{
 
        if(dat.result=='SUCCESS'){
            window.history.back();
        }
        else{
            Alert(dat.data);
        }
    })   
    }
    else{
        window.history.back();
    }
}


    render=()=>{
     
        return(<div>
           <SongPicker title="Add more songs" 
          type="multiSelect"
          selected={[]}
          kill="back"
           return={(tracks)=>{
               this.send(tracks)
           }}
           />
        </div>)
        }
        
}





export default AddSongs;