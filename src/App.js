import React, {useState} from 'react';
import NodeContainer from "./visualization/NodeContainer";

function App() {
  const [nodes, updateNodes] = useState([]);

  return (
      <NodeContainer nodes={nodes}/>
  );
}

export default App;
