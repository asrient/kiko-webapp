import React  from "react";
import {View,Alert,Icon,Window} from "../common/main.js";
import KikoBar from "../parts/kikoBar";

class Search extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
       
        return(
<div>
<View max={900}>
<KikoBar active="search"/>
</View>
            <Window widthClass='win-fat' kill="back">
           <div className="size-xl base-bold ink-black" style={{padding:'1rem',width:'100%',textAlign:'left',paddingLeft:'3rem'}}>Search</div>
          <div><input type="text" placeholder="search" className="input-line-dark"/></div>
            </Window>
            </div>
        )
    }
}

export default Search;