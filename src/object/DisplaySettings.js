export default class DisplaySettings {
    static primary = '#007BFF';
    static secondary = '#6C757D';
    static success = '#28A745';
    static warning = '#FFC107';
    static danger = '#DC3545';
    static info = '#17A2B8';
    static light = '#F8F9FA';
    static dark = '#343A40';
    static white = '#FFFFFF';

    static availableColors = [DisplaySettings.primary, DisplaySettings.secondary,
        DisplaySettings.success, DisplaySettings.warning, DisplaySettings.danger, DisplaySettings.info,
        DisplaySettings.light, DisplaySettings.dark, DisplaySettings.white];

    constructor(bgStyle, fgStyle, shape) {
        this.shape = shape;

        if (shape === null || shape === undefined) {
            this.shape = 'rectangle'
        }

        this.bgStyle = 'bg-white';
        this.fgStyle = 'text-black';

        if (bgStyle !== null && bgStyle !== undefined){
            this.bgStyle = bgStyle;
        }

        if (fgStyle !== null && fgStyle !== undefined){
            this.fgStyle = fgStyle;
        }

        this.titleStyle = 'h4';

        this.ellipsisStyle = "pe-3 text-end pt-auto";

        this.titleRowStyle = "d-flex";
        this.subRowStyle = null;
        this.titleColStyle = "my-2";

        this.spacingSize = 3;

        this.showEllipsis = true;

        this.borderStyle = this.getBorderByShape(shape);

        this.additionalContainerStyle = null;

        this.titleBadgeClassName = "badge bg-secondary";
    }

    getBorderByShape(shape) {
        let border;

        switch (shape) {
            case 'rectangle':
            default:
                border = 'border border-dark rounded';
        }

        return border;
    }

    static from(oldSettings) {
        let newSettings = new DisplaySettings(oldSettings.shape);

        newSettings.bgStyle = oldSettings.bgStyle;
        newSettings.fgStyle = oldSettings.fgStyle;
        newSettings.titleStyle = oldSettings.titleStyle;
        newSettings.borderStyle = oldSettings.borderStyle;
        newSettings.ellipsisStyle = oldSettings.ellipsisStyle;
        newSettings.titleRowStyle = oldSettings.titleRowStyle;
        newSettings.showEllipsis = oldSettings.showEllipsis;
        newSettings.titleColStyle = oldSettings.titleColStyle;
        newSettings.subRowStyle = oldSettings.subRowStyle;
        newSettings.additionalContainerStyle = oldSettings.additionalContainerStyle;
        newSettings.titleBadgeClassName =  oldSettings.titleBadgeClassName;

        return newSettings;
    }

    getSpacedMargin() {
        return `m-${this.spacingSize}`;
    }

    getSpacedPadding() {
        return `p-${this.spacingSize}`;
    }

    getLastAddition() {
        return 'ml-0 mt-0';
    }

    getNotLastAddition() {
        return 'me-0 mb-0';
    }

    getFirstAddition() {
        return this.getSpacedMargin();
    }

    getAdditionalContainerStyle(returnString) {
        if (this.additionalContainerStyle !== null) {
            return this.additionalContainerStyle;
        }

        if (returnString) {
            return '';
        }

        return {};
    }

    getSubRowClassName(isFirstParent, isLastChild) {
        if (this.subRowStyle !== null) {
            return `${this.subRowStyle}`;
        }

        return ``;
    }

    getContainerClassName(isFirstParent, isLastChild) {
        return `${this.bgStyle} ${this.fgStyle} ${this.borderStyle} 
        ${isFirstParent ? 'my-' + this.spacingSize : this.getSpacedMargin()} 
        ${this.getAdditionalContainerStyle(true)}`
    }

    getTitleClassName() {
        return `${this.titleStyle}`;
    }

    getEllipsisClassName() {
        return `${this.ellipsisStyle}${this.showEllipsis ? '' : ' d-none'}`;
    }

    getTitleRowClassName() {
        return `${this.titleRowStyle}`;
    }

    getTitleColClassName() {
        return `${this.titleColStyle}`;
    }
}