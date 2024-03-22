import { hash } from 'bcrypt';

import { CreateUser, GetUser } from '@components/user/user.interface';

import prisma from '@utils/prisma';

import { Conflict, NotFound } from '@exceptions/error';

/**
 * Service class for handling user related operations.
 */
class UserService {
  /**
   * Prisma database instance.
   * @type {PrismaClient}
   */
  public db = prisma;

  /**
   * Number of salt rounds for password hashing.
   * @type {number}
   * @private
   */
  private saltRounds = 10;

  /**
   * Creates a new user.
   * @param {CreateUser} createData - Data for creating the new user.
   * @returns {Promise<User>} The created user object.
   * @throws {Conflict} Thrown if the user with the provided email already exists.
   */
  public async createUser(createData: CreateUser) {
    const checkUserExists = await this.db.user.findUnique({
      where: {
        email: createData.email
      }
    });
    if (checkUserExists) {
      throw new Conflict('User already exists');
    }

    const hashedPassword = await hash(createData.password, this.saltRounds);
    const user = await this.db.user.create({
      data: {
        email: createData.email,
        password: hashedPassword,
        firstName: createData.firstName,
        lastName: createData.lastName,
      },
      select: {
        email: true,
        id: true,
      }
    });
    return user;
  }

  /**
   * Retrieves user information based on the provided email.
   * @param {GetUser} getUserData - Data for retrieving user information.
   * @returns {Promise<User>} The user object.
   * @throws {NotFound} Thrown if the user with the provided email is not found.
   */
  public async getUser(getUserData: GetUser) {
    const findUser = await this.db.user.findUnique({
      where: {
        email: getUserData.email
      }
    });

    if (!findUser) {
      throw new NotFound('User not found');
    }

    return findUser;
  }
}

export default UserService;
