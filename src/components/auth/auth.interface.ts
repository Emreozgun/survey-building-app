import { Static } from '@fastify/type-provider-typebox';
import { LoginUserBody } from '@components/auth/auth.schema';

/**
 * Represents the structure of a login user request.
 * @typedef {Object} LoginUser
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 */

/**
 * Extracts the structure of a login user request from the LoginUserBody schema.
 * @type {LoginUser}
 */
export type LoginUser = Static<typeof LoginUserBody>;
