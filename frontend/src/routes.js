import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import New from './pages/New';

function Routes() {
    //exact define que a leitura será absoluta, não entra em caminhos parecidos
    return (
        <Switch>
            
            <Route path="/"   exact  component={Feed} />
            <Route path="/new"  component={New} />
        </Switch>
    )
}

export default Routes;