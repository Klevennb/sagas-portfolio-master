import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//for tag select
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// helps merge exports
import compose from 'recompose/compose';

//material UI's way to apply css 
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    descriptionTextField: {
        width: 500
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


class AdminInput extends Component {
    state = {
        project: '',
        date: '',
        github: '',
        tag: '',  //in selector
        website: '',
        description: ''
    };
    componentDidMount() {
        this.getTags();
    }
    getTags() {
        const action = { type: 'GET_TAGS' };
        this.props.dispatch(action);
    }
    //changes states to handle input changes
    handleProjectChange = project => event => {
        this.setState({
            project: event.target.value,
        });
    };
    handleDateChange = date => event => {
        this.setState({
            date: event.target.value,
        });
    };
    handleGithubChange = github => event => {
        this.setState({
            github: event.target.value
        });
    };
    handleTagChange = event => {
        this.setState({
            tag: event.target.value
        })
    }
    handleWebsiteChange = website => event => {
        this.setState({
            website: event.target.value
        });
    };
    handleDescriptionChange = description => event => {
        this.setState({
            description: event.target.value
        });
    };

    // sends to saga
    postNewProject = () => {
        const action = ({
            type: 'ADD_PROJECT',
            payload: this.state
        })
        this.props.dispatch(action);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                    required
                    label="Project Name (Required)"
                    placeholder="Project Name"
                    className={classes.textField}
                    margin="normal"
                    value={this.state.project}
                    onChange={this.handleProjectChange('project')}
                />
                <TextField
                    label="date"
                    className={classes.textField}
                    value={this.state.date}
                    onChange={this.handleDateChange('date')}
                    margin="normal"
                />
                <TextField
                    label="GitHub URL"
                    className={classes.textField}
                    value={this.state.github}
                    onChange={this.handleGithubChange('github')}
                    margin="normal"
                />
                <TextField
                    label="Website URL"
                    className={classes.textField}
                    value={this.state.website}
                    onChange={this.handleWebsiteChange('website')}
                    margin="normal"
                />
                <TextField
                    label="Description"
                    className={classes.descriptionTextField}
                    value={this.state.description}
                    multiline
                    rows="4"
                    variant="outlined"
                    onChange={this.handleDescriptionChange('description')}
                    margin="normal"
                />
                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.tag}
                        onChange={this.handleTagChange}
                        name="tag"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.props.reduxStore.tags.map((tag) => {
                            return <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>
                        }
                        )}
                    </Select>
                    <FormHelperText>Set Project Language</FormHelperText>
                </FormControl>
            </form>
            <button onClick={this.postNewProject}>Submit</button>
            </div>
        );
    }
}
//links to the mUI css stuff
AdminInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStoreToProps = reduxStore => ({
    reduxStore,
})
export default compose(
    withStyles(styles),
    connect(mapStoreToProps)
)(AdminInput)