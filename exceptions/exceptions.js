exports.NoTypeData = class NoTypeData extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}