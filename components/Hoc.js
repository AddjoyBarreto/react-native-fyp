import React from 'react'

const Hoc = (props) => {
    return (props.children);
};


export default React.memo(Hoc);

