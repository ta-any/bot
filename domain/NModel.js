class NModel {
    constructor({ id, model_id, name, price, description, config, token }) {
        this.id = id;
        this.model_id = model_id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.config = config;
        this.token = token;
    }

    /** @return number */
    calculatePrice(str, option){
        const stringWithoutSpaces = str.replace(/\s/g, '');
        const token = stringWithoutSpaces.length

        console.log("HERE calculate")
        return (token / option) * this.price
    }
}

module.exports = NModel;