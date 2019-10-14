/**
 * @ASRIENT 6 July 19.
 * exports the browse all pods
 */
import $ from "jquery";
import React, {Component}  from "react";
//import {View,Alert,Icon,log,Loading} from "../common/main.js";
import PodView from'./views/pod.js';
import PageLoader from'./pageLoader.js';
import "./browse.css";
//import { Link } from "react-router-dom";
class Browse extends Component {

 loadView=(data)=>{
    return <PodView data={data} key={data.code} />
}

    render(){
   return(<PageLoader api={'/apis/browse'} containerClass='browse' view={this.loadView}/>)       
}
}




export default Browse;