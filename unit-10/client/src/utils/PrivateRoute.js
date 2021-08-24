// Dependencies
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// Private Route
// destructure and rename component prop to Component, collect other props with ...rest
export default ({ component: Component, ...rest }) => {
    return (
        // subscribe PrivateRoute to global context with Consumer component
        <Consumer>
            {context => (
                // render Route component inside PrivateRoute component
                <Route
                    {...rest}
                    // render either passed Component from PrivateRoute or Redirect determined by logged-in status
                    render={props => context.authenticatedUser ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }} />
                    )}
                />
            )}
        </Consumer>
    );
};