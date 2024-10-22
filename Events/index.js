import { EventEmitter } from "events";

const myEvent = new EventEmitter();

const makeCoffe = (name, time) => {
  console.log(`this ${name} is created in ${time} estimation`);
};

myEvent.on("making", makeCoffe);
myEvent.emit("making", "robusta", 1000);
