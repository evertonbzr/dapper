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
        name: d.string().optional().nullable(),
        age: d.integer().optional(),
        done: d.boolean()
      },
      "key"
    )
    .optional()
    .parse()
);

type test = {
  key: {
    name?: string | null;
    age: bigint;
    done: boolean;
  };
};
