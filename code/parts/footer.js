import React  from "react";
import {Icon} from  "../common/main.js";
import "./footer.css";

class Footer extends React.Component{
    render(){
         var end_class='end-default ';
         var end_ink='ink-light ';
        if(this.props.theme=='light'){
            end_class='end-light ';
            end_ink='ink-dark ';
        }
        return(
            <div className={"size-l end "+end_class+end_ink}>
<div id="connect-tray" className="container-fluid">
Get Engaged
<div id="connect" className="size-l center">
<a className="center" href="https://www.instagram.com/kikoupdates/"><Icon src="/icon/instagram.png"/></a>
<a className="center" href="https://twitter.com/kikoUpdates"><Icon src="/icon/twitter.png"/></a>
    <Icon src="/icon/youtube.png"/>
</div>
</div>
<div className="container-fluid center-col" style={{paddingTop:'2rem'}}>
<Icon className="size-l" src="/icon/icon-border-dark.png"/>
<div className=" ink-dark size-s base-semilight" style={{paddingTop:'1rem'}}>
    Made with ❤ by <a className="ink-dark" href="https://www.github.com/asrient">Aritra</a>.
    </div>
</div>
</div>
        )
    }
}
Footer.defaultProps={
    theme:'default'
}
export default Footer;