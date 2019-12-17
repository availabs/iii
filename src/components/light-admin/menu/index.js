import React, {Component} from 'react'
import MainMenu from './MainMenu'
import {AvatarUser, LoginMenu, Logo} from './TopMenu'
import {connect} from "react-redux";
import get from 'lodash.get'
import styled from "styled-components";
// import './menu.css'

class Menu extends Component {
    render() {
        if (this.props.menuSettings.hide) return null;
        let currentPath = this.props.menus.filter(p => p.path === this.props.path)[0];


        // let title = currentPath[0] ? currentPath[0].name : ''
        let defaultOptions = {
            'location': 'menu-w',
            'color': 'selected-menu-color-light',
            'click': 'menu-activated-on-click',
            'selected': 'menu-has-selected-link',
            'image': this.props.menuSettings.image ? this.props.menuSettings.image : 'menu-with-image',
            'scheme': this.props.menuSettings.scheme ? this.props.menuSettings.scheme : 'color-scheme-dark',
            'style': this.props.menuSettings.style ? this.props.menuSettings.style : 'color-style-transparent',
            'submenucolor': 'sub-menu-color-light',
            'position': this.props.menuSettings.position ? this.props.menuSettings.position : 'menu-position-top',
            'layout': this.props.menuSettings.layout ? this.props.menuSettings.layout : 'menu-layout-full',
            'subemenustyle': 'sub-menu-style-inside'
        };
        /*
         menu-activated-on-click sub-menu-style-inside
         menu-activated-on-hover sub-menu-style-flyout
        * */
        let displayOptions = Object.values(defaultOptions).join(' ');

        defaultOptions.position === 'menu-position-left'
            ? document.body.classList.add('menu-position-side')
            : document.body.classList.remove('menu-position-side');

        let dynamicStyle = {
            marginBottom: currentPath.subMenus ? 50 : 0,
            position: 'fixed',
            zIndex: 100
        };

        defaultOptions.position === 'menu-position-top' ?
            dynamicStyle['width'] = '100vw' : dynamicStyle['height'] = '100vh';

        const DROPDOWN = defaultOptions.scheme === 'color-scheme-dark' ? styled.div`
                        div > select {
                        color: #fff;
                        border: none;
                        font-size: 0.81rem;
                        font-weight: 500;
                        text-transform: uppercase;
                        white-space: nowrap;
                        letter-spacing: 2px;
                        padding: 0px;
                        }
                    ` : styled.div`
                    div > select {
                    color: #3E4B5B;
                    border: none;
                    background: none;
                    font-size: 0.81rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    white-space: nowrap;
                    letter-spacing: 2px;
                    padding: 0px;
                    }
                    `;
            // console.log('menuProps', currentPath, dynamicStyle)
       /* let userMenu = this.props.user && !!this.props.user.authed
            ? <AvatarUser user={this.props.user}/>
            : <LoginMenu/>;*/

        return (

            <div className={displayOptions} style={dynamicStyle}>
                <Logo/>
				<h1 className="menu-page-header">{this.props.title}</h1>
                <MainMenu {...this.props} />
            </div>

        )
    }
}
const mapStateToProps = (state,ownProps) => {
    return {
        router: state.router,
    };
};

const mapDispatchToProps = {};
export default Menu