import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserModel } from '../models/user';
import { User } from './user.schema';

export const GraphQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: User,
      description: 'Get user information by id',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      async resolve(source, { id }) {
        return await UserModel.findById(id).exec();
      }
    }
  }
});
