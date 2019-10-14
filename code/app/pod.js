import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import { View, Icon, log, Loading, Ask, newLayer, killAction, Alert } from "../common/main.js";
import { Link, Route, Switch } from "react-router-dom";
import KikoBar from "../parts/kikoBar";
import "./pod.css";
import { ifPodUpdates, socket, store } from "../live.js";
import PodPeople from "./podPeople.js";
import PodSongs from "./podSongs.js";
import RemoveSongs from "./removeSongs.js";
import { CircularProgressbarWithChildren as Circle, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class SwitchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { active: 'songs' };
    }
    switcher() {
        if (this.state.active == 'mates') {
            //   console.log('showing mates',this.state.active);
            return (

                <div className="size-l base-light" style={{ display: 'flex' }}>


                    <div className="clickable ink-light" onClick={() => {
                        this.setState({ active: 'songs' })
                    }}>Songs</div>
                    &nbsp; &nbsp;<div className="ink-black">Friends</div>
                </div>
            )
        }
        else {
            // console.log('showing songs',this.state.active);
            return (

                <div className="size-l base-light" style={{ display: 'flex' }}>

                    <div className="ink-black">Songs</div> &nbsp;&nbsp;
           <div className="clickable ink-light" onClick={() => {

                        this.setState({ active: 'mates' })
                    }}>Friends</div>

                </div>
            )
        }
    }
    show() {
        if (this.state.active == 'mates') {
            return (<div><PodPeople pod={this.props.pod} mypod={this.props.mypod} /></div>)
        }
        else {
            return (<div>
                {this.props.songOpts()}
                <PodSongs pod={this.props.pod} mypod={this.props.mypod} />
                </div>)
        }
    }

    render() {
        return (
            <div style={{margin: "0rem 0.6rem"}}>
                <div style={{ padding: '1rem' }}>{this.switcher()}</div>
                <div>{this.show()}<br /><br /><br /></div>
            </div>
        )
    }
}

class Obar extends React.Component {
    /**
     * 
     * @param {next_refresh}  
     * @param {track_length}
     */
    setPercentage = () => {
        var time = new Date().getTime();
        var len = this.props.track_length;
        var covered = len - (this.props.next_refresh - time);
        var percent = (covered / len) * 100;
        var state = this.state;
        state.percentage = percent;
        this.setState(state)
    }
    componentDidMount = () => {
        this.setPercentage();
        var state = this.state;
        state.clock = window.setInterval(this.setPercentage, 500);
        this.setState(state);
    }
    componentWillUnmount = () => {
        clearInterval(this.state.clock)
    }
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0,
            clock: null
        }
    }
    render() {
        return (<Circle
            styles={buildStyles({
                trailColor: '#ffe3ba',
                pathColor: '#ffbc57'
            })}
            value={this.state.percentage}>
            {this.props.children}
        </Circle>)
    }
}
class Pod extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            mypod: store.getState().pod,
            showing: 'lists'
        }
    }
    unsubscribe = null;

showSongOpts=()=>{
    if (this.state.mypod != null) {
        if (this.state.mypod.code == this.state.data.code&&this.state.mypod.role=='host') {
             return(
        <div className="pod_s_opts">
            <div className="pod_s_opt center size-m" onClick={() => {
                    this.props.history.push('/pod/songs/add');
                }}><Icon src="/icon/new-dark.png"/></div>
            <div className="pod_s_opt center size-m" onClick={() => {
                    var state = this.state;
                    state.showing = 'removeSongs';
                    this.setState(state);
                }}><Icon src="/icon/minus-dark.png"/></div>
        </div>
    )
        }}
   
}

    showOpts() {
        //  console.log('showing opts..') ;
        var nlayer = newLayer();
        ReactDOM.render(
            <Ask title="More" holder={nlayer} >
                <button className="button-rounded button-purple" onClick={() => {
                    killAction(nlayer);
                    this.props.history.push('/pod/songs/add');
                }}>
                    Add more songs
</button>
                <button className="button-rounded button-purple" onClick={() => {
                    var state = this.state;
                    state.showing = 'removeSongs';
                    this.setState(state);
                    killAction(nlayer);
                }}>
                    Remove songs
</button>
                <button style={{ margin: '0.2rem', cursor: 'pointer' }} onClick={() => {
                    killAction(nlayer)
                }}>
                    Cancel
</button>
            </Ask>
            , nlayer)
    }

    componentDidMount() {
        var podCode = this.props.url.slice(5)
        console.log('showing pod code', podCode);
        $.get("/apis/pod?code=" + podCode).done((dat) => {

            if (dat.result == 'SUCCESS') {
                var state = this.state;
                state.data = dat.data;
                this.setState(state);
            }
            else {
                var state = this.state;
                state.data = 'error';
                state.error = dat.data;
                this.setState(state);
            }


        });

        this.unsubscribe = store.subscribe(() => {
            log('updating pod page');
            console.log('pod page got now updates!', store.getState().pod);
            var state = this.state;
            state.mypod = store.getState().pod;
            this.setState(state);

        })
    }


    componentWillUnmount() {
        this.unsubscribe();
    }

    build() {


        var lists = () => {
            if(this.props.focus){
                if (this.state.showing == 'lists') {
                            return (
                                <div>
                                    <View min={1001} mypod={this.state.mypod}>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '100%', padding: '1rem' }}>
                                                <div className="size-l ink-black base-semibold"> Songs</div>
                                                <div className="pod_lists">
                                                {this.showSongOpts()}
                                                    <PodSongs pod={this.state.data.code} mypod={this.state.mypod} />
                                                </div>
                                            </div>
                                            <div style={{ width: '100%', padding: '0.6rem' }}>
                                                <div className="size-l ink-black base-semibold"> Friends</div>
                                                <br />
                                                <div className="pod_lists">
                                               
                                                    <PodPeople pod={this.state.data.code} mypod={this.state.mypod} />
                                                </div>
                                            </div>
                                        </div>
                                    </View>



                                    <View max={1000}>
                                        <SwitchList activeList={this.state.activeList} pod={this.state.data.code} mypod={this.state.mypod} 
                                        songOpts={this.showSongOpts}
                                        />



                                    </View>
                                </div>
                            )
                        
            }
            else if (this.state.showing == 'removeSongs') {
                return (
                    <div>
                        <RemoveSongs podCode={this.state.data.code} done={() => {
                            var state = this.state;
                            state.showing = 'lists';
                            this.setState(state)
                        }} />
                    </div>
                )
            }
 
            }
           else{
               console.warn("pod lists in bg not rendered");
           }


        }
        var show_now_playing = () => {
            if (this.state.mypod.trackObj != undefined) {
                return (
                    <div className="center-col">
                        <div className="size-xs ink-dark base-semilight line-s">{this.state.mypod.trackObj.title}</div>
                        <div className="size-xs ink-light base-light line-s">{this.state.mypod.trackObj.artists}</div>
                    </div>
                )
            }
            else {
                return (
                    <div>LOADING</div>
                )
            }
        }
        var playing = () => {
            var percentage = 25;//////////////
            if (this.state.mypod != null && this.state.mypod.code == pod.code) {
                return (
                    <div className="center-col">
                        <div className="pod_ply_ring center" onClick={() => {
                            socket.emit('leave');
                        }}>
                            <Obar next_refresh={this.state.mypod.next_refresh} track_length={this.state.mypod.track_length}> <Icon src="/icon/leave.png" /></Obar>

                        </div>
                        {show_now_playing()}
                    </div>
                )
            }
            else {
                return (
                    <div className="center-col">
                        <div className="pod_ply_ring center" onClick={() => {
                            socket.emit('join', pod.code);
                        }}>
                            <Circle
            styles={buildStyles({
                trailColor: '#ffe3ba',
                pathColor: '#ffbc57'
            })}
            value={100}>
            { <Icon style={{fontSize:"1.5rem"}} src="/icon/join.png"/>}
        </Circle>
                        </div>
                    </div>
                )
            }
        }
        var status = () => {
            if (this.state.mypod != null) {
                if (this.state.mypod.code == pod.code) {
                    return (
                        <div style={{ display: "flex" }}>
                            <Link to="/pod/listeners"><div className="pod_lnrs_butt">
                                🎧&nbsp;{this.state.mypod.listeners}</div></Link>
                            <div style={{ marginLeft: '0.5rem' }} className="pod_lnrs_butt">🏆&nbsp;{this.state.mypod.trophies}</div>
                        </div>

                    )
                }
            }
            else {
                return (<div className="pod_lnrs_butt">
                    🎧&nbsp;{pod.listeners}</div>)
            }

        }



        var pod = {}

        if (this.state.data != null) {
            pod = this.state.data;
            if (this.state.data != 'error') {
                return (
                    <div className="pod_layout">
                        <div className="pod_info">
                            <div className="center" style={{ paddingTop: '0.9rem' }}>
                                <Link to="/pods"><button className="button-rounded button-bordered-black">Browse more</button></Link>
                            </div>
                            <div className="pod_i_basic">
                                <div className="center"><img className="pod_art" src={pod.art} /></div>
                                <div className="pod_i_basic_text">
                                    <div className="size-l base-semibold ink-black line-xxl" style={
                                        {
                                            paddingTop: '0.5rem', overflow: "hidden",
                                            paddingTop: "0.5rem",
                                            maxHeight: "5rem"
                                        }
                                    }>{pod.name}</div>
                                    <div className="size-s base-semilight ink-dark line-m">
                                        <Link to={'/@' + pod.host.userid}> <div>
                                            {pod.host.userid}
                                        </div>
                                        </Link>
                                    </div>
                                    <div className="pod_i_status">

                                        <div style={{display:'flex'}}>{status()}</div>

                                    </div>
                                </div>
                            </div>

                            <div className="pod_i_playing center-col">
                                {playing()}
                            </div>
                        </div>
                        <div>
                            {lists()}
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="center base-semibold size-l" style={{ minHeight: '20rem' }}>
                        {this.state.error}
                    </div>
                )
            }
        }
        else {
            return (
                <div className="center base-semibold size-l" style={{ minHeight: '10rem' }}>
                    <Loading />
                </div>
            )
        }
    }


    //
    render() {
       var active=null;
        if (this.state.mypod!=null&&this.state.data!=null&&this.state.mypod.code == this.state.data.code){
          active='pods';
        }
        return (
            <div>
                <KikoBar active={active} />
                {this.build()}
            </div>
        )
    }
}

export default Pod;