import { GraphQLObjectType } from 'graphql';
import { User, UserInput } from './user.schema';
import { UserModel } from '../models/user';
import { encryptPwd } from '../utils/utils';


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
