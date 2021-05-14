const {NotFound} =require('../common/erros');

const findEntity = (entities, id) => {
  const entity = entities.find((u) => u.id === id);

  if(entity) {
    return entity;
  }

  throw new NotFound();
};

module.exports = {findEntity};
