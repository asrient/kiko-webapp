import $ from "jquery";
import React  from "react";
import ReactDOM from "react-dom";
import "./IDcard.css";
import {View,Alert,Icon,prettyTime,Loading} from "../../common/main.js";
import {Link } from "react-router-dom";
import SongView from "./song.js";
import PageLoader from'../pageLoader.js';

class TopTracks extends React.Component{
  constructor(props){
    super(props);
    this.state={loading:true,err:null};
  }

  view=(data)=>{
   return(<SongView data={data} type="basic" key={data.isrc} />) 
  }

  render(){

        return(<div style={{maxWidth:"40rem",width:'100%'}}>
          <PageLoader paged={false} api={"/apis/user/topsongs/?userid="+this.props.userid} view={this.view} containerClass="group" />
          </div>)
      }
     
  }



class IDcardBody extends React.Component{
  constructor(props){
    super(props);
    this.state=this.props.data;
    this.state.fLoading=false;
  }

  componentDidMount=()=>{
    this.setState({fLoading:false})
  }
componentWillReceiveProps=(p)=>{
  this.setState({fLoading:false})
}

showPod(){
  if(this.props.data.pod!=undefined){
    var pod=this.props.data.pod;
    var title=(<div className="size-m ink-orange base-bold" style={{paddingBottom:'0.3rem'}}>LISTENING TO</div>)
    if(pod.role=='host'){
      title=(<div className="size-m ink-red base-bold" style={{paddingBottom:'0.3rem'}}>HOSTING</div>)
    }
return(
  <div className="size-s ink-black base-semibold" style={{margin:'1.1rem'}}>
    <div>{title}</div>
   <div className="center">
      <div className="ink-dark base-regular size-m group" style={{width:"fit-content",minWidth:"15rem"}}>
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
  else{
return(<div></div>)
  }
}

getCharms(){
 var buildCharm=(a,b)=>{
return(
<div className="id_charm center-col ink-black" key={a}>
<div className="center size-m base-bold ink-black" style={{marginBottom:'1rem'}}>{a}</div>
<div className="center base-semilight size-xs ink-dark">{b}</div>
        </div>
)
  }
 var charms=()=>{
 // console.log(this.state)
    var r=[];
    if(this.props.data.together_for!=undefined){
      r.push(buildCharm('⌛ '+prettyTime(this.props.data.together_for),'You two spent '+prettyTime(this.props.data.together_for)+' listening to music together this week.'));
    }
    if(this.props.data.hi5!=undefined){
       console.log('setting hi5 charm with:',this.state.hi5);
      r.push(buildCharm('🙌 '+this.props.data.hi5,'You two voted for same songs '+this.props.data.hi5+' times this week!'));
    }
    return r;
  }

  if(this.props.data.relation=='friend'||this.props.data.relation=='following'||this.props.data.relation=='follower')
 {
   return(
   <div className="center size-xs base-regular ink-black" style={{marginTop:"1rem",marginBottom:"1rem",width:"100%",flexWrap: 'wrap'}}>
    {charms()}
</div>
   )
 } 
}

getBroach=()=>{

var build=(src)=>{
return(
  <div className="id_broach center"><Icon src={"/icon/"+src+".png"} /></div>
)
}

  if(this.props.data.relation=='friend'||this.props.data.relation=='following'||this.props.data.relation=='follower'){
return build(this.props.data.relation);
  }
 
}

setfLoading=(s=true)=>{
  this.setState({fLoading:s})
}

Fbutt=()=>{

var Butt=(f)=>{
 var txt=f;
 if(this.state.fLoading){
   txt="Loading..";
 }
  return(
    <div>
    <div className="center size-xs base-regular">
      <div className="ink-blue" style={{marginRight:"0.6rem"}}>
      {this.props.data.followers_count}</div>
    <div className="fbutt ink-blue clickable"
    onClick={()=>{
      this.setfLoading(true);
      if(this.props.data.relation=='friend'||this.props.data.relation=='following'){
      
        $.get("/apis/user/unfollow?user="+this.props.data.userid).done((dat)=>{
            this.setfLoading(false);
          if(dat.result=='FAILED'){
              Alert(<div><div className="size-m">Could not unfollow</div>
              <div className="size-xs ink-light">{dat.data}</div>
              </div>)
            }
            else{
              this.props.reload();
            }
          });
      }

      if(this.props.data.relation=='none'||this.props.data.relation=='follower'){
      
        $.get("/apis/user/follow?user="+this.props.data.userid).done((dat)=>{
          this.setfLoading(false);
          if(dat.result=='FAILED'){
              Alert(<div><div className="size-m">Could not follow</div>
              <div className="size-xs ink-light">{dat.data}</div>
              </div>)
            }
            else{

              this.props.reload();
            }
          });
      }
    }}
    >{txt}</div></div>
  </div>
  )
}

if(this.props.data.relation=="none"||this.props.data.relation=="follower"){
 return Butt('Follow');
}
else if(this.props.data.relation=="friend"||this.props.data.relation=="following"){
  return Butt('Following');
}
else if(this.props.data.relation=="self")
  {
    return(
        <div className="center size-xs base-regular">
       <div className="ink-blue" style={{marginRight:"0.6rem"}}>
      {this.props.data.followers_count}</div>
    <Link to='/followers'> 
    <div className="fbutt ink-blue clickable">
     Followers
    </div>
      </Link>
    </div>  
    )
  
  }
}


actions=()=>{
  if(this.props.data.relation=="self")
  {
    return (
      <div style={{width:'100%',maxWidth:'25rem'}}>
    <br/>
      <div className="center" style={{width:'100%'}}>
         <button className="size-xs button-green-light" onClick={()=>{
           window.location.href="/settings"
         }}>Settings</button>
    <button className="size-xs button-red-light" onClick={this.props.reload}>Log Out</button>
      </div>
        
      </div>
   
    );
  }
}

  render(){
    return(
      

      <div>


     <div className="center">
        <div style={{maxWidth:'25rem',width:'100%'}}>
                <div className="links_row" style={{padding:'0.7rem'}}>
                   {
          Object.keys(this.props.data.links).map((key)=>{
             return(<a href={this.props.data.links[key]} key={key}><Icon src={"/icon/"+key+".png"}/></a> ) 
          })
      }  
                </div>
        
      </div>
     </div>
     
      <hr/>  
            <div className="pannel-text">
              <div className="id_nameplate center">
                   <div className="id_dp" style={{padding:"0.5rem",display:'flex',alignItems: 'baseline',justifyContent: "center"}}>
             <Icon className="dp" src={this.state.dp}/>   {this.getBroach()}
            </div>  
            <div style={{display:"flex"}}>
              <div className="center-col size-s base-semibold ink-black">
               <div>{this.props.data.name}</div>
          <div style={{paddingBottom:"0.6rem"}} className="size-xs base-semilight ink-dark">@{this.props.data.userid}</div>
          {this.Fbutt()}
           </div>
            </div>
              </div>
        
            
          </div> 

{this.showPod()}
{this.getCharms()}
{this.actions()}

     <br/>
     <div className="center"><div className="size-m ink-light base-bold">MOST VOTED TRACKS</div></div>
 <div className="center id_songlist">
 <TopTracks userid={this.props.data.userid} />
</div>
<br/>
<br/>
            </div>



          
    )
  }
}

//<IDcardBody data={dat}/>


class IDcardView extends React.Component {
_isMounted= false;
  constructor(props){
    super(props);
  }
  
componentDidMount=()=>{
  this.componentWillReceiveProps(this.props);
}

  componentWillReceiveProps=(p)=>{
    this._isMounted=true;
 var user=p.user;
 

   
      $.get("/apis/user/idcard?userid="+user).done((dat)=>{
 
        if(this._isMounted){
           this.setState({res:dat});
        }
  
        });
 
 
  }
 
componentWillUnmount(){
  this._isMounted=false;
}

reload=()=>{
  console.log('reloading IDcard!');
  this.componentWillReceiveProps(this.props);
}


    //
    render(){

      var put=(<div className="center size-l ink-dark base-regular" style={{height:'20rem'}}>LOADING</div>);
  if(this.state!=null){
/*
if(this.props.user!=this.state.res.data.userid){
  this.componentDidMount()
}
*/
    if(this.state.res.result=="SUCCESS")
{put=(<IDcardBody data={this.state.res.data} reload={this.reload}/>);}
else{
  put=(<div className="center size-l ink-dark base-regular" style={{height:'20rem'}}>{this.state.res.data}</div>);
}
  }
       return(
         <div className="center">
            <div style={{maxWidth:'50rem',width:'100%'}}>    
        {put}
        </div>
         </div>
      )
    }
}



  export default IDcardView;