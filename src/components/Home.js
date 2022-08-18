import React from 'react';

function Home(props) {

    return (
        <div className="container text-center" style={{marginTop: '100px'}}>
            <div className="row">
                <div className="col text-center">
                    <i className="fa fa-dumbbell mt-30" style={{fontSize: '150px', color: 'purple'}}></i>
                    <h1 className="mt-30">Welcome to <br/>Your Local Gym <br/>YLG</h1>
                </div>
            </div>
        </div>
    );
}

export default Home;