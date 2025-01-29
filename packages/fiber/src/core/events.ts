import * as THREE from 'three';
import { ContinuousEventPriority, DiscreteEventPriority, DefaultEventPriority } from 'react-reconciler/constants';
import { getRootState } from './utils';
import { StoreApi, UseBoundStore } from 'zustand';

type RootState = {
  internal: {
    interaction: THREE.Object3D[];
    initialHits: THREE.Object3D[];
    hovered: Map<any, any>;
    capturedMap: Map<number, Map<THREE.Object3D, PointerCaptureTarget>>;
    initialClick: [number, number];
  };
  previousRoot: any;
  events: any;
};

export type UseRootStore = UseBoundStore<RootState>;

import type { Instance } from './renderer';
import { RootState } from './store';
import type { Properties } from '../three-types';

export interface Intersection extends THREE.Intersection {
  eventObject: THREE.Object3D; // The object that triggered the event
}

export interface IntersectionEvent<TSourceEvent> extends Intersection {
  eventObject: THREE.Object3D;
  intersections: Intersection[];
  unprojectedPoint: THREE.Vector3;
  pointer: THREE.Vector2;
  delta: number;
  ray: THREE.Ray;
  camera: Camera;
  stopPropagation: () => void;
  nativeEvent: TSourceEvent;
  stopped: boolean;
}

export type Camera = THREE.OrthographicCamera | THREE.PerspectiveCamera;
export type ThreeEvent<TEvent> = IntersectionEvent<TEvent> & Properties<TEvent>;
export type DomEvent = PointerEvent | MouseEvent | WheelEvent;

// Define event types for interactions
export type Events = {
  onClick: EventListener;
  onContextMenu: EventListener;
  onDoubleClick: EventListener;
  onWheel: EventListener;
  onPointerDown: EventListener;
  onPointerUp: EventListener;
  onPointerLeave: EventListener;
  onPointerMove: EventListener;
  onPointerCancel: EventListener;
  onLostPointerCapture: EventListener;
};

// Event handlers
export type EventHandlers = {
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
  onContextMenu?: (event: ThreeEvent<MouseEvent>) => void;
  onDoubleClick?: (event: ThreeEvent<MouseEvent>) => void;
  onPointerUp?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerDown?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerEnter?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerLeave?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerMissed?: (event: MouseEvent) => void;
  onPointerCancel?: (event: ThreeEvent<PointerEvent>) => void;
  onWheel?: (event: ThreeEvent<WheelEvent>) => void;
};

// Get event priority based on the event type
export function getEventPriority() {
  const globalScope = (typeof self !== 'undefined' && self) || (typeof window !== 'undefined' && window);
  if (!globalScope) return DefaultEventPriority;

  const eventType = globalScope.event?.type;
  switch (eventType) {
    case 'click':
    case 'contextmenu':
    case 'dblclick':
    case 'pointercancel':
    case 'pointerdown':
    case 'pointerup':
      return DiscreteEventPriority;
    case 'pointermove':
    case 'pointerout':
    case 'pointerover':
    case 'pointerenter':
    case 'pointerleave':
    case 'wheel':
      return ContinuousEventPriority;
    default:
      return DefaultEventPriority;
  }
}

// Removes interactivity from a specified object in the store
export function removeInteractivity(store: UseBoundStore<RootState>, object: THREE.Object3D) {
  const { internal } = store.getState();

  internal.interaction = internal.interaction.filter(o => o !== object);
  internal.initialHits = internal.initialHits.filter(o => o !== object);

  // Remove hovered and captured elements related to the object
  internal.hovered.forEach((value, key) => {
    if (value.eventObject === object || value.object === object) {
      internal.hovered.delete(key);
    }
  });

  internal.capturedMap.forEach((captures, pointerId) => {
    releaseInternalPointerCapture(internal.capturedMap, object, captures, pointerId);
  });
}

// Adds an event listener to a given object for the specified event
export function addEventListener<T extends keyof Events>(handler: EventHandlers[T], event: T, object: THREE.Object3D) {
  object.addEventListener(event, handler as EventListener);
}

// Internal function to release pointer capture
function releaseInternalPointerCapture(
  capturedMap: Map<number, Map<THREE.Object3D, PointerCaptureTarget>>,
  obj: THREE.Object3D,
  captures: Map<THREE.Object3D, PointerCaptureTarget>,
  pointerId: number
): void {
  const captureData = captures.get(obj);
  if (captureData) {
    captures.delete(obj);
    if (captures.size === 0) {
      capturedMap.delete(pointerId);
      captureData.target.releasePointerCapture(pointerId);
    }
  }
}

// Main function to calculate distance of pointer movement
export function calculateDistance(event: DomEvent, store: UseBoundStore<RootState>) {
  const { internal } = store.getState();
  const dx = event.offsetX - internal.initialClick[0];
  const dy = event.offsetY - internal.initialClick[1];
  return Math.round(Math.sqrt(dx * dx + dy * dy));
}

// Function to filter objects for pointer events based on event handlers
export function filterPointerEvents(objects: THREE.Object3D[]) {
  return objects.filter((obj) =>
    ['Move', 'Over', 'Enter', 'Out', 'Leave'].some(
      (name) => (obj as Instance).__r3f?.handlers[('onPointer' + name) as keyof EventHandlers]
    ),
  );
}

// Function to perform intersection tests for pointer events
export function intersect(event: DomEvent, filter?: (objects: THREE.Object3D[]) => THREE.Object3D[], store: UseBoundStore<RootState>) {
  const state = store.getState();
  const duplicates = new Set<string>();
  const intersections: Intersection[] = [];
  const eventsObjects = filter ? filter(state.internal.interaction) : state.internal.interaction;

  // Raycasting for each object in the eventsObjects
  function handleRaycast(obj: THREE.Object3D) {
    const state = getRootState(obj);
    if (!state || !state.events.enabled || state.raycaster.camera === null) return [];

    if (state.raycaster.camera === undefined) {
      state.events.compute?.(event, state, state.previousRoot?.getState());
      if (state.raycaster.camera === undefined) state.raycaster.camera = null!;
    }

    return state.raycaster.camera ? state.raycaster.intersectObject(obj, true) : [];
  }

  let hits: THREE.Intersection<THREE.Object3D>[] = eventsObjects
    .flatMap(handleRaycast)
    .sort((a, b) => {
      const aState = getRootState(a.object);
      const bState = getRootState(b.object);
      if (!aState || !bState) return a.distance - b.distance;
      return bState.events.priority - aState.eve
