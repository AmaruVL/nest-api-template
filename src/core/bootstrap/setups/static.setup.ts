import fastifyStatic from '@fastify/static'
import fastifyMultipart from '@fastify/multipart'

export async function setupStatic(app: any, uploadsPath: string) {
  await app.register(fastifyMultipart)
  await app.register(fastifyStatic, { root: uploadsPath, prefix: '/uploads' })
}
