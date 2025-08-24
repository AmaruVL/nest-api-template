/**
 * Expande variables de entorno en un string tipo:
 * "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
 *
 * Además aplica encodeURIComponent al DB_PASSWORD.
 */
export function expandDatabaseEnvVars(value: string | undefined): string | undefined {
  if (!value) return value
  return value.replace(/\$\{(\w+)\}/g, (_, name) => {
    let replacement = process.env[name]
    if (replacement === undefined) {
      throw new Error(`Environment variable ${name} is not set`)
    }
    // codificar solo DB_PASSWORD
    if (name === 'DB_PASSWORD') {
      replacement = encodeURIComponent(replacement)
    }
    return replacement
  })
}
