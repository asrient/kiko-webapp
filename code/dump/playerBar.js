/**
 * @ASRIENT 26 April 19
 * the player bar that every page wants.
 */

import $ from "jquery";
import React, {Component}  from "react";
import { Link } from "react-router-dom";
import './playerBar.css';

class PlayerBar extends Component{
constructor(props){
    super(props);
}

    setClass(){
    if(this.props.contain==true){
return("pb_wrapper_contain")
    }
    else{return("pb_wrapper")}
}
    render(){
    return(
        <div className={this.setClass()+" center"}>
        <div id="pb_bar">
        <div className="center-col fullWidth">
       <div className="ink-dark size-xs">Aritra's Pod</div>
       <div className="ink-dark size-xs base-light center">🎵 <marquee loop={2} scrolldelay="100" behaviour="scroll" direction="left">
       Boy With Luv (feat. Halsey)</marquee></div>
        </div>
        <div><button className="button-green button-rounded size-xs">View</button></div>
        </div>
        </div>
    )
}
}

export default PlayerBar;