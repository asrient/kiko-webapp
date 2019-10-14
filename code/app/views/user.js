/**
 * @ASRIENT 12 June 19
 */
import $ from "jquery";
import React, {Component}  from "react";
import {View,Alert,Icon, prettyTime} from "../../common/main.js";
import { Link } from "react-router-dom";
import './user.css';

class UserView extends Component {
    constructor(props){
        super(props);
      
    }


showRel=()=>{
   var rel=this.props.data.relation;
   if(rel=='friend') {
return(<Icon src="/icon/friend.png"/>)
   }
  else if(rel=='following') {
    return(<Icon src="/icon/following.png"/>)
       }
       else if(rel=='follower') {
        return(<Icon src="/icon/follower.png"/>)
           }
}

wrapLink=(child)=>{
    if(this.props.click!=undefined){
return(
    <div  onClick={()=>{ this.props.click()}}>{child}</div>
)
    }
    else{
        return(
           <div>
            <Link className="lnk" to={'/@'+this.props.data.userid}>
                {child}
            </Link>
        </div>   
        )  
    }
}

buildRow3=()=>{
   var baseUp=(child)=>{
return(<div style={{fontSize:'0.75rem'}} className="uv_row3 ink-dark base-semilight">
<div className="line-xs">{child}</div>
<div>&nbsp;🏆&nbsp;{trophies}</div>
</div>)
    }
    if(this.props.data.pod!=undefined){
       var pod=this.props.data.pod;
        var trophies=pod.trophies;
        if(pod.voted_for!=undefined){
        var remark='👍';
        if(pod.is_match){
            remark='🙌';
        }
        var song=pod.voted_for.title;
return baseUp(<div>{remark}&nbsp;{song}</div>)
    }
    else if(pod.code!=undefined){
  var podColor='#00d737';
        if(pod.role=='host'){
            podColor='#ff006f';
        }
        return baseUp(
        <Link className="lnk" to={'/pod/'+pod.code}>
        <div style={{display:'flex'}}><div>🎧&nbsp;</div>
        <div style={{color:podColor}}>
         {pod.name}
         </div></div>
         </Link>
         );
    }
    else{
return baseUp(<div>🤔 mmm..</div>)
    }
    }
    
}


buildRow2=()=>{
    var row=[];
if(this.props.data.together_for!=undefined){
    row.push(<div key="together">⌛ {prettyTime(this.props.data.together_for)}&nbsp;&nbsp;&nbsp;</div>)
}
if(this.props.data.hi5!=undefined){
    row.push(<div key="hi5">🙌 {this.props.data.hi5}</div>)
}
return <div style={{fontSize:'0.65rem'}} className="uv_row2 base-semilight ink-dark">{  row  } </div> 
}

    render(){
        var data=this.props.data
        
        return (
            <div className='uv_container'>
               <div className='uv_in'>
                   <div className="center size-l" style={{padding:'0.4rem',paddingBottom: '0px'}} >
                 <Link className="lnk" to={'/@'+data.userid}><Icon className="dp" src={data.dp}/></Link>   
                       </div>
                   <div className="uv_rows">
              <div className="uv_row1 ink-black base-regular line-s" style={{fontSize:'1rem',cursor:'pointer'}}>
              {this.wrapLink(<div className="uv_row1 ink-black" >{data.userid}</div>)}
             <div style={{fontSize:'0.8rem'}}>{this.showRel()}</div> 
              </div>      
                {  this.buildRow2()  }
                   </div>

               </div>
               {this.buildRow3()}
              </div>
           )     
        
    }
}

export default UserView;