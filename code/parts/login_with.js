import React  from "react";
import "../common/global.css";
import "./login_with.css";

class Login_with extends React.Component{
   go(){
    


  location.href=AUTH;
   }
   
    render(){
        return(
            <div id="lw_body">
    <div className="size-l ink-black base-semibold" style={{padding:"1rem",paddingTop:"0.2rem"}}>To continue,<br/>
    Connect your music app with kiko
    </div>
    <div id="opts" className="size-m ink-dark base-semilight">
    <div className="opt clickable" onClick={()=>{this.go()}}> <img src="/icon/spotify.png" className="icon size-xl"/>
    <div>&nbsp;&nbsp;Spotify</div></div>
    <div className="opt clickable">
     <img src="/icon/iTunes.png" className="icon size-xl"/><div>&nbsp;&nbsp;Apple Music</div></div>
</div>
<div className="center-col size-xs ink-dark base-semilight" style={{height:'5vh',marginTop:'1rem'}}>
You need to have a subscription of one of these apps to be able to use Kiko.<br/>
<a>Learn More ></a>
</div>

</div>
        )
    }
}





export default Login_with;