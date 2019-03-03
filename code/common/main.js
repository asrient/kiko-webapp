import $ from "jquery";
import React  from "react";
import "./global.css";
import ReactDOM from "react-dom";


class View extends React.Component{
 check(){
     if(this.state.display!=this.setDisp())
      {this.setState({display:this.setDisp(),children:this.setChild()});} 
 }
 setDisp(){
   if((window.innerWidth>=this.props.min)&&(window.innerWidth<=this.props.max)) {
    return(this.props.display);
   }
   else{
   return("none");
   }
}
setChild(){
if(this.setDisp()=="none"){
  
    return("");
}
else{
  return(this.props.children);
}
}
    constructor(props){
     super(props);
   
        this.state={display:this.setDisp(),children:this.setChild()};

   }
   componentDidMount(){
       window.addEventListener('resize',()=>{this.check()});
   }


    render(){
      return(
          <div className={this.props.className} id={this.props.id} style={{display:this.state.display}}>
         { this.state.children}
          </div>
      ) 
    }
}
View.defaultProps={
    display:"block",min:0,max:5000,className:"sample",id:""
    }


class Icon extends React.Component{
render(){
    return(
        <img src={this.props.src} className="icon" style={this.props.style}/>
    )
}
}

Icon.defaultProps={
    src:"/icon/ico.png",style:{background:"transperent"}
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
    kill(){   
        ReactDOM.unmountComponentAtNode( this.props.holder);
          this.props.holder.remove();
     }
    render(){
        return(
            <div className="center-col" style={{position:'fixed',top:'0px',left:'0px',height:'100%',width:'100%',padding:this.props.margin}}>
            <div className="cover" onClick={()=>{this.kill()}}></div>
           <div className={"center-col z3 "+this.props.container} style={this.props.style}>
                {this.props.children}
           </div>
            
            </div>
        )
    }
}

Pannel.defaultProps={
        margin:"1rem",
        style:{background:"transperent", minHeight:"50vh",
        background:"white",
        borderRadius:"1.5rem",justifyContent:"space-evenly"},
        container:"container-slim"
}


var optButt={
    padding:"0.15rem",
    
    width:'100%',
    margin:"0px"
}

function Alert(title="Alert!",body=" "){
    var nlayer=newLayer();
    ReactDOM.render(
      <Pannel holder={nlayer} container="container-slim" style={{
        width:"95%",
                minHeight:"28vh",
                background:"white",
                borderRadius:"1.5rem",
                maxWidth:'313px',padding:'1.2rem',justifyContent:"space-evenly"
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
            className:"button-rounded button-bordered-purple",
             style:{  padding:"0rem",
             paddingLeft:'1rem',
             paddingRight:'1rem',
             width:'100%',borderWidth:'1px',fontWeight:"200",
             margin:"4px"} 
        });
    });


      return(   <Pannel holder={this.props.holder} container="container-slim" style={{
        width:"95%",
                minHeight:"30vh",
                background:"white",
                borderRadius:"1.5rem",
                maxWidth:'313px',padding:'2rem',justifyContent:"space-evenly"
        }}>
        
      <div key="title" className="size-m ink-black base-regular">{this.props.title}</div>
      <div key="body" className ="size-xs ink-dark base-semilight" style={{paddingBottom:"1rem",
      paddingTop:"1rem"}}>{this.props.body}</div>
     <div key="opts" style={{minWidth:'40%',justifyContent:"space-evenly"}} className="center-col">
      {children} 
     </div>      
      </Pannel>   )
      
  }
    
}


function killAction(holder){
    ReactDOM.unmountComponentAtNode(holder);
    holder.remove();
    }
    



export {View,Icon,newLayer,Alert,killAction,Pannel,Ask};