import d from "./src/index";

const typeMounted = d.type({
  name: "v1CreateUser",
  fields: {
    id: d.integer(),
    people: d.object({
      age: d.string().optional().nullable(),
      address: d.object({
        street: d.string(),
        number: d.integer(),
        city: d.string().optional(),
      }),
    }),
  },
});

console.log(typeMounted.parse());

type v1CreateUser = {
  id: number;
  people: {
    age?: string;
    address: {
      street: string;
      number: number;
      city?: string;
    };
  };
};