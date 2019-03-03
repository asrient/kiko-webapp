import $ from "jquery";
import "./common/global.css";
import React  from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div className="center-col" style={{height:"100vh"}}>
  <div id="hed" className="size-xl ink-black base-light center" style={{  height:'30vh' }}>
  <img src="icon/kiko-color.png" className="icon"/>
           </div>
  Hi! <span id="name"></span>
  Choose an UserID
   <div id="response" style={{
        padding:'2vh',
        marginBottom: '2vh',
        color:'rgb(202, 0, 0)',
        background:'rgba(0, 228, 0, 0.281)',
display:'none',
borderRadius: '3vh'
    }}>
    </div>
  <div><input id="uid" type="text" placeholder="UserID" className="input-line-dark"/></div>
  <button className="button-blue" id="butt">Done</button>
  </div>
  ,document.getElementById("root"));

$('#name').html(ME.name);
$("#butt").click(function(){

 document.getElementById("butt").innerHTML="Please Wait";
      $.get("/apis/me/set_uid.php/?userid="+document.getElementById("uid").value,function(res){
          res=JSON.parse(res);
          if(res.result=="FAILED"){
            $("#response").css({display:"block",color:"rgb(202, 0, 0)",
        background:"rgba(255, 8, 0, 0.281)"});
        document.getElementById("response").innerHTML=res.data;
        document.getElementById("butt").innerHTML="Try Again";
          }
          else if(res.result=="SUCCESS"){
            $("#response").css({display:"block",color:"rgb(0, 183, 24)",
        background:"rgba(0, 255, 0, 0.2)"});
            document.getElementById("response").innerHTML=res.data;
           location.href="/";
          }
      })  ;

});