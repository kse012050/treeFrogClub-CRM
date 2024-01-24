import React from 'react';

export default function BoardChkDelete({ setPopup, deleteList}) {
    return (
        <button className='btn-gray-black' 
            onClick={()=>setPopup({
                'type': 'finFunc',
                'title': '선택 삭제',
                'description': `선택 항목을 삭제하시겠습니까?`
            })}
            disabled={!deleteList.length}>선택 삭제</button>
    );
}

