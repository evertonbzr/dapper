import d from "./src/index";

const typeMounted = d.type({
  name: "User",
  fields: {
    id: d.integer(),
    people: d.object({
      age: d.string().optional(),
    }),
  },
});

console.log(
  d
    .object(
      {
        name: d.string("name"),
      },
      "key"
    )
    .parse()
);

type test = {
  key: {
    name: string;age:number;
  };
};
