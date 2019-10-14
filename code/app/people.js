/**
 * @ASRIENT 26 April 19.
 * exports the People (people list)
 */
import $ from "jquery";
import React, {Component}  from "react";
import {View,Alert,Icon} from "../common/main.js";
import { Link,Route } from "react-router-dom";
import KikoBar from "../parts/kikoBar.js";
import './people.css';
import IDcardView from './views/IDcard.js';
import UserView from'./views/user.js';
import PageLoader from'./pageLoader.js';


class FindFriends extends Component {
    constructor(props){
        super(props);
     
    }
    render(){
        return(
            <div>
            <div className="size-l ink-black base-bold" style={{padding:'1rem'}}>Find friends</div>
            </div>
        )
    }
}




class People extends Component {
 
    constructor(props){
        super(props);
        this.state={
            view:0
        }
    }
   

   load=(data)=>{
        return <UserView data={data}
        key={data.userid}
         click={()=>{
           if(window.innerWidth>700){
               var state=this.state;
               state.view=data.userid;
                this.setState(state) 
        if(this.props.location.pathname!='/people'){
            this.props.history.push('/people')
        }
        
           }
            else{
               
                this.props.history.push('/@'+data.userid);
            }
        }}
        />
            }

showList=()=>{
 return (
     <PageLoader containerClass="group" api="/apis/user/following" view={this.load}/>
 )
}
showIconPage=()=>{
    return(
    <div className='center-col' style={{height:'88vh'}}>
        <div><Icon style={{fontSize:'5rem'}} src='/icon/people-art.svg'/></div>
        <br/>
        <div className='size-s base-regular ink-dark'>Kiko loves friends, bring them here.</div>
        <div style={{marginTop:'2rem'}}>
            <Link to='/people/find' className='lnk'> 
            <button className='button-blue-light'>Find friends</button>
            </Link>
            </div>
    </div>
)
}


loadBrowse=()=>{
    return(
        <div style={{minHeight:'100%'}}>
        <Route exact path='/people/find' component={()=>{return(<FindFriends/>)}}/>
<Route exact path='/people/' component={
  ()=>{
      if(this.state.view==0){
          return this.showIconPage()
      }
      else{
         // console.log('view seen by browse: '+this.state.view)
          return <IDcardView user={this.state.view}/>
      }
  } 
    }/>
</div>
    )
}




base=()=>{
    return( 
         <div id="ppl_layout">
             <div id="ppl_sliderHolder">
    <div id="ppl_slider">
  <div className="size-xl ink-black base-bold"  style={{marginBottom: '0.8rem'}}>People</div>
<View max={700}>
   <div className="center" style={{paddingBottom:'1.2rem'}}>
   <Link to='/people/find' className='lnk'> 
            <button className='button-blue-light'>Find friends</button>
            </Link>
</div> 
</View>

<div id="ppl_list"> 
 {this.showList()}
</div>
    </div>
    </div>
    <div id="ppl_browse">
        <View min={700} >
              {this.loadBrowse()}
        </View>
    </div>
</div>
 )
}




    render(){

      console.log('rendering with view: '+this.state.view)

         return(
         <div>
             <KikoBar active="people"/>
<Route path="/people" exact component={this.base}/>
<Route path="/people/find" exact component={()=>{
  return(
      <div>
   <View min={900}>{this.base()}</View>
    <View max={899}><FindFriends/></View>
    </div>  
  )

}}/>
         </div>)
    }
    
   
  }

  export default People;