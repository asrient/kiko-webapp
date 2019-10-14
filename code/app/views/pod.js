/**
 * @ASRIENT 12 June 19
 */
import $ from "jquery";
import React, {Component}  from "react";
import {View,Alert,Icon} from "../../common/main.js";
import { Link } from "react-router-dom";
import './pod.css';

class PodView extends Component {
    constructor(props){
        super(props);
      
    }

    render(){
        var data=this.props.data
        
        return (
                 <div className="pv_container center-col ink-dark base-regular">
              <div style={{margin:'0.6rem',marginBottom:'0.2rem',fontSize:'6.5rem'}} ><Icon src={data.art}/></div>
              <div style={{marginBottom:'0.6rem'}} className="ink-black base-light size-l line-xl">{data.name}</div>
             <Link to={'/pod/'+data.code}><div style={{marginBottom:'0.5rem'}} className="pv_butt ink-black base-light size-s">View</div></Link> 
            </div>
           )     
        
    }
}

export default PodView;