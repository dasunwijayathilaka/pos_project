export default class CustomerModel{
    constructor(id,firstName,lastName,email,mobile,address) {

        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._mobile = mobile;
        this._address = address;
    }
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get mobile() {
        return this._mobile;
    }

    set mobile(value) {
        this._mobile = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

}