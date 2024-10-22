import fs, { read } from "node:fs";

const readStream = fs.createReadStream("./todo.txt", {
  highWaterMark: 2,
});

readStream.on("readable", () => {
  try {
    process.stdout.write(`[${readStream.read()}]`);
  } catch (error) {
    console.log(error);
  }
});
