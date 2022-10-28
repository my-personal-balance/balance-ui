export const paramsToSnakeCase = (params) => {
  if (params) {

    if (params instanceof Array) {
      return params.map(p => paramsToSnakeCase(p));
    } else {

      const keyValues = Object.keys(params).map(key => {
        const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        
        let value = params[key];
        if (value && value instanceof Object && !value._isAMomentObject) {
          value = paramsToSnakeCase(params[key]);
        }
  
        return { [newKey]: value };
      });
  
      return Object.assign({}, ...keyValues);
    }
    
  } else {
    return null;
  }
}