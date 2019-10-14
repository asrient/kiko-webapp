//import $ from "jquery";
import React  from "react";
import "./SongPicker.css";
//import {View,Alert,Icon,Window,killAction} from "../common/main.js";
import UserView from'./views/user.js';
import PageLoader from'./pageLoader.js';
import KikoBar from "../parts/kikoBar.js";
/**
 */
class PodListeners extends React.Component {
    constructor(props){
      super(props);
      this.state={list:'loading'};
    }

    load=(data)=>{
     
       
        return <UserView data={data} key={data.userid} />
    }

 


body=()=>{

return(<PageLoader containerClass="group" api="/apis/pod/listeners" view={this.load}/>)
}



    render(){
       
        return(

            <div>
            <KikoBar/>
        <div style={{padding:'1rem'}} className="size-l ink-black base-semibold">
            On this pod
        </div>
        <div  className="center">
<div className="container-healthy">
           {this.body()}
       </div>
        </div>
      
         </div>
        )
    }
}

export default PodListeners;