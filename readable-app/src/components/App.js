import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import PostsList from './PostsList'
import PostDetails from './PostDetails'
import PostForm from './PostForm';


class App extends Component {

  render() {
    
    return (
      <div className='container'>
        <h2 align='center'>Readable</h2>
        <Switch>
          <Route path="/" exact component={PostsList} />} />
          <Route path="/newpost" exact component={PostForm}/>
          <Route path="/:category" exact component={PostsList} />}  />
          <Route path="/edit/:id" exact component={PostForm}/>
          <Route exact path='/:category/:id' component={PostDetails} />
        </Switch>
      </div>
        );
  }
}

export default withRouter(App);
