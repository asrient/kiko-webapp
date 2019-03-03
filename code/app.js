import $ from "jquery";
import React  from "react";
import ReactDOM from "react-dom";

import {View,newLayer,Pannel,Alert,killAction,Ask} from "./common/main.js";
import App from "./app/main.js";
import IDcard from "./app/IDcard.js";

import "./app/main.scss";



ReactDOM.render(<App/>,document.getElementById("root"));


ReactDOM.render(<View min={700} ><div style={{background:"grey"}}>Hi! this is a View!</div> </View>,document.getElementById("cats"));


var scopes="user-top-read%20user-read-private%20user-read-email%20user-read-birthdate%20user-follow-read%20user-modify-playback-state%20user-library-read%20user-library-modify%20user-read-playback-state%20user-read-currently-playing";


var TOKEN;
function check_keys(data){
    console.log(data);
    data=JSON.parse(data);
if(data.result=="FAILED"){      
    window.setTimeout(function(){
 location.href=auth;
    },1000) ;                 
    Alert("About to redirect to Spotify...")  ;         
    console.log("About to redirect to Spotify...");
   
}
else if(data.result=="SUCCESS"){
    console.log("new token recived!");
TOKEN=data.data;
}
}
var auth=new URL("https://accounts.spotify.com/authorize?client_id="+cID+"&response_type=code&redirect_uri="+PURL+"&scope="+scopes+"&state="+TICKET);

/*/////////////////

$.get("apis/get_keys.php").done(function(data){
   // data=JSON.stringify(data);                           
check_keys(data);
});

*/////////////////












/*
document.getElementById("hed_uid").innerHTML=ME.uid;
$("#hed_dp").attr("src",ME.dp);
*/

window.setInterval(function(){
    $.get("apis/get_keys.php").done(function(data){
        check_keys(data);
        });
},3600000);


class HelloMessage extends React.Component {
    render() {
      return <div>Hello {this.props.name}</div>;
    }
  }


/*
  ReactDOM.render(
    <HelloMessage name={ME.uid+'!'} />,
    document.getElementById('cats')
  );
 */
  



 

if(tovisit!=null){
    visit(tovisit);
}



function visit(uid){
  $.get("apis/user/get_info.php?userid="+uid).done(function(data){
        data=JSON.parse(data);
        if(data.result=="SUCCESS"){
             data=data.data;
        //  console.log(data);
        var nlayer=newLayer();
          ReactDOM.render(
            <IDcard data={data} opts="0"  holder={nlayer}/>,
            nlayer
          );
        }
        else{
            alert("No user found.");
        }
          });
}
 


  $(".you_butt").click(()=>{
  $.get("apis/me/get_info.php").done(function(data){
  data=JSON.parse(data);
   data=data.data;
  //  console.log(data);
  var nlayer=newLayer();
    ReactDOM.render(
      <IDcard data={data} opts="1" logout={()=>{logout()}} holder={nlayer}/>,
      nlayer
    );
    });
  });
  

  
  $(".new_butt").click(()=>{
    var nlayer=newLayer();
    ReactDOM.render(
<Ask holder={nlayer} title="Ask" body="This is an example of Ask">
<button onClick={()=>{Alert("Helo Bello!")}}>OK</button>
<button onClick={()=>{killAction(nlayer)}}>CANCEL</button>
</Ask>
  ,nlayer)
  });

 

function logout(){
    $.get("/apis/logout.php").done(dat=>{
        dat=JSON.parse(dat);
if(dat.result=="SUCCESS"){
   location.href="/" ;
}
if(dat.result=="FAILED"){
    console.log("Cant logOut!! Oh nooo");
}
    });
}


$(".branding").click(function(){location.href="/";});




