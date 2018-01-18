import { IRouterContext } from 'koa-router';
import { sendres } from '../utils/response';
import { graphql, GraphQLSchema } from 'graphql';
import { GraphQuery } from '../schemas/query';
import { ECODE } from '../confs/error-code';
import { GraphMutation } from '../schemas/mutation';


const schema = new GraphQLSchema({
  query: GraphQuery,
  mutation: GraphMutation
});

/**
 * GraphQl
 * @param {IRouterContext} ctx
 * @returns {Promise<IResponse>}
 */
export async function graphQL(ctx: IRouterContext) {
  const { request } = ctx;
  const body = request.body;
  const { query, variables } = body;


  const response: any = await graphql(schema, query, null, null, variables);

  if (response.errors) {
    console.error('Query failed.', response);
    return ctx.body = sendres(ECODE.query_failed);
  }
  return ctx.body = sendres(0, response.data);
}
