import React, { Component } from 'react';
import {connect} from 'react-redux';
import AdminInput from './AdminInput';

class Admin extends Component {
    render() {
        return (
          <AdminInput />
        );
    }
}


const mapStoreToProps = reduxStore => ({
    reduxStore,
})
export default connect(mapStoreToProps)(Admin);