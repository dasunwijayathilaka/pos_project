export default class OrderModel{
    constructor(orderId,date,customerID,Total) {
        this._orderId = orderId;
        this._date = date;
        this._customerID = customerID;
        this._Total = Total;
    }


    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get customerID() {
        return this._customerID;
    }

    set customerID(value) {
        this._customerID = value;
    }

    get Total() {
        return this._Total;
    }

    set Total(value) {
        this._Total = value;
    }
}