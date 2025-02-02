import { useEffect } from 'react'
import * as THREE from 'three'
import useStore from './core/store'
import { setupPointerEvents } from './core/events'

const App = () => {
  const store = useStore()
  const { scene, camera } = store.getState()

  useEffect(() => {
    const canvas = document.querySelector('canvas')!
    setupPointerEvents(scene, camera, canvas)
  }, [scene, camera])

  return <canvas />
}

export default App
