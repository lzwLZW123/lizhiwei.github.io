/* eslint-disable */
// import React, {Component} from "react";

import {
    HashRouter as Hash,
    Route,
    Switch
} from "react-router-dom";

import MainLayout from "./views"

export  class MainRouter extends Component{
    render(){
        return (
            <Hash
                basename=""
            >
                <Route component={MainLayout} ></Route>
            </Hash>
        )
    }
}





