/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Comment: { // root type
    content: string; // String!
    date: any; // DateTime!
    id: number; // Int!
  }
  Mutation: {};
  Note: { // root type
    content: string; // String!
    date: any; // DateTime!
    id: number; // Int!
    title: string; // String!
  }
  Query: {};
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  Comment: { // field return type
    content: string; // String!
    date: any; // DateTime!
    id: number; // Int!
  }
  Mutation: { // field return type
    addComment: NexusGenRootTypes['Comment']; // Comment!
    addNote: NexusGenRootTypes['Note']; // Note!
  }
  Note: { // field return type
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    content: string; // String!
    date: any; // DateTime!
    id: number; // Int!
    title: string; // String!
  }
  Query: { // field return type
    getComments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    getNote: NexusGenRootTypes['Note']; // Note!
    getNotes: NexusGenRootTypes['Note'][]; // [Note!]!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addComment: { // args
      content?: string | null; // String
      note_id?: number | null; // Int
    }
    addNote: { // args
      content?: string | null; // String
      title?: string | null; // String
    }
  }
  Query: {
    getComments: { // args
      note_id?: number | null; // Int
    }
    getNote: { // args
      id?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Comment" | "Mutation" | "Note" | "Query";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}