import React from 'react';
import Node from './Node.js';

export default function NodeContainer({nodes}) {
    return (
      nodes.map(node => {
          return <Node key={node} node={node} />
      })
    );
}