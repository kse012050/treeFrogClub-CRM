import React, { useState } from 'react';

export default function DropBox({children, title, arrow, open}) {
    const [dropBox, setDropBox] = useState(open);

    return (
        <div className='dropBox'>
            <button onClick={()=>setDropBox((value)=>!value)} className={arrow ? (dropBox ? 'arrow active': 'arrow') : ''}>{title}</button>
            {dropBox && children}
        </div>
    );
}

