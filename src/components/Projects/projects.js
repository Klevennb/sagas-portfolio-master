import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import CardHeader from '@material-ui/core/CardHeader';

const styles = theme => ({
    card: {
        minWidth: 275,
        maxWidth: 400
    },
    media: {
        height: 140,
        // width:50,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class Projects extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.getProjects();
    }
    getProjects() {
        const action = {type: 'GET_PROJECTS'};
        this.props.dispatch(action); 
        console.log(this.props.reduxStore.projects);
    
    }
    appendProjects = () => {
        const { classes } = this.props;
        console.log('in aP', this.props.reduxStore.projects);
        
        return this.props.reduxStore.projects.map((project) => {
            return <Card className={classes.card}>
                    <CardHeader
                title= {project.name}
                subheader= {project.language}
                    />
                    <CardMedia
                        className={classes.media}
                    image="https://giffiles.alphacoders.com/120/thumb-120222.jpg"
                    />
                    <CardContent>
                        <Typography component="p">
                            {project.description}
                        </Typography>
                        <Typography component="p">
                            {project.date_completed}
                        </Typography>
                    </CardContent>
                    </Card>
    })}
    render() {
        return (
            this.appendProjects()
        );
    }
}

const mapStoreToProps = reduxStore => ({
    reduxStore,
})

Projects.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(mapStoreToProps)
)(Projects)