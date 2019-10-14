import $ from "jquery";
import React, {Component}  from "react";
import {View,newLayer,Alert,killAction,Ask,Icon} from "../common/main.js";
import "./home.css";
import { Link } from "react-router-dom";
import PlayerBar from "./playerBar.js";
import Blist from "./browse.js"; 
import Plist from "./people.js";

class Home extends Component{
    constructor(props){
        super(props);
    }
    chooseList(){
         if(this.props.list=='browse'){
    return(<div><Blist/></div>)
}
else if(this.props.list=='people')  {
    return(<div><Plist/></div>)
}
    }

    selected(){
        if(this.props.list=='browse'){
              return(    <div id="top_bar" className="ink-dark base-semibold size-xl">Browse &nbsp; 
            <Link className="ink-light lnk" to='/people'>People</Link> 
              </div>  )
        }
      else{
        return(    <div id="top_bar" className="ink-dark base-semibold size-xl">
         <Link to='/browse' className="ink-light lnk">Browse</Link>
            &nbsp; People</div>  )
      }
    }
    render(){
    return(
        <div id="all" style={{height:'100%',width: '100%'}}>
        {console.log("==showing home==")}
            <View max='900' className="fullWidth">
           {this.selected()} 
            </View>
            <View max='899' className="fullWidth"> <PlayerBar/></View>

   <View min='900' className="fullWidth">
<div id="cont_full">
<div id="plist_full">
<div id="plist_title" className="center size-l base-regular">People</div>
<div id="plist_cont">
   <Plist/> 
</div>

</div>
<div id="blist_full">
<div id="blist_title" className="ink-black size-xl base-bold">Browse</div>
<Blist/>
</div>
</div>
</View>

<View max='899' className="fullWidth">
<div id="cont">
<br/><br/><br/><br/>
{  this.chooseList()}
</div>
</View> 




<div id="nav_bar" >
<div id="plr_space" className="ink-light base-regular"><View min='900'><PlayerBar contain={true}/></View></div>
<div className="center" style={{padding:"0.7rem"}}>
   <Link className="lnk" to='/new-pod'><Icon className="nav_icons size-m" src="/icon/new-dark.png"/></Link> 
   <Link className="lnk" to='/search'><Icon className="nav_icons size-m" src="/icon/search-dark.png"/></Link>
   <Link className="lnk" to={'/@'+myID}><Icon className="nav_icons size-m" src="/icon/dp-dark.png"/></Link>
</div>

</div>
        </div>
    )
}
}

export default Home;