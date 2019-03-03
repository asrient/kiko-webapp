import $ from "jquery";
import React  from "react";
import ReactDOM from "react-dom";
import "../common/main.js";
import "./IDcard.css";

class IDcard extends React.Component {
    removeit(){   
      ReactDOM.unmountComponentAtNode( this.props.holder);
        this.props.holder.remove();
   }
   show_opts(){
    if(this.props.opts==1){
       return(<div className="acc_opts">
       <div className="acc_opt" onClick={()=>{location.href="/editme.php" }}>Edit</div>
       <div className="acc_opt" onClick={()=>{this.props.logout()}}>Log Out</div>
       <div className="acc_opt">Settings</div>
       </div>) 
    }
}
    render() {
      return( 
          
          <div className="pannel-container">
           <div id="cover" onClick={()=>this.removeit()}></div>
           {
              
              this.show_opts()
           }
      <div className="pannel" id="icard">
<div className="links_row">
{
    Object.keys(this.props.data.links).map((key)=>{
       return(<a href={this.props.data.links[key]}><img className="icon" src={"/icon/"+key+".png"}/></a> ) 
    })
}
          
       
</div>
      <div className="pannel-text">
       <img src={this.props.data.dp} className="size-xxl icon"/> 
        <h4>{this.props.data.name}</h4>
    <div>@{this.props.data.userid}</div>
    </div>

      <div className="like-butt"><img src="/icon/icon.png" className="icon"/></div>
      </div>    </div>  );
    
    }
   
  }


  export default IDcard;