'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 80 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!)
  const { viewport } = useThree()
  const mouse = useRef(new THREE.Vector2(0, 0))

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3]     = (Math.random() - 0.5) * viewport.width  * 2
      pos[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2
      pos[i3 + 2] = (Math.random() - 0.5) * 5
      vel[i3]     = (Math.random() - 0.5) * 0.01
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01
      vel[i3 + 2] = 0
    }
    return [pos, vel]
  }, [count, viewport])

  useFrame(({ pointer }) => {
    if (!mesh.current) return
    mouse.current.set(pointer.x * viewport.width, pointer.y * viewport.height)

    const attr = mesh.current.geometry.attributes.position as THREE.BufferAttribute
    const posArray = attr.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const dx = posArray[i3]     - mouse.current.x * 0.5
      const dy = posArray[i3 + 1] - mouse.current.y * 0.5
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 3) {
        posArray[i3]     += dx * 0.015
        posArray[i3 + 1] += dy * 0.015
      }

      posArray[i3]     += velocities[i3]
      posArray[i3 + 1] += velocities[i3 + 1]

      const hW = viewport.width
      const hH = viewport.height
      if (posArray[i3]     >  hW) posArray[i3]     = -hW
      if (posArray[i3]     < -hW) posArray[i3]     =  hW
      if (posArray[i3 + 1] >  hH) posArray[i3 + 1] = -hH
      if (posArray[i3 + 1] < -hH) posArray[i3 + 1] =  hH
    }

    attr.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#1E90FF"
        sizeAttenuation
        transparent
        opacity={0.6}
        fog={false}
      />
    </points>
  )
}
