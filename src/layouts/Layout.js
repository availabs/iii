import React from 'react';
import {Redirect, Route} from "react-router-dom";
// Layout Components
import Menu from 'components/light-admin/menu'
import BreadcrumbBar from 'components/light-admin/breadcrumb-bar'
import ContentContainer from 'components/light-admin/containers/ContentContainer'
import LoadingPage from "components/loading/loadingPage"


const DefaultLayout = ({component: Component, ...rest}) => {
    if (rest.isAuthenticating) {
        return (
            <Route {...rest} render={matchProps => (
                <div className="all-wrapper solid-bg-all">
                    <div className="layout-w">
                        <ContentContainer>
                            <LoadingPage message={`Loading ${rest.name}...`}/>
                        </ContentContainer>
                    </div>
                </div>
            )}/>
        )
    }

    //console.log('rest', rest);
    // console.log('rest', rest);
    let contentStyle = {width: '100%'};
    if (rest.menuSettings.layout === 'menu-layout-mini') {
            contentStyle.marginLeft = 60
        }
    //console.log('rest: contentStyle', contentStyle)
    // console.log('rest: contentStyle', contentStyle)
    return (
        <Route {...rest} render={matchProps => (
        <div className="layout-w" style={{minHeight: '100vh'}}>
            <Menu {...rest} />
            <div style={contentStyle}>
                <BreadcrumbBar layout={rest.breadcrumbs} match={rest.computedMatch}/>
                <ContentContainer>
                    <Component {...matchProps} {...rest}/>
                </ContentContainer>
            </div>
        </div>
    )}/>
    )

};

export default DefaultLayout