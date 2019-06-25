import React from 'react';
import {Link, Match} from '@reach/router';

export function Navigation({children, location}) {
    return (
        <>
            <nav style={{
                height: 50,
                display: 'flex',
                alignItems: 'center',
                background: '#b8c5ca',
                padding: '0 16px',
            }}
            />
            {children}
        </>
    )
}
