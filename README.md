# Dapper - Typed Schema Builder for TypeScript

Dapper is a TypeScript library that enables you to define and generate TypeScript type annotations in string form using a fluent and intuitive API. It provides a simple and expressive way to build complex type structures that mirror your data structures.

## Installation

To get started with Dapper, install it using npm or yarn:

```bash
npm install dapper-typed
# or
yarn add dapper-typed
```

## Usage

Here's an example of how you can use Dapper to create TypeScript type annotations in string format:

```typescript
import { d } from "dapper-typed";

const schemaTypeUser = d.type({
  name: "v1CreateUser",
  fields: {
    name: d.ostring(),
    age: d.integer(),
    email: d.string(),
    password: d.string(),
    address: d.object({
      street: d.string(),
    }).optional(),
  },
}).parse();

console.log(schemaTypeUser);

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
```

## Features

- **Fluent API**: Build type annotations using a fluent and easy-to-understand API.
- **Nested Types**: Define complex nested type structures with ease.
- **Optional Fields**: Mark fields as optional with the `.optional()` modifier.
- **Built-in Types**: Supported built-in types include `string`, `number`, `boolean`, and more.
- **Extensible**: Easily extend Dapper with custom type builders if needed.
- **TypeScript Integration**: The generated type annotations can be used directly in TypeScript code.

## Getting Help

If you encounter any issues, have questions, or want to contribute to the project, please check out the [GitHub repository](https://github.com/yourusername/dapper) for Dapper.

## License

Dapper is open-source software licensed under the MIT License. See the [LICENSE](https://github.com/yourusername/dapper/blob/main/LICENSE) file for more details.

---

Dapper - Created with ❤️ by Your Name.