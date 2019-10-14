import $ from "jquery";
import React  from "react";
import ReactDOM from "react-dom";
import "./common/global.css";
import "./login.css";
import Login_with from "./parts/login_with";
import Footer from "./parts/footer.js";


ReactDOM.render(
    
    <div>

<div id="screen"></div>
    <div id="frame">
    <div className="center" id="topico"> <img src="/icon/icon.png" className="icon size-xl"/></div>
<Login_with/>
<br/><hr/>
<div className="center-col base-bold ink-black size-xl" style={{padding:'1.5rem'}}>
More
</div>
<div className="sec" id="cards">

<div className="card" id="c1" onClick={()=>{location.href="/info"}}>
<div className="ink-white base-semibold size-l">What is kiko?</div>
</div>
<div className="card" id="c2" onClick={()=>{location.href="/people"}}>
    <div className="ink-white base-semibold size-l">Find Friends</div>
    </div>
    <div className="card" id="c3" onClick={()=>{location.href="/pods"}}>
        <div className="ink-white base-semibold size-l">Browse Pods</div>
        </div>
</div>




    </div>
<Footer theme='light'/>
    </div>
    
    
    
    ,document.getElementById("root"));










$("#info").click(()=>{
    location.href="/info";
});



   






  




/////////////////////CODE FOR IDCARD//////////////////////






