/* Models details only for a single instance of an Item */

class ItemInstance {
  constructor (id, templateId, source, price, start, end, purchaseDate) {
    this.id = id;
    this.templateId = templateId;
    this.source = source;
    this.price = price;
    this.start = start;
    this.end = end;
    this.purchaseDate = purchaseDate;
  }
}

module.exports = ItemInstance;
