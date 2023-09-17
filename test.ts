import { d } from "./src/index";

namespace da {
  export type v1CreateUser = {
    name?: string;
  };
}

const schemaTypeUser = d.type({
  name: "Body",
  mode: "interface",
  exported: true,
  fields: {
    name: d.ostring(),
    age: d.integer(),
    email: d.string(),
    password: d.string(),
    address: d
      .object({
        street: d.string(),
      })
      .optional(),
  },
});

const namespace = d
  .namespace({
    name: "V1GetUser",
    exported: true,
    types: [schemaTypeUser, schemaTypeUser],
  })
  .parse();

console.log(namespace);

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

export namespace V1GetUser {
  export interface Body {
    name?: string;
    age: number;
    email: string;
    password: string;
    address?: {
      street: string;
    };
  }
  export interface Body {
    name?: string;
    age: number;
    email: string;
    password: string;
    address?: {
      street: string;
    };
  }
}

type t = V1GetUser.Body;
