//import React from 'react';
import NodeObject from "../object/NodeObject";

export default function Node({node}) {
    let converted = NodeObject.from(node);
    return converted == null ? null : converted.render();
}