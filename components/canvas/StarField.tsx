'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function StarField({ count = 3000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3]     = (Math.random() - 0.5) * 200
      pos[i3 + 1] = (Math.random() - 0.5) * 200
      pos[i3 + 2] = (Math.random() - 0.5) * 200
      sz[i] = Math.random() * 1.5 + 0.2
    }
    return [pos, sz]
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.01
    mesh.current.rotation.x = t * 0.005
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          // @ts-expect-error R3F bufferAttribute args
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          // @ts-expect-error R3F bufferAttribute args
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={new THREE.Color('#60A5FA')}
        sizeAttenuation
        transparent
        opacity={0.7}
        fog={false}
      />
    </points>
  )
}
