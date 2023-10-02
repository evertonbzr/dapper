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
    roles: d.inlineText("(V1DaleDele | V1DaleDele2)[]").optional(),
    password: d.string(),
    address: d
      .object({
        street: d.string().nullable(),
      })
      .optional(),
  },
});

const namespace = d
  .namespace({
    name: "V1GetUser",
    exported: true,
    types: [schemaTypeUser],
  })
  .parse();

console.log(namespace);

export namespace V1GetUser {
  export interface Body {
    name?: string;
    age: number;
    email: string;
    roles: {
      name: string;
    }[];
    password: string;
    address?: {
      street: string;
    };
  }
}
type t = V1GetUser.Body;
