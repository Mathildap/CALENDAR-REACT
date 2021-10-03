import React from 'react';
import ReactLoading from 'react-loading';

function Loading() {
    return (
        <ReactLoading
            type='spin'
            color='rgb(241, 136, 139)'
            height={'15%'}
            width={'15%'}
            className='loading'
        />
    );
}

export default Loading;
