import Singleton from "./Singelton.js";

const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log("A is equal to b", a === b);
