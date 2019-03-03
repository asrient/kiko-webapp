import $ from "jquery";
import React  from "react";
import {View,Icon} from "../common/main.js";



class App extends React.Component{
render(){
   return(
       <div>
    <div id="screen"></div>
    <div id="frame">
       
       <div className="container-fluid " id="hed">
    
          <div id="nav" className="clickable center">
          <View min="700">
           <Icon src="icon/ico.png"/> 
          </View>
          <View display="flex" max="699" id="nav_bar" className="ink-black base-semibold">
        
              <div>Browse</div>
          <div className="ink-light">People</div>
          
         
          </View>
       </div>
    
       <div id="plr_space">  <div id="plr_bar"></div>   </div>
    
       <View min="701">
    <div className="opts_bar">
      <div className="center size-s  clickable new_butt">
       <Icon id="new_sym" src="/icon/add-green.png"/>
      <div className="ink-green base-regular">New</div>
      </div>
      
      
       <div className="center size-s  clickable search_butt" >
          <Icon src="icon/search-blue.png" className="size-s"/>
          <div className="ink-blue base-regular">Search</div>
          </div>
       <div className="center size-s  clickable you_butt" >
           <Icon src="icon/dp.png" className="size-s"/>
       <div className="ink-red base-regular">You</div>
       </div>
</div>
</View>

       </div>

<View max="700" id="opts_holder" display="flex" >
       <div className="opts_bar container-fluid" id="phone_opts_bar">
      <div className="center size-s clickable new_butt" >
       <Icon src="/icon/add-green.png"/>
      <div className="ink-green base-regular">New</div>
      </div>
       <div className="center size-s  clickable search_butt" >
          <Icon src="icon/search-blue.png" className="size-s"/>
          <div className="ink-blue base-regular">Search</div>
          </div>
       <div className="center size-s  clickable you_butt" >
           <Icon src="icon/dp.png" className="size-s"/>
       <div className="ink-red base-regular">You</div>
       </div>
</div>
<div id="nav_line"></div>
</View>



       <div id="cats" className="container-fluid ink-dark">Hold Tight! </div> 
    </div>
    </div>
) 
}
    
    
}

export default App;