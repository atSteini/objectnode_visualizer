import React from "react";
import NodeObject from "../object/NodeObject";

import '../additionalStyles.css';

/* Bootstrap */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* Font Awesome */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'

export default function Node({node, isLastChild}) {

    function render(nodeObj) {
        if (!nodeObj.hasChildren()) {
            return renderContainer(nodeObj);
        }

        return renderContainerWithChildren(nodeObj);
    }

    function renderContainer(nodeObj) {
        if (!nodeObj.hasParent()) {
            return (
                <Row>
                    {renderTitle(nodeObj)}
                </Row>
            )
        }

        return (
            renderTitle(nodeObj)
        );
    }

    function renderContainerWithChildren(nodeObj) {
        return (
            //The main container for nodes with children
            <Col id={nodeObj.id} className={nodeObj.displaySettings.getContainerClassName(!nodeObj.hasParent(), isLastChild)} style={nodeObj.displaySettings.getAdditionalContainerStyle()}>
                {renderTitle(nodeObj)}
                <Row className={nodeObj.displaySettings.getSubRowClassName(!nodeObj.hasParent(), isLastChild)}>
                    {renderChildren(nodeObj)}
                </Row>
            </Col>
        );
    }

    function renderTitle(nodeObj) {
        let inner = (
            <>
                <Col className={nodeObj.displaySettings.getTitleColClassName()}>
                    <span className={nodeObj.displaySettings.getTitleClassName()}>{nodeObj.getTitle()}</span>
                </Col>
                <Col xs={1} className={nodeObj.displaySettings.getEllipsisClassName() + ' ' + nodeObj.displaySettings.getTitleColClassName()}>
                    <a className={nodeObj.displaySettings.fgStyle} href={"#top"}>
                        <FontAwesomeIcon icon={faEllipsisV}/>
                    </a>
                </Col>
            </>
        );

        if (!nodeObj.hasChildren()) {
            return (
                //The main container for nodes without children
                <Col id={nodeObj.id} className={nodeObj.displaySettings.getContainerClassName(!nodeObj.hasParent(), isLastChild)} style={nodeObj.displaySettings.getAdditionalContainerStyle()}>
                    <Row>
                        {inner}
                    </Row>
                </Col>
            );
        }

        return (
            <Row className={nodeObj.displaySettings.getTitleRowClassName()}>
                {inner}
            </Row>
        );
    }

    function renderChildren(nodeObj) {
        return nodeObj.children.map(function(node, index) {
            let isLastChild = index === nodeObj.children.length - 1;

            return <Node key={node.id} node={node} isLastChild={isLastChild}/>;
        });
    }

    let converted = NodeObject.from(node);
    return converted == null ? null : render(converted);
}