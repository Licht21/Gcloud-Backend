import fs from "node:fs";

const result = fs.createWriteStream("result.txt", {
  highWaterMark: 5,
});

result.write(`lorem ipsum woi woi woi woi woi woi`);
