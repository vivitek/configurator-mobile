import React from 'react';

function Settings({ title, className }) {

    return (
        <svg className={className} height="64" width="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <title>{title}</title>
            <g strokeLinecap="square" strokeWidth="2">
                <circle cx="32" cy="32" fill="none" r="9" />
                <path d="M62,32h0a4.445,4.445,0,0,0-4.077-4.43l-4.65-.389a21.681,21.681,0,0,0-2.826-6.806L53.47,16.8a4.445,4.445,0,0,0-.249-6.015h0a4.446,4.446,0,0,0-6.015-.249l-3.573,3.023a21.643,21.643,0,0,0-6.814-2.834l-.389-4.65A4.445,4.445,0,0,0,32,2h0a4.445,4.445,0,0,0-4.43,4.077l-.389,4.65a21.681,21.681,0,0,0-6.806,2.826L16.8,10.536a4.446,4.446,0,0,0-6.015.25h0a4.446,4.446,0,0,0-.249,6.015l3.023,3.573a21.652,21.652,0,0,0-2.834,6.807L6.07,27.57A4.445,4.445,0,0,0,2,32H2a4.445,4.445,0,0,0,4.077,4.43l4.657.389a21.657,21.657,0,0,0,2.826,6.806L10.536,47.2a4.446,4.446,0,0,0,.25,6.015h0a4.446,4.446,0,0,0,6.015.249l3.573-3.023a21.652,21.652,0,0,0,6.807,2.834l.389,4.657A4.445,4.445,0,0,0,32,62h0a4.445,4.445,0,0,0,4.43-4.077l.389-4.657a21.657,21.657,0,0,0,6.806-2.826L47.2,53.464a4.446,4.446,0,0,0,6.015-.25h0a4.446,4.446,0,0,0,.249-6.015l-3.023-3.573a21.652,21.652,0,0,0,2.834-6.807l4.657-.389A4.445,4.445,0,0,0,62,32Z" fill="none" />
            </g>
        </svg>
    );
};

export default Settings;