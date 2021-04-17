/* Data model combining data from ItemTemplate and ItemInstance */
/* This is a result of an inner join */
/* I think we only need this class. */

class Item {
  constructor (id, templateId, make, model, source, price, start, end, purchaseDate) {
    this.id = id;
    this.templateId = templateId;
    this.make = make;
    this.model = model;
    this.source = source;
    this.price = price;
    this.start = start;
    this.end = end;
    this.purchaseDate = purchaseDate;
  }
}

module.exports = Item;
