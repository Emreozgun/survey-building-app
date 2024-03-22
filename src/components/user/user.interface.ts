import { Static } from '@fastify/type-provider-typebox';

import { CreateUserBody } from '@components/user/user.schema';

/**
 * Represents the structure of a user creation request.
 * @typedef {Object} CreateUser
 * @property {string} email - The email address of the user to be created.
 * @property {string} password - The password of the user to be created.
 * @property {string} role - The role of the user to be created.
 */

/**
 * Extracts the structure of a user creation request from the CreateUserBody schema.
 * @type {CreateUser}
 */
export type CreateUser = Static<typeof CreateUserBody>;

/**
 * Represents the structure of a user retrieval request.
 * @interface
 */
export interface GetUser {
  email: string;
}
