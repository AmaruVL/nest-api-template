/**
 * Reemplaza parámetros en queries de PostgreSQL ($1, $2, ...)
 * @param query SQL con placeholders estilo $1, $2...
 * @param params String JSON con los parámetros (ej: '["foo", 123, true]')
 * @returns SQL con parámetros interpolados
 */
export function formatPostgresQuery(query: string, params: string): string {
  try {
    const parsedParams = JSON.parse(params) as any[];

    parsedParams.forEach((p, i) => {
      let value: string;

      if (p === null) {
        value = 'NULL';
      } else if (typeof p === 'string') {
        value = `'${p.replace(/'/g, "''")}'`; // escapamos comillas simples
      } else {
        value = p.toString();
      }

      // Reemplaza $1, $2... (Postgres es 1-based)
      query = query.replace(`$${i + 1}`, value);
    });

    return query;
  } catch {
    return query; // fallback: no tocar si falla
  }
}

/**
 * Reemplaza parámetros en queries de MySQL (?, ?, ...)
 * @param query SQL con placeholders estilo ?
 * @param params String JSON con los parámetros (ej: '["foo", 123, true]')
 * @returns SQL con parámetros interpolados
 */
export function formatMySqlQuery(query: string, params: string): string {
  try {
    const parsedParams = JSON.parse(params) as any[];

    parsedParams.forEach(p => {
      let value: string;

      if (p === null) {
        value = 'NULL';
      } else if (typeof p === 'string') {
        value = `'${p.replace(/'/g, "''")}'`;
      } else {
        value = p.toString();
      }

      // Sustituye el primer ?
      query = query.replace('?', value);
    });

    return query;
  } catch {
    return query; // fallback: no tocar si falla
  }
}
