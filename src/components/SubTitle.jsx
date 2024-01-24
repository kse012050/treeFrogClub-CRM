import React, { memo } from 'react';
import { Link } from 'react-router-dom';

function SubTitle({ text, link }) {
    return (
        <h2>
            { text }
            { link && <Link to={link} className='btn-point'>추가</Link> }
        </h2>
    );
}

export default memo(SubTitle)