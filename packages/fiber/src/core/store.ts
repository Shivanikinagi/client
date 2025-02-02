import create from 'zustand'
import * as THREE from 'three'
import React from 'react'

// Define the InternalState interface
interface InternalState {
  interaction: THREE.Object3D[]
  priority: number
  frames: number
  lastEvent: React.MutableRefObject<any>
  hovered: Map<string, any>
  subscribers: any[]
  capturedMap: Map<number, Map<THREE.Object3D, any>>
  initialClick: [number, number]
  initialHits: THREE.Object3D[]
  subscribe: (callback: React.MutableRefObject<any>, priority: number, store: any) => () => void
}

// Define the RootState interface
export interface RootState {
  internal: InternalState
  gl: THREE.WebGLRenderer | null
  camera: THREE.Camera | null
  scene: THREE.Scene
  raycaster: THREE.Raycaster
  clock: THREE.Clock
  set: (partial: Partial<RootState> | ((state: RootState) => Partial<RootState>)) => void
  get: () => RootState
}

// Create the Zustand store
const useStore = create<RootState>((set, get) => ({
  internal: {
    interaction: [],
    priority: 0,
    frames: 0,
    lastEvent: { current: null },
    hovered: new Map(),
    subscribers: [],
    capturedMap: new Map(),
    initialClick: [0, 0],
    initialHits: [],
    subscribe: (callback, priority, store) => {
      return () => {} // Return a cleanup function
    },
  },

  gl: null,
  camera: null,
  scene: new THREE.Scene(),
  raycaster: new THREE.Raycaster(),
  clock: new THREE.Clock(),

  set: (partial) => set((state) => ({ ...state, ...partial })),
  get: () => get(),
}))

// Create and export the React context
const context = React.createContext<RootState | undefined>(undefined)

// Export the store, context, and types
export type UseRootStore = typeof useStore
export { context, RootState }
export default useStore
