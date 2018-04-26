import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {PrivateRoute} from './libraries/react-router-dash/index';

import CourseView from './views/CourseView';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import ForgotView from './views/ForgotView';
import ProfileView from './views/ProfileView';
import ChooseView from './views/ChooseView';
import StudentStore from './stores/StudentStore';
import StudentActions from './actions/StudentActions';

import NotificationStore from './stores/NotificationStore';
import Notifier from './components/Notifier';

class Layout extends Flux.View{
    
    constructor(){
        super();
        this.state = {
            loggedIn: StudentStore.getAutentication(),
            errors: null,
        }
        this.bindStore(StudentStore, 'session', this.sessionChange.bind(this));
        this.bindStore(NotificationStore, 'notifications', this.notificationsUpdated.bind(this));
    }
    
    componentWillMount(){
        this.sessionChange();
    }
    
    sessionChange(){
        const session = StudentStore.getAutentication();
        if(!session.autenticated && session.redirect) window.location = '/login';
        else this.setState({ loggedIn: true });
    }
    
    notificationsUpdated(){
        this.setState({
           notifications: NotificationStore.getAllNotifications()
        });
    }
    
    render() {
        return (
            <div className="layout">
                <BrowserRouter>
                    <div>
                        <Notifier notifications={this.state.notifications} />
                        <Switch>
                            <Route exact path='/login' component={LoginView} />
                            <Route exact path='/forgot' component={ForgotView} />
                            <PrivateRoute exact path='/' loggedIn={this.state.loggedIn} component={HomeView} />
                            <PrivateRoute exact path='/choose' loggedIn={this.state.loggedIn} component={ChooseView} />
                            <PrivateRoute exact path='/profile' loggedIn={this.state.loggedIn} component={ProfileView} />
                            <PrivateRoute path='/course/:course_slug' loggedIn={this.state.loggedIn} component={CourseView} />
                            <PrivateRoute render={() => (<p className="text-center mt-5">Not found</p>)} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
    
}
export default Layout;
//export default withShortcuts(Layout, keymap)