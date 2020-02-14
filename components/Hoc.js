import React, { useEffect } from 'react'

const Hoc = (props) => {
    useEffect(()=>{
        console.log('hoc rerender');
    });

    return (props.children);
};


export default React.memo(Hoc);

