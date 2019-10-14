import $ from 'jquery';
import React, { Component } from "react";
import {Icon,Alert,View} from "../common/main.js";
import "./kikoBar.css";
import { Link } from "react-router-dom";


class KikoBar extends React.Component{
constructor(p){
super(p);
}

    render(){

var active=null;
if(this.props.active!=undefined){
  active=this.props.active;
}

    var getLastOpt=()=>{
        if(me.userid!=null){
        return(<Link className="kb_lnk" to={'/@'+me.userid}>
        <View max="900"><Icon className="size-m" src={"/icon/dp-"+iColor[3]+".svg"}/></View>
             <View min="900">Account</View> 
             </Link>)
        }
        else{
          return(
             <a className="kb_lnk" href='/'>
                          <View max="900"><Icon className="size-m" src="/icon/dp-dark.svg"/></View>
                               <View min="900">Log In</View> 
                               </a>
          )
        }
        }


        var iColor=['dark','dark','dark','dark'];
        var txtColor=['black','black','black','black'];

        if(this.props.active!=undefined&&this.props.active!=null){
         var ac= this.props.active;
          if(ac=='people'){
            iColor[0]='blue';
            txtColor[0]='blue';
          }
          else if(ac=='pods'){
            iColor[1]='blue';
            txtColor[1]='blue';
          }
          else if(ac=='search'){
            iColor[2]='blue';
            txtColor[2]='blue';
          }
          else if(ac=='account'){
            iColor[3]='blue';
            txtColor[3]='blue';
          }
        }

        return(
            <div>
            <div id="kb_bar">
                
              <div className="center" id="kb_brnd" >
                <Link className='kb_lnk' to='/test'>
                <Icon className='size-s' src='/icon/icon-border.jpg'/>
                </Link>
                  </div> 
              <div id="kb_opts">
                  <div className={"kb_opt base-semibold ink-"+txtColor[0]+" size-s"}>
                   <Link className="kb_lnk" to='/people'>
                  <View max="900"><Icon className="size-m" src={"/icon/friend-"+iColor[0]+".svg"}/></View>
                     <View min="900">Friends</View> 
                    </Link>
                      </div>
                   <div className={"kb_opt base-semibold ink-"+txtColor[1]+" size-s"}>
                   <Link className="kb_lnk" to='/'>
                   <View max="900"><Icon className="size-m" src={"/icon/play-"+iColor[1]+".svg"}/></View>
                       <View min="900"> Pod</View>
                       </Link> 
                       </div>
                  <div className={"kb_opt base-semibold ink-"+txtColor[2]+" size-s"}>
                  <Link className="kb_lnk" to='/search'>
                  <View max="900"><Icon className="size-m" src={"/icon/search-"+iColor[2]+".svg"}/></View>
                       <View min="900">Search</View> 
                       </Link>
                     </div>
                  <div className={"kb_opt base-semibold ink-"+txtColor[3]+" size-s"}>
                 {getLastOpt()}
                      </div>
              </div>
            </div>
            <View min="900">
               <div id="kb_space"></div>
         </View> 
             
            </div>
        )
        }
}

export default KikoBar;