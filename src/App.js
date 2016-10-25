import React, { Component } from 'react';
import Draw from './components/Draw';

class App extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Draw
                    zoom={8}
                    center={{
                        lat: 43.220578,
                        lng: 27.9568336
                    }}
                />
            </div>
        );
    }
}

export default App;
