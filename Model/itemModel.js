export default class ItemModel{
    constructor(Itemid,itemName,itemDescription,qty,price) {
        this._Itemid = Itemid;
        this._itemName = itemName;
        this._qty = qty;
        this._itemDescription = itemDescription;
        this._price = price;
        this._Itemid = Itemid;
    }


    get Itemid() {
        return this._Itemid;
    }

    set Itemid(value) {
        this._Itemid = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get itemDescription() {
        return this._itemDescription;
    }

    set itemDescription(value) {
        this._itemDescription = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}