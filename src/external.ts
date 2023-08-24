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

export class DapperObject extends DapperAny {
  private typedString = "";

  constructor(private shape: DapperRawShape) {
    super();
  }

  parse = (tabSize: number = 0) => {
    this.typedString = this.prevIsOptional() + ": {\n";
    Object.keys(this.shape).forEach((key) => {
      const value = this.shape[key];
      let valueParsed;

      if (value instanceof DapperObject) {
        valueParsed = value.parse(tabSize + 2);
      } else {
        valueParsed = value.parse();
      }

      this.typedString += `${makeSize(tabSize + 2)}${key}${valueParsed}\n`;
    });
    this.typedString += makeSize(tabSize) + "};";
    return this.typedString;
  };

  static create = (shape: DapperRawShape) => {
    return new DapperObject(shape);
  };
}

export type DapperRawShape<T extends DapperAny = DapperAny> = {
  [k: string]: T;
};

export type DapperTypeParams<T extends DapperRawShape> = {
  name: string;
  tabSize?: number;
  mode?: "type" | "interface";
  fields: T;
};

export class DapperType<T extends DapperRawShape> extends DapperAny {
  private typedString = "";

  private name: string;
  private fields: T;
  private _tabSize: number = 2;

  constructor(params: DapperTypeParams<T>) {
    super();
    this.name = params.name;
    this.fields = params.fields;
    this._tabSize = params.tabSize || 2;
  }

  parse = (tabSize: number = 0) => {
    this.typedString = makeSize(tabSize) + "type " + this.name + " = {\n";
    Object.keys(this.fields).forEach((key) => {
      const value = this.fields[key];
      let valueParsed;

      if (value instanceof DapperObject) {
        valueParsed = value.parse(tabSize + this._tabSize);
      } else {
        valueParsed = value.parse();
      }

      this.typedString += `${makeSize(
        tabSize + this._tabSize
      )}${key}${valueParsed}\n`;
    });
    this.typedString += makeSize(tabSize) + "};" + this.hasIsNullable() + "\n";
    return this.typedString;
  };

  static create = <T extends DapperRawShape>(params: DapperTypeParams<T>) => {
    return new DapperType(params);
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
export const ostring = () => DapperKind.create("string").optional();
export const boolean = () => DapperKind.create("boolean");
