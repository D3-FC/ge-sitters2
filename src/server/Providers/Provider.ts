import { Express } from 'express'

export interface Provider {
  boot (app: Express): Promise<void>
}
