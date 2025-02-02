import create from 'zustand'
import * as THREE from 'three'

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
interface RootState {
  internal: InternalState
  gl: THREE.WebGLRenderer
  camera: THREE.Camera
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

  gl: null as unknown as THREE.WebGLRenderer,
  camera: null as unknown as THREE.Camera,
  scene: new THREE.Scene(),
  raycaster: new THREE.Raycaster(),
  clock: new THREE.Clock(),

  set: set,
  get: get,
}))

// Export the store and types
export type UseRootStore = typeof useStore
export default useStore
