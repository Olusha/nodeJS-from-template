const {v4} = require('uuid');

class Column {
  constructor({
                title,
                order,
      id = v4(),
              } = {}) {
    this.id =id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
