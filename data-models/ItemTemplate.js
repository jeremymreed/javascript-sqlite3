/* Models details common to all instances of an Item */

class ItemTemplate {
  constructor (id, make, model) {
    this.id = id;
    this.make = make;
    this.model = model;
  }
}

module.exports = ItemTemplate;
