import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_PROJECTS', getProjects);
    yield takeEvery('GET_TAGS', getTags);
}

function* getProjects() {
    console.log('in getProjects');
    
    try {
        const projectsResponse = yield axios.get('/projects');
        const nextAction = { type: 'SET_PROJECTS', payload: projectsResponse.data };
        yield put(nextAction); // trigger our reducer
    } catch (error) {
        console.log('Error making GET request');
        alert('there was a problem');
    }
}

function* getTags() {
    console.log('in getTagss');

    try {
        const tagsResponse = yield axios.get('/tags');
        const nextAction = { type: 'SET_TAGS', payload: tagsResponse.data };
        yield put(nextAction); // trigger our reducer
    } catch (error) {
        console.log('Error making Tags GET request');
        alert('there was a problem');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store projects returned from the server
const projects = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the project tags (e.g. 'React', 'jQuery', 'Angular', 'Node.js')
const tags = (state = [], action) => {
    console.log('in tags reducer');
    
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        projects,
        tags,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
