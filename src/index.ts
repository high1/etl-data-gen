import fastify, { FastifyInstance } from 'fastify';
import { generateData } from 'data';
import { options } from 'configuration';
import type { Querystring, Shift } from 'types';

const server: FastifyInstance = fastify({ logger: true });

server.get<{ Querystring: Querystring; Reply: Shift[] }>(
  '/shifts',
  options,
  async ({ query }) => await generateData(query),
);

server.listen(3000, '0.0.0.0', (error) => {
  if (error) {
    server.log.error(error);
    throw error;
  }

  server.log.info(`Server listening on port 3000.`);
});
