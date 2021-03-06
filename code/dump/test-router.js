import React, { Component } from "react";import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {View} from "./common/main.js";
// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on how you got there.
//
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.
var   previousLocation;
class ModalSwitch extends Component {
  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/img/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/img/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/img/2`.
  constructor(props){
      super(props);
   //   console.log(this.props.location);
    previousLocation = this.props.location;
  }
  

  componentWillUpdate(nextProps) {
    let { location } = this.props;

 previousLocation = this.props.location;
    // set previousLocation if props.location is not modal
   
  }
  render() {
    let { location } = this.props;
//console.log(this.props)


  //previousLocation.state=undefined;

  
    
     console.log(previousLocation);


if(this.props.location.state!==undefined)
   {
var isModal =this.props.location.state.preview;
console.log(isModal);

if(previousLocation==this.props.location){
  isModal=false;
  }


   } 
    else{
      var isModal =false;
    }

//let isModal=1;
    return (
      <div>
        <Switch location={isModal ? previousLocation : location}>
          <Route exact path="/" component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/img/:id" component={Modal} />
        </Switch>
           {isModal ? <Route path="/img/:id" component={Modal} /> : null}
      </div>
    );
  }
}


const IMAGES = [
  { id: 0, title: "Dark Orchid", color: "DarkOrchid" },
  { id: 1, title: "Lime Green", color: "LimeGreen" },
  { id: 2, title: "Tomato", color: "Tomato" },
  { id: 3, title: "Seven Ate Nine", color: "#789" },
  { id: 4, title: "Crimson", color: "Crimson" }
];

function Thumbnail({ color }) {
  return (
    <div
      style={{
        width: 50,
        height: 50,
        background: color
      }}
    />
  );
}

function Image({ color }) {
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: color
      }}
    />
  );
}

function Home() {
  return (
    <div>
      <Link to="/gallery">Visit the Gallery</Link>
      <h2>Featured Images</h2>
      <ul>
        <li>
          <Link to="/img/2">Tomato</Link>
        </li>
        <li>
          <Link to="/img/4">Crimson</Link>
        </li>
      </ul>
    </div>
  );
}

function Gallery() {
  return (
    <div>
      {IMAGES.map(i => (
        <Link
          key={i.id}
          to={{
            pathname: `/img/${i.id}`,
            // this is the trick!
            state: { preview: true }
          }}
        >
          <Thumbnail color={i.color} />
          <p>{i.title}</p>
        </Link>
      ))}
    </div>
  );
}

function ImageView({ match }) {
  let image = IMAGES[parseInt(match.params.id, 10)];

  if (!image) return <div>Image not found</div>;

  return (
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  );
}

function Modal({ match, history }) {
  let image = IMAGES[parseInt(match.params.id, 10)];

  if (!image) return null;

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
    
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)"
      }}
    >
      <div
        className="modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 25,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>{image.title}</h1>
        <Image color={image.color} />
        <button type="button" onClick={back}>
          Close
        </button>
        <Link to={{pathname:"/img/4",  state: { preview: true }}}>Crimson</Link>
      </div>
    </div>
  );
}


function toMS(p){
 //   console.log(p);
 return <ModalSwitch {...p} />
}

//export default ;

ReactDOM.render(<Router>
    <div>
      <View min="900"><Route path="/gallery" component={()=>{return(<h1>Test</h1>)}}/></View>   
      <Route component={toMS} />
    </div>
    </Router>
    ,document.getElementById("root"));