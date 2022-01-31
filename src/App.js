import React, {useState, useEffect} from "react";
import NodeContainer from './visualization/NodeContainer';
import NavbarComponent from './NavbarComponent';
import NodeObject from './object/NodeObject';
import DisplaySettings from './object/DisplaySettings';

/* Bootstrap */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const LOCAL_STORAGE_NODES_KEY = 'nodeVisualizer.nodes';

function App() {
    const [parentNodes, setParentNodes] = useState([]);

    function setToTestData() {
        let newNodes = [new NodeObject(
            'PlantCare Sprint 7',
            new DisplaySettings("bg-white"),
            [
                new NodeObject(
                    'Backend',
                    new DisplaySettings("bg-lightPurple", "text-dark"),
                    [
                        new NodeObject(
                            'User Management',
                            new DisplaySettings("bg-lightOrange", "text-dark"),
                            [
                                new NodeObject('User Login via Angular')
                            ]
                        ),
                        new NodeObject(
                            'Datenauswertung',
                            new DisplaySettings("bg-lightOrange", "text-dark"),
                            [
                                new NodeObject('Automatisierung API-Download')
                            ]
                        )
                    ]
                ),
                new NodeObject(
                    'Frontend',
                    new DisplaySettings("bg-lightPurple", "text-dark"),
                    [
                        new NodeObject(
                            'Bugs',
                            new DisplaySettings("bg-lightOrange", "text-dark"),
                            [
                                new NodeObject('RouterLink auf Details PopUp'),
                                new NodeObject('SideBar Routing')
                            ],
                            121
                        ),
                        new NodeObject(
                            'Wichtiges über Pflanzen',
                            new DisplaySettings("bg-lightOrange", "text-dark"),
                            [
                                new NodeObject('Home Ansicht')
                            ]
                        ),
                        new NodeObject(
                            'Reporte drucken',
                            new DisplaySettings("bg-lightOrange", "text-dark"),
                            [
                                new NodeObject('Druckeransicht Recherche'),
                                new NodeObject('Druckeransicht Implementierung')
                            ]
                        ),
                        new NodeObject(
                            'Sensoren Seite',
                            new DisplaySettings("bg-lightOrange", "text-dark"),
                            [
                                new NodeObject('Pflanzen Details')
                            ]
                        )
                    ]
                )
            ]
        )];

        newNodes.forEach(parent => parent.setChildProperties());

        setParentNodes(newNodes);
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

    function setChild(child) {
        if (child.id === null || child.id === undefined) {
            return;
        }

        let newNodes = [];

        for (let parent of parentNodes) {
            parent = NodeObject.from(parent);

            if (parent.id === child.id) {
                newNodes.push(child);

                continue;
            }

            parent.setChild(child);

            newNodes.push(parent);
        }

        setParentNodes(newNodes);
    }

    function getChildById(id) {
        for (let parent of parentNodes) {
            parent = NodeObject.from(parent);

            if (parent.id === id) {
                return parent;
            }

            let byId = parent.getChildById(id);

            if (byId !== null && byId !== undefined) {
                return byId;
            }
        }

        return null;
    }

    function toggleShotMode() {
        let screenShotMode = parentNodes[0].displaySettings.showEllipsis;

        let newNodes = [];

        for (let parent of parentNodes) {
            let newParent = NodeObject.from(parent);
            newParent.setAllShowEllipsis(!screenShotMode);
            newNodes.push(newParent);
        }

        setParentNodes(newNodes);
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
                    <Col>
                        <Button onClick={toggleShotMode}>Toggle Screenshot-Mode</Button>
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
