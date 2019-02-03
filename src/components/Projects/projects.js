import React, { Component } from 'react';
import { connect } from 'react-redux';

class Projects extends Component {
    componentDidMount(){
        this.getProjects();
    }
    getProjects() {
        const action = {type: 'GET_PROJECTS'};
        this.props.dispatch(action); 
        console.log(this.props.reduxStore.projects);
    
    }
    appendProjects = () => {
        console.log('in aP', this.props.reduxStore.projects);
        
        return this.props.reduxStore.projects.map((project) => {
            return <h1>{project.name}</h1>
    })}
    render() {
        return (
            this.appendProjects()
            // <div>
            //     this.props.reduxState.projects.map((project) => {
            //         return (
            //             <h1>{project.description}</h1>
            //         );
            //     )}
            // </div>
            
        );
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
})

export default connect(mapStoreToProps)(Projects);