import React from 'react';
import uuid from 'react-uuid';
import Node from '../visualization/Node';
import DisplaySettings from './DisplaySettings';

/* Bootstrap */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* Font Awesome */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'

export default class NodeObject {
    constructor(name, children, id) {
        this.id = id === null || id === undefined ? uuid() : id;
        this.name = name;

        this.children = children;
        this.addChild();        //Makes children an array, if children is null.

        this.displaySettings = new DisplaySettings();
        this.isNodeObject = true;
        this.parentId = null;
        this.childLevel = 0;

        console.log("I am " + this.name + " with id " + this.id);

        this.setChildProperties();

        this.setTitleStyleWithLevel();
    }

    static from(oldNode) {
        if (!oldNode.hasOwnProperty('isNodeObject')) {
            return null;
        }

        let node = new NodeObject(oldNode.name, oldNode.children, oldNode.id);

        node.displaySettings = DisplaySettings.from(oldNode.displaySettings);
        node.parentId = oldNode.parentId;
        node.isNodeObject = oldNode.isNodeObject;

        return node;
    }

    setTitleStyleWithLevel() {
        this.displaySettings.titleStyle = 'h' + (this.childLevel + 4);
    }

    setChildProperties() {
        //Why is javascript so stupid with references ??? How can I do this simpler???
        for (let i = 0; i < this.children.length; i++) {
            let newChild = NodeObject.from(this.children[i]);

            newChild.parentId = this.id;
            newChild.childLevel = this.childLevel + 1;
            newChild.setTitleStyleWithLevel();

            newChild.setChildProperties();

            this.children[i] = newChild;
        }
    }

    addChild(node) {
        if (this.children === null || this.children === undefined) {
            this.children = [];
        }

        if (node === null || node === undefined) {
            return;
        }

        this.children.push(node);
    }

    render() {
        if (!this.hasChildren()) {
            return this.renderContainer();
        }

        return this.renderContainerWithChildren();
    }

    renderContainer() {
        if (!this.hasParent()) {
            return (
                <Row id={"thisRowHasNoParent" + this.id}>
                    {this.renderTitle()}
                </Row>
            )
        }

        return (
            this.renderTitle()
        );
    }

    renderContainerWithChildren() {
        return (
            <Col className={this.displaySettings.getContainerClassName()}>
                {this.renderTitle()}
                <Row id={"RowUnderTitleWithChildren" + this.id}>
                    {this.renderChildren()}
                </Row>
            </Col>
        );
    }

    renderTitle() {
        let inner = (
            <>
                <Col className={this.displaySettings.getTitleColClassName()}>
                    <span className={this.displaySettings.getTitleClassName()}>{this.name}</span>
                </Col>
                <Col xs={1} className={this.displaySettings.getEllipsisClassName() + ' ' + this.displaySettings.getTitleColClassName()}>
                    <a href={"#top"}>
                        <FontAwesomeIcon icon={faEllipsisV}/>
                    </a>
                </Col>
            </>
        );

        if (!this.hasChildren()) {
            return (
                <Col className={this.displaySettings.getContainerClassName()}>
                    <Row id={"rowNoChildren" + this.id}>
                        {inner}
                    </Row>
                </Col>
            );
        }

        return (
            <Row className={this.displaySettings.getTitleRowClassName()} id={"rowWithChildren" + this.id}>
                {inner}
            </Row>
        );
    }

    renderChildren() {
        return this.children.map(node => {
            return <Node key={node.id} node={node}/>;
        });
    }

    hasParent() {
        return this.parentId !== null && this.parentId !== undefined;
    }

    hasChildren() {
        return this.children.length > 0;
    }
}