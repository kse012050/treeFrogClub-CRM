import React, { memo } from 'react';

function SubTitle({ text }) {
    return (
        <h2>{ text }</h2>
    );
}

export default memo(SubTitle)