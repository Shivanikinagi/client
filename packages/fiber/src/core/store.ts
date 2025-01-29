import * as THREE from 'three'
import * as React from 'react'
import create, { GetState, SetState, StoreApi, UseBoundStore } from 'zustand'
import { DomEvent, EventManager, PointerCaptureTarget, ThreeEvent } from './events'
import { _XRFrame, calculateDpr, Camera, isOrthographicCamera, updateCamera } from './utils'
import { Advance, Invalidate } from './loop'

// Keys that shouldn't be copied between R3F stores
export const privateKeys = [
  'set',
  'get',
  'setSize',
  'setFrameloop',
  'setDpr',
  'events',
  'invalidate',
  'advance',
  'size',
  'viewport',
] as const

export type PrivateKeys = typeof privateKeys[number]

export interface Intersection extends THREE.Intersection {
  eventObject: THREE.Object3D
}

export type Subscription = {
  ref: React.MutableRefObject<RenderCallback>
  priority: number
  store: UseBoundStore<RootState, StoreApi<RootState>>
}

export type Dpr = number | [min: number, max: number]
export type Size = {
  width: number
  height: number
  top: number
  left: number
  updateStyle?: boolean
}
export type Viewport = Size & {
  initialDpr: number
  dpr: number
  factor: number
  distance: number
  aspect: number
  getCurrentViewport: (
    camera?: Camera,
    target?: THREE.Vector3 | Parameters<THREE.Vector3['set']>,
    size?: Size
  ) => Omit<Viewport, 'dpr' | 'initialDpr'>
}

export type RenderCallback = (state: RootState, delta: number, frame?: _XRFrame) => void

export type Performance = {
  current: number
  min: number
  max: number
  debounce: number
  regress: () => void
}

export type Renderer = { render: (scene: THREE.Scene, camera: THREE.Camera) => any }
export const isRenderer = (def: any) => !!def?.render

export type InternalState = {
  active: boolean
  priority: number
  frames: number
  lastEvent: React.MutableRefObject<DomEvent | null>
  interaction: THREE.Object3D[]
  hovered: Map<string, ThreeEvent<DomEvent>>
  subscribers: Subscription[]
  capturedMap: Map<number, Map<THREE.Object3D, PointerCaptureTarget>>
  initialClick: [x: number, y: number]
  initialHits: THREE.Object3D[]
  subscribe: (
    callback: React.MutableRefObject<RenderCallback>,
    priority: number,
    store: UseBoundStore<RootState, StoreApi<RootState>>
  ) => () => void
}

export type RootState = {
  set: SetState<RootState>
  get: GetState<RootState>
  gl: THREE.WebGLRenderer
  camera: Camera & { manual?: boolean }
  scene: THREE.Scene
  raycaster: THREE.Raycaster
  clock: THREE.Clock
  events: EventManager<any>
  xr: { connect: () => void; disconnect: () => void }
  controls: THREE.EventDispatcher | null
  pointer: THREE.Vector2
  mouse: THREE.Vector2
  legacy: boolean
  linear: boolean
  flat: boolean
  frameloop: 'always' | 'demand' | 'never'
  performance: Performance
  size: Size
  viewport: Viewport
  invalidate: Invalidate
  advance: Advance
  setEvents: (events: Partial<EventManager<any>>) => void
  setSize: (
    width: number,
    height: number,
    updateStyle?: boolean,
    top?: number,
    left?: number
  ) => void
  setDpr: (dpr: Dpr) => void
  setFrameloop: (frameloop?: 'always' | 'demand' | 'never') => void
  onPointerMissed?: (event: MouseEvent) => void
  internal: InternalState
}

const context = React.createContext<UseBoundStore<RootState>>(null!)

// Create the store and manage events/viewport size
const createStore = (invalidate: Invalidate, advance: Advance): UseBoundStore<RootState> => {
  const rootState = create<RootState>((set, get) => {
    const position = new THREE.Vector3()
    const defaultTarget = new THREE.Vector3()
    const tempTarget = new THREE.Vector3()

    // Correct calculation for dpr
    function getCurrentViewport(
      camera: Camera = get().camera,
      target: THREE.Vector3 | Parameters<THREE.Vector3['set']> = defaultTarget,
      size: Size = get().size
    ): Omit<Viewport, 'dpr' | 'initialDpr'> {
      const { width, height, top, left } = size
      const aspect = width / height
      if ((target as THREE.Vector3).isVector3) tempTarget.copy(target as THREE.Vector3)
      else tempTarget.set(...(target as Parameters<THREE.Vector3['set']>))
      const distance = camera.getWorldPosition(position).distanceTo(tempTarget)
      if (isOrthographicCamera(camera)) {
        return { width: width / camera.zoom, height: height / camera.zoom, top, left, factor: 1, distance, aspect }
      } else {
        const fov = (camera.fov * Math.PI) / 180 // convert vertical fov to radians
        const h = 2 * Math.tan(fov / 2) * distance // visible height
        const w = h * (width / height)
        return { width: w, height: h, top, left, factor: width / w, distance, aspect }
      }
    }

    const setPerformanceCurrent = (current: number) => {
      set((state) => ({ performance: { ...state.performance, current } }))
    }

    const rootState: RootState = {
      set,
      get,

      gl: null as unknown as THREE.WebGLRenderer,
      camera: null as unknown as Camera,
      raycaster: new THREE.Raycaster(),
      scene: new THREE.Scene(),
      clock: new THREE.Clock(),
      events: new EventManager(),
      xr: { connect: () => {}, disconnect: () => {} },
      controls: null,

      pointer: new THREE.Vector2(),
      mouse: new THREE.Vector2(),

      legacy: false,
      linear: false,
      flat: false,
      frameloop: 'demand',
      performance: {
        current: 0.5,
        max: 1,
        min: 0.1,
        debounce: 200,
        regress: () => setPerformanceCurrent(0.1),
      },

      size: { width: 0, height: 0, top: 0, left: 0 },

      viewport: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        initialDpr: 1,
        dpr: 1,
        factor: 1,
        distance: 1,
        aspect: 1,
        getCurrentViewport,
      },

      invalidate,
      advance,

      internal: {
        active: true,
        priority: 0,
        frames: 0,
        lastEvent: { current: null },
        interaction: [],
        hovered: new Map(),
        subscribers: [],
        capturedMap: new Map(),
        initialClick: [0, 0],
        initialHits: [],
        subscribe: (callback, priority, store) => {
          return () => {}
        },
      },
    }

    return rootState
  })

  return rootState
}

export default createStore
