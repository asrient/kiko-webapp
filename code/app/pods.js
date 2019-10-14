/**
 * @ASRIENT 26 April 19.
 * exports the Pods (browse and explore pods)
 */
import $ from "jquery";
import React, {Component}  from "react";
import {View,Alert,Icon,log} from "../common/main.js";
import { Link,BrowserRouter as Router,Route } from "react-router-dom";
import KikoBar from "../parts/kikoBar.js";
import NewPod from "./new-pod.js";
import Browse from "./browse.js";
import {store} from "../live.js";
import './pods.css';
//import SongPicker from "./SongPicker.js";



class Pods extends Component {
 
    constructor(props){
        super(props);
        this.state={pod:store.getState().pod}
    }
    unsubscribe=null;
    componentDidMount=()=>{
        this.unsubscribe= store.subscribe(()=>{
            log('updating browse page');
            
            this.setState({pod:store.getState().pod});
            
                }) 
       
    }

componentWillUnmount(){
    this.unsubscribe();
}

showListeningTo=()=>{
      if(this.state.pod!=null){
        var pod=this.state.pod;
                    return(
                        <div style={{marginBottom: '0.2rem'}}>
                        <div className="size-s ink-black base-semibold">LISTENING TO</div>
                        <div style={{paddingTop:'0.4rem'}}>


                        <div className="ink-dark base-regular size-m group">
     <div style={{display:'flex',padding:"0.4rem 0.3rem"}}>
     <Link className="lnk" to={'/pod/'+pod.code}>
       <div className="ink-dark" style={{display:'flex'}}>
 <Icon className="size-l" src={pod.art}/>&nbsp;
     <div style={{display:"flex",flexDirection:"column",alignItems: "flex-start"}}>
        <div className="ink-dark base-regular size-s">{pod.name}</div>
        <div className="size-xs" style={{fontSize:'0.8rem'}}>🏆&nbsp;{pod.trophies}</div>
       </div>
       </div>
      
       </Link>
     </div>
      
    </div>

                        </div>
                        </div>
                    )
}
}
    buildOpt=(title,link,cb)=>{
     if(link!=null){
          return(
             <Link className="lnk" to={link}>
             <div className="size-s ink-dark base-regular pods_opt">{title}</div>
        </Link>
        )
     }
     else if(cb!=undefined){
        <div className="size-s ink-dark base-regular pods_opt center" onClick={cb}>{title}</div>
     }
       
    }

base=()=>{
   
    return(
       <div id="pods_layout">
        <div id="pods_slider">
            {this.showListeningTo()}
<div  style={{marginBottom: '0.2rem'}}>
            <div className="size-s ink-black base-semibold">PODS</div>

    {
        this.buildOpt((<div style={{display:'flex',alignItems: 'center'}}>
        <Icon className="size-xs" src="/icon/new-green.png"/>&nbsp;
        Create new
        </div>),'/pods/new')
    }
        {
            this.buildOpt((<div style={{display:'flex',alignItems: 'center'}}>
            <Icon className="size-xs" src="/icon/lookup-blue.png"/>&nbsp;
            Library
            </div>),'/library')
        }
        <hr/>
        </div>
        </div>
        <div id="pods_browse">
        <div className="size-xl ink-black base-bold">Explore</div>
        <Browse/>
        </div>
    </div> 
    )
    
}


    routes=()=>{
       return(
           <div>
 <Route path="/pods" exact component={this.base}/>
<Route path="/pods/new" exact component={(p)=>{return(<NewPod {...p} />)}}/>
</div>
       )
           
    }
        
    
    render=()=>{
         return(
         <div>
<KikoBar active="pods"/>
{this.routes()}
         </div>
         )
    }
    
   
  }

  export default Pods;