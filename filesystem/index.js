import fs from "node:fs/promises";

const result = fs.readFile("./todo.txt", "utf8");
console.log(result);
