import { d } from "./src/index";

const schemaTypeUser = d.type({
  name: "v1CreateUser",
  fields: {
    name: d.ostring(),
    age: d.integer(),
    email: d.string(),
    password: d.string(),
    address: d.object({
      street: d.string(),
    }).optional()
  },
}).parse();


console.log(schemaTypeUser)
