import React from "react";

class Title extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-dark p-4 fixed-top">
                    <h1 className="text-info">Weather-App</h1>
                </nav> 
            </div>
        );
    }
}

export default Title;