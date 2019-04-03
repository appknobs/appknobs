export interface AsyncResult {
  type: 'error' | 'success'
  flag: string
  message?: string
}
