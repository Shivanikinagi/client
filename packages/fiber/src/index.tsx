export * from './three-types'
import * as ReactThreeFiber from './three-types'
export { ReactThreeFiber }
export type { BaseInstance, LocalState } from './core/renderer'
export type {
  Intersection,
  Subscription,
  Dpr,
  Size,
  Viewport,
  RenderCallback,
  Performance,
  RootState,
} from './core/store'
export type { ThreeEvent, Events, EventManager, ComputeFunction } from './core/events'
export { createEvents } from './core/events'
export type { ObjectMap, Camera } from './core/utils'
export * from './web/Canvas'
export { createPointerEvents as events, createPointerEvents } from './web/events'
export type { GlobalRenderCallback, GlobalEffectType } from './core/loop'
export * from './core'

// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App' // Import your App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'), // Ensure you have a div with id 'root' in your HTML
)
