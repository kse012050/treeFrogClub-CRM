// css용 index
export function styleIdx(){
    console.log(1);
    document.querySelectorAll('[data-styleidx]').forEach((parents)=>{
        let children = []
        parents.getAttribute('data-styleIdx') !== 'true' ?
            parents.childNodes.forEach((element)=>{
                element.tagName.toLowerCase() === parents.getAttribute('data-styleIdx') && children.push(element)
            }) : 
            (children = [...parents.childNodes]);
        parents.style.setProperty('--styleTotal', children.length);
        children.forEach((element, idx)=>{
            element.style.setProperty('--styleIdx', idx);
        })
    })
}

// css용 index
