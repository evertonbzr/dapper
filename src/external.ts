import { makeSize } from "./helpers/tabUtils";

export abstract class DapperAny {
  protected _optional: boolean = false;
  protected _nullable: boolean = false;

  protected isOptional() {
    return this._optional;
  }

  protected isNullable() {
    return this._nullable;
  }

  protected prevIsOptional() {
    return this._optional ? "?" : "";
  }

  protected hasIsNullable() {
    return this._nullable ? " | null" : "";
  }

  optional = () => {
    this._optional = true;
    return this;
  };

  nullable = () => {
    this._nullable = true;
    return this;
  };

  parse: () => string;
}

export type DapperRawShape<T extends DapperAny = DapperAny> = {
  [k: string]: T;
};

export type DapperTypeParams<T extends DapperRawShape> = {
  name: string;
  fields: T;
};

export class DapperType<T extends DapperRawShape> extends DapperAny {
  name: string;
  fields: T;

  constructor(params: DapperTypeParams<T>) {
    super();
    this.name = params.name;
    this.fields = params.fields;
  }

  parse = () => "Parsed";

  static create = <T extends DapperRawShape>(params: DapperTypeParams<T>) => {
    return new DapperType(params);
  };
}

export class DapperObject extends DapperAny {
  private typedString = "";
  private _key: string;

  constructor(private shape: DapperRawShape, key?: string) {
    super();
    this._key = key || "random";
  }

  parse = (tabSize: number = 0) => {
    this.typedString =
      makeSize(tabSize) + (this._key + this.prevIsOptional()) + ": {\n";
    Object.keys(this.shape).forEach((key) => {
      const value = this.shape[key];
      this.typedString += `${makeSize(tabSize + 2)}${key}${value.parse()}\n`;
    });
    this.typedString += makeSize(tabSize) + "};";
    return this.typedString;
  };

  static create = (shape: DapperRawShape, key?: string) => {
    return new DapperObject(shape, key);
  };
}

export class DapperKind extends DapperAny {
  private typedString = "";
  private type: string;

  constructor(type: string) {
    super();
    this.type = type;
  }

  parse = () => {
    this.typedString =
      this.prevIsOptional() + ": " + this.type + this.hasIsNullable() + ";";
    return this.typedString;
  };

  static create = (type: string) => {
    return new DapperKind(type);
  };
}

export const type = DapperType.create;
export const object = DapperObject.create;
export const integer = () => DapperKind.create("number");
export const bigint = () => DapperKind.create("bigint");
export const string = () => DapperKind.create("string");
export const boolean = () => DapperKind.create("boolean");
