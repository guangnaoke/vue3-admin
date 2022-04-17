import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import mockData from './index'

export const mockModules = [...mockData]

export function createMoack() {
  createProdMockServer(mockModules)
}
