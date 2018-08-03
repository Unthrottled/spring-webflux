export class TextPayload {
    private _value: String;

    get value(): String {
        return this._value;
    }


    constructor(value: String) {
        this._value = value;
    }

    set value(value: String) {
        this._value = value;
    }
}