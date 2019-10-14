import $ from "jquery";
import React  from "react";
import IDcardView from "./views/IDcard.js";
import {View,Window} from "../common/main.js";
import {Link } from "react-router-dom";
import KikoBar from "../parts/kikoBar";



class IDcard extends React.Component {

  constructor(props){
    super(props);
  }
 
 

    //
    render(){
     var active=null;
      if(me.userid==this.props.url.slice(2)){
        active='account';
      }
       return(
        <div>
<KikoBar active={active}/>
       <div>
        <IDcardView user={this.props.url.slice(2)}/>
      </div>
        </div>
      
      )
     
     
    }
}






  export default IDcard;