import $ from "jquery";
import React  from "react";
import "./global.css";
import ReactDOM from "react-dom";
import './pannel.css';
import './loader.css';

class View extends React.Component{
  constructor(props){
    super(props);
  
       this.state={display:this.setDisp()};

  }

 
  _isMounted=false;
    check=()=>{
     if(this.state.display!=this.setDisp())
      {
if(this._isMounted) {
  this.setState({display:this.setDisp()});
} 
        } 
}


 setDisp=()=>{
   if((window.innerWidth>=this.props.min)&&(window.innerWidth<=this.props.max)) {
    return(this.props.display);
   }
   else{
   return("none");
   }
}
/*
setChild(){
if(this.setDisp()=="none"){
  
    return("");
}
else{
  return(this.props.children);
}
}*/
  

   componentDidMount=()=>{
    this._isMounted=true;
    window.addEventListener('resize',this.check);
   }

   componentWillUnmount=()=>{
    this._isMounted=false;
      // console.log('removing event listener View---');
   window.removeEventListener('resize',this.check);
   }

    render(){

if(this.state.display!='none'){
return( <div className={this.props.className} id={this.props.id} style={{display:this.state.display}}>
  { this.props.children}
   </div>)
}
else{
  return('');
}
     /* return(
          <div className={this.props.className} id={this.props.id} style={{display:this.state.display}}>
         { this.state.children}
          </div>
      ) */
    }
}
View.defaultProps={
    display:"block",min:0,max:5000,className:"",id:""
    }


class Icon extends React.Component{
render(){
    return(
        <img src={this.props.src} className={"icon "+this.props.className} style={this.props.style}/>
    )
}
}

Icon.defaultProps={
    src:"/icon/ico.png",style:{background:"transperent"},className:" "
}


function newLayer(){
var layer= document.createElement("div");
layer.style.position="fixed";
layer.style.zIndex="3";
document.getElementById("screen").append(layer);
return layer;
}
/*
PANNEL
--Container is Provided here with no styles.
style the container using style and add class by using container props.
*/
class Pannel extends React.Component{
    constructor(p){
super(p);

    }
    kill(){   
        if(this.props.Kill!="disable"){
            if(this.props.kill=="back"){
              window.history.back();
            }
            else{
                ReactDOM.unmountComponentAtNode( this.props.holder);
          this.props.holder.remove();
            } 
        }
     }
     
    render(){
        var layerClass="pannel_layer";
if(this.props.layer=="loose"){
    layerClass="pannel_layer_loose"
}
        return(
            <div className={"center-col "+layerClass} style={{padding:this.props.margin}}>
            <div className="cover" onClick={()=>{this.kill()}}></div>
           <div className={"z3 "+this.props.container} style={this.props.style}>
                {this.props.children}
           </div>
            
            </div>
        )
    }
}

Pannel.defaultProps={
    layer:"fixed",
        margin:"1rem",
        style:{ minHeight:"50vh",
        background:"white",
        borderRadius:"1.5rem",justifyContent:"space-evenly"},
        container:"container-slim",
        kill:"unmount"
}


//set min-height max-width for computer screens using container prop.

class Window extends React.Component{

  
 
render(){
     var wCont="winCont";
     if(this.props.kill=="unmount"){
         wCont="winContTight";
     }
    return(
        <div style={{zIndex:'10',minHeight:'100%'}}>
        <Pannel kill={this.props.kill} margin="0rem" layer="loose" style={{}} container={"winContainer "+this.props.widthClass} holder={this.props.holder}>
        <div className={wCont}>
             {this.props.children}
        </div>
        </Pannel>
        </div>
    )
}
}
Window.defaultProps={
    kill:"unmount",
    widthClass:"win-healthy",
}



var optButt={
    padding:"0.15rem",
    
    width:'100%',
    margin:"0px"
}

function Alert(title="Alert!",body=" "){
    var nlayer=newLayer();
    ReactDOM.render(
      <Pannel holder={nlayer} container="container-slim center-col" style={{
        width:"93%",
                minHeight:"28vh",
                background:"white",
                borderRadius:"1.5rem",
                minWidth:'313px',padding:'1.2rem',justifyContent:"space-evenly"
        }}>
        
      <div key="title" className="size-m ink-black base-regular">{title}</div>
      <div key="body" className ="size-xs ink-dark base-semilight">{body}</div>
     <div key="opts" style={{width:'30%'}}>
         <button className="button-rounded button-bordered-purple" style={optButt} onClick={()=>{killAction(nlayer)}}>OK</button>
     </div> 
        
      </Pannel>  , nlayer   );
}

class Ask extends React.Component{
  
  render(){
    const children = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
            className:"button-purple button-rounded",
             style:{  padding:"0.5rem",
             paddingLeft:'1rem',
             paddingRight:'1rem',
             width:'100%',borderWidth:'0px',
             margin:"5px"} 
        });
    });


      return(   <Pannel holder={this.props.holder} container="container-slim center-col" style={{
        width:"93%",
                minHeight:"30vh",
                background:"white",
                borderRadius:"1.5rem",
                maxWidth:'313px',padding:'2rem',justifyContent:"space-evenly"
        }}>
        
      <div key="title" className="size-m ink-black base-regular">{this.props.title}</div>
      <div key="body" className ="size-xs ink-black base-semilight" style={{paddingBottom:"1rem",
      paddingTop:"1rem"}}>{this.props.body}</div>
     <div key="opts" style={{minWidth:'70%',justifyContent:"space-evenly"}} className="center-col">
      {children} 
     </div>      
      </Pannel>   )
      
  }
    
}



function killAction(holder){
    ReactDOM.unmountComponentAtNode(holder);
   // holder.remove();
    }
    

    function log(data,color){
        if(color==undefined){
          color='white';
        }
        if(color=='purple'){
          color='magenta';
        }
        if(color=='yellow'){
          color='#ff8c00';
        }
        if(color=='blue'){
          color='#00BCD4';
        }
        if(document.getElementById('console')!=undefined){
          window.prevLogs=window.prevLogs+'<div class="logs" style="color:'+color+'">'+data+'</div>';
          $('#console').append(
        '<div class="logs" style="color:'+color+'">'+data+'</div>'
      )
        }
        else{
          window.prevLogs=window.prevLogs+'<div class="logs" style="color:'+color+'">'+data+'</div>';
        }
      
      }

      class Loading extends React.Component{

    render(){
      if(this.props.type=='bubble'){
         return(
       <div style={{position:'relative',display:'inline-block',height:this.props.size,width:this.props.size}} ><div className="spinner" ></div></div> 
    )
      }
      else if(this.props.type=='ring'){
        return(
        <div style={{position:'relative',display:'inline-block',height:this.props.size,width:this.props.size}} >
            <div className="spinner-ring" ></div>
        </div>
      )
      }
     }
      }
      
Loading.defaultProps={type:'ring',size:'1.2rem'}


function prettyTime(ms){
  if(ms==null){
    return("0s")
  }
  else if(ms==undefined){
    return("")
  }
  else{
      ms=parseInt(ms) 

if(ms>1000){
 var sec=parseInt(ms/1000);
if(sec>60)
{
var min=parseInt(sec/60);
sec=sec%60;
if(min>60){
  var hr=parseInt(min/60);
  min=min%60;
  if(hr>24){
var days=parseInt(hr/24);
hr=hr%24;
return(days+"d "+hr+"h")
  }
  else{
    return(hr+"h "+min+"m")
  }
}
else{
  return(min+"m "+sec+"s")
}
}
else{
  return(sec+"s")
}
}
else{
  return("0s")
}
  }


}


export {View,Icon,newLayer,Alert,killAction,Pannel,Ask,Window,log,Loading,prettyTime};