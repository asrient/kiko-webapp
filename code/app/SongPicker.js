//import $ from "jquery";
import React  from "react";
import "./SongPicker.css";
import {View,Alert,Icon,Window,killAction} from "../common/main.js";
import SongView from'./views/song.js';
import PageLoader from'./pageLoader.js';
/**
 * `type` @basic @multiSelect @select
 * @type @selected @return @kill @title @api @contain @activeButt @butt
 */
class SongPicker extends React.Component {
    constructor(props){
      super(props);
      this.state={};
    }

    load=(data)=>{
        var ty='basic';
         var butt=(<div>No Action</div>)
        if(this.props.type=='multiSelect'){
            ty='button'
butt=this.props.butt
 if(this.state.selected.includes(data.isrc))
        {
            butt=this.props.activeButt;
        }
        }
       else if(this.props.type=='select'){
            ty='button'
butt=(<button className="button-rounded button-orange">Choose</button>)
 if(this.state.selected==(data.isrc))
        {butt=(<div className="ink-blue base-semibold">SELECTED</div>)}
        }
       
        return <SongView data={data} type={ty} button={butt} key={data.isrc} click={(isrc)=>{
         // console.log('SongView button Clicked!',isrc);
            var state=this.state;
         //    console.log(state.selected)
            if(this.props.type=='multiSelect'){
              if(state.selected.includes(isrc)){
                 var ind= state.selected.indexOf(isrc);
                 state.selected.splice(ind,1);
              }
               else{state.selected.push(isrc)} 
            }
            if(this.props.type=='select'){
           this.state.selected=isrc;
            }
              this.setState(state);
          }}/>
    }

    componentDidMount=()=>{
 


   var state=this.state;
   if(this.props.selected!=undefined){
        state.selected=this.props.selected
   }
  else{
      if(this.props.type=='multiSelect'){
          state.selected=['USQX91802455','USUM71901873','USUM71907487'];
      }
    else{
        state.selected='USQX91802455';
    }
  }
   

    }



done=()=>{
    if(this.props.return!=undefined){
        this.props.return(this.state.selected);
    }
    if(this.props.kill=='back')
       {window.history.back();} 
       else if(this.props.kill=='unmount'){
           killAction(this.props.holder)
       }
}

    render(){
var pre=()=>{
    if(this.props.pre!=undefined){
        return(
            <div style={{padding:'1rem'}}>{this.props.pre}</div>
        )
    }
}
var inside=()=>{
    return(
        <div>
     <div id="spik_hed" className="size-l ink-black base-semibold">{this.props.title}
           <button id="spik_done" className="button-blue-light button-rounded" onClick={this.done}>Done</button>
           </div>
          <div>
              {pre()}
              <PageLoader paged={this.props.isPaged} api={this.props.api} view={this.load}/>
          </div>
</div>
    )
}

       if(this.props.contain){
return inside();
       }
       else{
           var kill=this.props.kill;
           if(kill==undefined){
               kill='disable'
           }
            return(

            <Window widthClass='win-slim' kill={kill} holder={this.props.holder}>
           {inside()}
            </Window>
        )
       }
       
    }
}

SongPicker.defaultProps={api:"/apis/user/songs",title:"Your Library",contain:false,isPaged:true,
activeButt:(<Icon className="size-s clickable" src="/icon/remove.png" />),
butt:(<Icon className="size-s clickable" src="/icon/add-green.png" />)
}

export default SongPicker;