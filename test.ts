import { d } from "./dist/index";

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

// Expected output:

// type v1CreateUser = {
//   name?: string;
//   age: number;
//   email: string;
//   password: string;
//   address?: {
//     street: string;
//   };
// };
