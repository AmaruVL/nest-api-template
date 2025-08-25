export type EnvGetter = (key: string) => string | undefined

export class BaseEnvReader {
  constructor(private readonly getRaw: EnvGetter) {}

  // ===== Required =====
  protected reqString(key: string): string {
    const v = this.getRaw(key)
    if (v == null) throw new Error(`Missing required env: ${key}`)
    return v
  }

  protected reqNumber(key: string): number {
    const raw = this.reqString(key)
    const n = Number(raw)
    if (Number.isNaN(n)) throw new Error(`Environment variable ${key} should be a number`)
    return n
  }

  protected reqBoolean(key: string): boolean {
    return this.toStrictBool(this.reqString(key))
  }

  protected reqJson<T>(key: string): T {
    const raw = this.reqString(key)
    try {
      return JSON.parse(raw) as T
    } catch {
      throw new Error(`Environment variable ${key} should be valid JSON`)
    }
  }

  // ===== Optional (with default) =====
  protected optString(key: string, def?: string): string | undefined {
    const v = this.getRaw(key)
    return v ?? def
  }

  protected optNumber(key: string, def?: number): number | undefined {
    const v = this.getRaw(key)
    if (v == null) return def
    const n = Number(v)
    if (Number.isNaN(n)) throw new Error(`Environment variable ${key} should be a number`)
    return n
  }

  protected optBoolean(key: string, def?: boolean): boolean | undefined {
    const v = this.getRaw(key)
    if (v == null) return def
    return this.toStrictBool(v)
  }

  protected optJson<T>(key: string, def?: T): T | undefined {
    const v = this.getRaw(key)
    if (v == null) return def
    try {
      return JSON.parse(v) as T
    } catch {
      throw new Error(`Environment variable ${key} should be valid JSON`)
    }
  }

  // Solo aceptar "true"/"false"
  private toStrictBool(v: string): boolean {
    const n = v.trim().toLowerCase()
    if (n === 'true') return true
    if (n === 'false') return false
    throw new Error(`Invalid boolean value "${v}". Expected "true" or "false"`)
  }
}
