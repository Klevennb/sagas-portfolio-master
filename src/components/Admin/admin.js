import React, { Component } from 'react';
import {connect} from 'react-redux';

class Admin extends Component {
    // Renders the entire app on the DOM
    render() {
        return (
            <h1>Hit</h1>
        );
    }
}

export default connect() (Admin);