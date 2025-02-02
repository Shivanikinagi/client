import * as THREE from 'three'
import useStore, { UseRootStore } from './store'

// Define the Intersection type
interface Intersection {
  object: THREE.Object3D
  eventObject: THREE.Object3D
}

// Function to handle pointer events
export function setupPointerEvents(scene: THREE.Scene, camera: THREE.Camera, canvas: HTMLElement) {
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  canvas.addEventListener('pointerdown', (event) => {
    pointer.x = (event.clientX / canvas.clientWidth) * 2 - 1
    pointer.y = -(event.clientY / canvas.clientHeight) * 2 + 1

    raycaster.setFromCamera(pointer, camera)
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object
      console.log('Clicked object:', clickedObject)
      onObjectClicked(clickedObject)
    }
  })
}

// Example handler for clicked objects
function onObjectClicked(object: THREE.Object3D) {
  console.log('Object clicked:', object)
}

// Function to remove interactivity from an object
export function removeInteractivity(object: THREE.Object3D, store: UseRootStore) {
  const { internal } = store.getState()

  internal.capturedMap.forEach((map: Map<THREE.Object3D, HTMLElement>) => {
    map.forEach((target, obj) => {
      if (obj === object) {
        map.delete(obj)
      }
    })
  })

  internal.interaction = internal.interaction.filter((o: THREE.Object3D) => o !== object)
  internal.initialHits = internal.initialHits.filter((o: THREE.Object3D) => o !== object)
}

// Function to calculate the distance of pointer movement
export function calculateDistance(event: MouseEvent | TouchEvent, store: UseRootStore): number {
  const { internal } = store.getState()

  const dx = (event instanceof MouseEvent ? event.offsetX : 0) - internal.initialClick[0]
  const dy = (event instanceof MouseEvent ? event.offsetY : 0) - internal.initialClick[1]

  return Math.round(Math.sqrt(dx * dx + dy * dy))
}

// Function to handle event logic for pointer interaction
export function handleEvent(event: MouseEvent | TouchEvent, store: UseRootStore) {
  const { internal } = store.getState()
  const duplicates = new Set<string>()
  const intersections: Intersection[] = []

  const eventsObjects = internal.interaction

  eventsObjects.forEach((object: THREE.Object3D) => {
    const intersection = checkIntersection(event, object)

    if (intersection && !duplicates.has(intersection.object.uuid)) {
      duplicates.add(intersection.object.uuid)
      intersections.push(intersection)
    }
  })

  processIntersections(intersections, store)
}

// Function to check if the pointer intersects with an object
function checkIntersection(event: MouseEvent | TouchEvent, object: THREE.Object3D): Intersection | null {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  if (event instanceof MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  } else if (event instanceof TouchEvent && event.touches.length > 0) {
    const touch = event.touches[0]
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1
  }

  raycaster.setFromCamera(mouse, camera) // Ensure the raycaster is set with the camera
  const intersects = raycaster.intersectObject(object)
  if (intersects.length > 0) {
    return {
      object: intersects[0].object,
      eventObject: object,
    }
  }

  return null
}

// Function to process the intersections
function processIntersections(intersections: Intersection[], store: UseRootStore) {
  const { internal } = store.getState()
  intersections.forEach((intersection) => {
    const { object } = intersection
    if (internal.hovered.has(object.uuid)) {
      handleHover(object)
    }
  })
}

// Function to handle hover interaction with objects
function handleHover(object: THREE.Object3D) {
  console.log('Hovered over object:', object)
}

// Function to add event listeners to objects
export function addEventListenerToObject(
  object: THREE.Object3D,
  event: keyof THREE.Object3DEventMap,
  handler: (evt: THREE.Object3DEventMap[keyof THREE.Object3DEventMap]) => void,
) {
  object.addEventListener(event, (evt: THREE.Event) => {
    handler(evt as THREE.Object3DEventMap[keyof THREE.Object3DEventMap])
  })
}

// Utility function to handle internal pointer capture
export function releaseInternalPointerCapture(
  capturedMap: Map<string, any>,
  object: THREE.Object3D,
  captures: any,
  pointerId: string,
) {
  console.log('Released pointer capture for:', object)
}
