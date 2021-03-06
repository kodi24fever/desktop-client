import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../components/react-components/src/index';
class DayContent extends React.Component{
    
    constructor(){
        super();
        this.state = {
        };
    }
    
    onStart(){
        this.props.onStart();
    }
    
    render(){
        
        if(this.props.blocked) return(
            <div className="text-center">
                <div className="panel-toolbar">
                    <Button icon="fas fa-play" label="Start Day"
                        onClick={this.onStart.bind(this)}/>
                    <p className="toolbar-hint">When starting this day, all it's activities will be added into your todo list</p>
                </div>
            </div>
        );
        
        return(<div className="text-center"><span className="todos">{this.props.children}</span></div>)
    }
}
DayContent.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onStart: PropTypes.func.isRequired,
  blocked: PropTypes.bool.isRequired
}
DayContent.defaultProps = {
  blocked: true
};
export default DayContent;