/**
 * @ASRIENT 19 June 19
 * 
 * *props* @data @button @click
 * *type* @basic @button 
 */
import $ from "jquery";
import React, {Component}  from "react";
import {View,Alert,Icon,prettyTime} from "../../common/main.js";
import { checkLoved } from "../../music.js";
import './song.css';


class SongView extends Component {
    constructor(props){
        super(props);
      this.state={is_loved:false}
    }

    componentDidMount=()=>{
        if(this.props.data.is_loved!=undefined){
            this.setState({is_loved:this.props.data.is_loved})
        }
        else if(this.props.data.spotifyId!=undefined){
          checkLoved(this.props.data.spotifyId,(is_loved)=>{
            this.setState({is_loved:is_loved})
          })
        }
    }

buildCol1=()=>{

    var love=()=>{
        if(this.state.is_loved){
            return(<div className="ink-red">❤</div>)
        }
    }

      var is_playing=false;
       
    if(this.props.data.is_playing!=undefined){
        is_playing=this.props.data.is_playing;
    }
    var getTitleClass=()=>{
        if(is_playing){
            return("ink-green")
        }
        else{
            return('ink-black')
        }
    }
  var icon=()=>{
    if(this.props.data.rank!=undefined){
        return(<div className="size-m center ink-dark base-semibold" style={{padding:'0.4rem'}}>{this.props.data.rank}</div>)
    }
else if(is_playing){
    return(<div className="size-m" style={{padding:'0.4rem'}}>🔈</div>)
}
    }
return(
    <div className="s_col1 ink-black base-regular">
        <div>
{icon()}
        </div>
        <div>
           <div className={getTitleClass()} style={{fontSize:'0.8rem',overflow:'hidden',height:'1rem'}}>{this.props.data.title}</div>
<div className="ink-dark base-semilight" style={{display:'flex',fontSize:'0.6rem',overflow:'hidden',height:'0.8rem'}}>{love()}&nbsp;{this.props.data.artists}</div> 
        </div>

    </div>
)
}

buildCol2=()=>{
   var length=()=>{
        if(this.props.data.length!=undefined){
            return(<div className="ink-light base-light" style={{fontSize:'0.6rem'}}>{prettyTime(this.props.data.length)}</div>)
        }
    }
   var info=()=>{
            return(<div className="center">{length()}</div>)
    }

var action=()=>{
if(this.props.type=='button'){
return(<div className="size-m" onClick={()=>{this.props.click(this.props.data.isrc)}}>{this.props.button}</div>)
}
else if(this.props.data.votes!=undefined){
    if(this.props.data.is_voted_for){
        return(<div className="s_votes s_votes-active center size-xs base-regular">{this.props.data.votes}</div>)
    }
    else{
        return(<div className="s_votes size-xs center base-regular"> {this.props.data.votes}</div>)
    }

}
}

    return(
        <div className="s_col2 ink-black base-regular">
<div>{info()}</div>
<div>{action()}</div>
        </div>
    )
}
showBar(){
    var width=0;
    if(this.props.data.votes!=undefined&&this.props.data.total_votes!=undefined){
        width=(this.props.data.votes/this.props.data.total_votes)*100;
         return( <div style={{width:width+'%'}} className="s_bar"></div>)
    }
  
}

    render(){
        var data=this.props.data
        
        return (
            <div className='s_container'>
                {this.showBar()}
               <div className='s_in'>
                   
              <div>
              { this.buildCol1() }
              </div>  
              <div>
                {  this.buildCol2()  }
                   </div>

               </div>
               
               
              
              </div>
           )     
        
    }
}

export default SongView;