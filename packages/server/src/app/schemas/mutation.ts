import { GraphQLObjectType } from 'graphql';
import { UserModel } from '../models/user';
import { encryptPwd } from '../utils/utils';
import { User, UserInput } from './user.schema';

export const GraphMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: User,
      description: 'Create new user',
      args: {
        info: {
          type: UserInput
        }
      },
      async resolve(source, { info }) {
        const { username, password } = info;

        const user = new UserModel({
          username,
          password: encryptPwd(password)
        });

        return await user.save();
      }
    }
  }
});
