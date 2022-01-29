import React from 'react';
import Node from './Node.js';

export default function NodeContainer({parentNodes}) {
    return parentNodes.map(node => {
        return <Node key={node.id} node={node}/>;
    });
}