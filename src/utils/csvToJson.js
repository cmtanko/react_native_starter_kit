const csvToJson = (file) => {
  let lines = file.split('\n');

  let result = [];

  let headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      if (headers[j].trim() && currentline[0]) {
        obj[headers[j].trim()] = currentline[j];
      }
    }
    result.push(obj);
  }

  return result;
};

export default csvToJson;
