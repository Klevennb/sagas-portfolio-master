import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import compose from 'recompose/compose';

//material UI's way to apply css without a file
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});


class Admin extends Component {
    state = {
        name: 'Cat in the Hat',
        tag: ''
    };
    componentDidMount() {
        this.getTags();
    }
    getTags() {
        const action = { type: 'GET_TAGS' };
        this.props.dispatch(action);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleAgeChange =  event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
        
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
               
                <TextField
                    required
                    id="standard-required"
                    label="Project Name (Required)"
                    placeholder="Project Name"
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />
                <FormControl className={classes.formControl}>
                    <Select
                        value={this.state.age}
                        onChange={this.handleAgeChange}
                        // displayEmpty
                        name="tag"
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.props.reduxStore.tags.map((tag) => {
                            return <MenuItem key={tag.id} value={tag.name}>{tag.name}</MenuItem>
                        }
                        )}
                    </Select>
                    <FormHelperText>Set Project Language</FormHelperText>
                </FormControl>
            </form>
        );
    }
}
//links to the css stuff
Admin.propTypes = {
    classes: PropTypes.object.isRequired,
}; 
const mapStoreToProps = reduxStore => ({
    reduxStore,
})
// export default withStyles(styles, connect(mapStoreToProps)(Admin));
export default compose(
    withStyles(styles),
    connect(mapStoreToProps)
)(Admin)