import './Scale.scss';

import React from 'react'

function Scale() {
    return (
        <div className="scale">
            <div className="scale__bar"></div>
            <div className="scale__labels">
                <span>0</span>
                <span>1</span>
            </div>
            <div className="scale__descriptions">
                <span>No predicted probability</span>
                <span>Highest predicted probability</span>
            </div>
        </div>
    );
};
export default Scale
