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

    constructor(shape) {
        this.shape = shape;

        if (shape === null || shape === undefined) {
            this.shape = 'rectangle'
        }

        this.bgStyle = 'bg-white';
        this.fgStyle = 'text-black';
        this.titleStyle = 'h4';

        this.ellipsisStyle = "pe-3 text-end pt-auto";

        this.titleRowStyle = "d-flex";
        this.titleColStyle = "my-2";

        this.showEllipsis = true;

        this.borderStyle = this.getBorderByShape(shape);
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

        return newSettings;
    }

    getContainerClassName() {
        return `${this.bgStyle} ${this.fgStyle} ${this.borderStyle}`
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

    getBorderByShape(shape) {
        let border;

        switch (shape) {
            case 'rectangle':
            default:
                border = 'border border-dark rounded m-3';
        }

        return border;
    }
}