import uuid from 'react-uuid';
import DisplaySettings from './DisplaySettings';

export default class NodeObject {
    constructor(name, dSettings, children, id) {
        this.id = id === null || id === undefined ? uuid() : id;
        this.name = name;

        this.children = children;
        this.addChild();        //Makes children an array, if children is null.

        this.displaySettings = new DisplaySettings();

        if (dSettings !== null && dSettings !== undefined) {
            this.displaySettings = dSettings
        }

        this.isNodeObject = true;
        this.parentId = null;
        this.childLevel = 0;
        this.titleBadgeText = null;

        this.setTitleStyleWithLevel();
    }

    static from(oldNode) {
        if (!oldNode.hasOwnProperty('isNodeObject')) {
            return null;
        }

        let newChildren = [];
        for (let child of oldNode.children) {
            newChildren.push(NodeObject.from(child));
        }

        let node = new NodeObject(oldNode.name, null, newChildren, oldNode.id);

        node.displaySettings = DisplaySettings.from(oldNode.displaySettings);
        node.parentId = oldNode.parentId;
        node.isNodeObject = oldNode.isNodeObject;
        node.titleBadgeText = oldNode.titleBadgeText;

        return node;
    }

    setChild(child) {
        if (child.id === null || child.id === undefined) {
            return false;
        }

        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].id === child.id) {
                this.children[i] = child;

                return true;
            }
        }

        return false;
    }

    getTitle() {
        let title = this.name;

        if (this.titleBadgeText === null || this.titleBadgeText === undefined) {
            return title;
        }

        return (
            <>
                {title} <span className={this.displaySettings.titleBadgeClassName}>{this.titleBadgeText}</span>
            </>
        )
    }

    getChildById(id) {
        if (this.id === id) {
            return this;
        }

        for (let child of this.children) {
            let byId = child.getChildById(id);

            if (byId !== null && byId !== undefined) {
                return byId;
            }
        }

        return null;
    }

    setAllShowEllipsis(show) {
        this.displaySettings.showEllipsis = show;

        for (let child of this.children) {
            child.setAllShowEllipsis(show);
        }
    }

    setTitleStyleWithLevel(node) {
        if (node === null || node === undefined) {
            node = this;
        }

        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        let headerLevel = clamp(node.childLevel + 3, 1, 6);

        node.displaySettings.titleStyle = 'h' + headerLevel;
    }

    setChildProperties(parent) {
        if (parent === null || parent === undefined) {
            parent = this;
        }

        console.log(parent.name, parent.children);

        for (let i = 0; i < parent.children.length; i++) {
            let newChild = NodeObject.from(parent.children[i]);

            newChild.parentId = parent.id;
            newChild.childLevel = parent.childLevel + 1;
            newChild.setTitleStyleWithLevel(newChild);

            newChild.setChildProperties(newChild);

            parent.children[i] = newChild;
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

    hasParent() {
        return this.parentId !== null && this.parentId !== undefined;
    }

    hasChildren() {
        return this.children.length > 0;
    }
}