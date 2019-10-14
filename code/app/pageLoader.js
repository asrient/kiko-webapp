/**
 * @ASRIENT 13 July 19.
 * exports the browse all pods
 */
import $ from "jquery";
import React, {Component}  from "react";
import {View,Alert,Icon,log,Loading} from "../common/main.js";
//import "./browse.css";
//import { Link } from "react-router-dom";
class PageLoader extends Component {
 /**
  * @param {paged}
  * @param {api}  
  * @param {view}  (func)
  * @param {containerClass}  
  */
    constructor(props){
        super(props);
        this.state={list:null,lastkey:0,loading:true,allLoaded:false}
    }

download=(lastkey=0)=>{
    var state=this.state;
    state.loading=true;
    this.setState(state);
var api=this.props.api;
if(this.props.paged){
  api=  this.props.api+'?lastkey='+parseInt(lastkey);
}
    $.get(api).done(
        (dat)=>{
            var state=this.state;
            state.loading=false;
            if(dat.result=="SUCCESS"){
                if(state.list==null){
                     state.list=dat.data.items;
                }
              else{
                  state.list=state.list.concat(dat.data.items)
              }
               state.lastkey=parseInt(dat.data.lastkey);
              }
              else{
                if(state.list==null){
                    state.list='error';
              state.error=dat.data.toString();
                }
                else{
                    state.allLoaded=true;
                    Alert('No more to load');
                }
              }
               this.setState(state);
        }
        )
}
showMoreButt=()=>{
if(this.props.paged){
    if(!this.state.allLoaded){
        if(!this.state.loading){
           return(<div className="center"><button className="button-rounded button-bordered-black" onClick={this.loadMore}>Load more</button></div>) 
        }
         else{
             return(
                 <div className="center"><Loading/></div>
             )
         }
    }
   
}
}
componentDidMount=()=>{
    this.download(0)
}

loadMore=()=>{
    this.download(this.state.lastkey);
}

loadView=(data)=>{
    return this.props.view(data)
}

    render(){
        if(this.state.list==null){
            return(<div style={{height:'20rem'}} className="center"> <Loading size='1.5rem'/></div>)
        }
        if(this.state.list=='error'){
            return(<div className="size-s ink-light base-semilight">{this.state.error}</div>)
        }
        else{
            var list=[];
            this.state.list.forEach(elem => {
                list.push(this.loadView(elem));
             });
        return(<div>
            <div className={this.props.containerClass}>{list}</div>
            <br/><br/>
            {this.showMoreButt()}
            <br/><br/><br/>
        </div>)
        }
        
}
}


PageLoader.defaultProps={containerClass:'',paged:true}

export default PageLoader;