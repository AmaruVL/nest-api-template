/* eslint-disable no-console */
import { Logger } from '@nestjs/common'

export async function startApp(app: any, port: number, docPath: string) {
  await app.listen(port, '0.0.0.0')
  const logger = new Logger('Bootstrap')
  logger.log(`Documentation available at http://localhost:${port}/${docPath}`)
  console.log('\n> Application started correctly!')
  console.log(`> Documentation available at http://localhost:${port}/${docPath}`)
}
