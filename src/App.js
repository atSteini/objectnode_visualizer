import React, {useState, useEffect} from "react";
import NodeContainer from './visualization/NodeContainer';
import NodeObject from './object/NodeObject';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavbarComponent from "./NavbarComponent";

const LOCAL_STORAGE_NODES_KEY = 'nodeVisualizer.nodes';

function App() {
    const [parentNodes, setParentNodes] = useState([]);

    async function setToTestData() {
        setParentNodes([new NodeObject(
            'PlantCare Sprint 01-28',
            [
                new NodeObject(
                    'Backend',
                    [
                        new NodeObject(
                            'User Management',
                            [
                                new NodeObject('Test User Management Issue 1', null, 1111),
                                new NodeObject('Test User Management Issue 2', null, 1112)
                            ],
                            111
                        ),
                        new NodeObject(
                            'Database',
                            [
                                new NodeObject('Test Database Issue 1', null, 1121),
                                new NodeObject('Test Database Issue 2', null, 1122)
                            ], 112
                        )
                    ],
                    11
                ),
                new NodeObject(
                    'Frontend',
                    [
                        new NodeObject(
                            'Bugs',
                            [
                                new NodeObject('Test Bugs Issue 1', null, 1211),
                                new NodeObject('Test Bugs Issue 2', null, 1212)
                            ],
                            121
                        ),
                        new NodeObject(
                            'Home',
                            [
                                new NodeObject('Test Home Issue 1', null, 1221),
                                new NodeObject('Test Home Issue 2', null, 1222)
                            ],
                            122
                        )
                    ],
                    12
                )
            ],
            1
        )]);
    }

    function printTree() {
        console.log("Tree: ", parentNodes);
    }

    /* Load Nodes, runs on load */
    useEffect(() => {
        const storedParent = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_NODES_KEY)
        );

        setParentNodes(storedParent);
    }, [])

    /* Save Nodes */
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_NODES_KEY, JSON.stringify(parentNodes));
    }, [parentNodes]);

    function clearNodes() {
        setParentNodes([]);
    }

    return (
        <div className="bg-white">
            <NavbarComponent/>
            <Container>
                <Row>
                    <Col>
                        <Button onClick={setToTestData}>Set TestData</Button>
                    </Col>
                    <Col>
                        <Button onClick={printTree}>Print Tree</Button>
                    </Col>
                    <Col>
                        <Button onClick={clearNodes}>Clear Web Storage</Button>
                    </Col>
                </Row>
                <Row>
                    <NodeContainer parentNodes={parentNodes}/>
                </Row>
            </Container>
        </div>
    );
}

export default App;
