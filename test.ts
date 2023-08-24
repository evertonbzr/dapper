import d from "./src/index";

const typeMounted = d.type({
  name: "User",
  fields: {
    id: d.integer(),
    people: d.object({
      age: d.integer(),
    })
  }
});
