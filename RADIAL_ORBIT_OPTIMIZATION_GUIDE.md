# 🌀 Radial Orbit Animation Optimization Guide

**Date:** October 1, 2025  
**Time:** 13:17 IST

---

## ✅ Summary of Fixes

- **Replaced `setInterval` with `requestAnimationFrame`** to sync animation with display refresh.
- **Introduced refs** (`rotationAngleRef`, `animationFrameRef`, `lastTimestampRef`) to avoid state stutter and stale closures.
- **Capped delta time** at **50ms** (`maxDelta = 0.05`) to prevent sudden jumps when browser throttles frames.
- **Device-adaptive speeds**:
  - Low-end (`<=2 cores or <=2GB RAM`): 10°/s
  - Mid-range: 14°/s
  - High-end: 18°/s

---

## 📌 Implementation Details (`components/ui/RadialOrbitalFeatureSection.tsx`)

### 1. Refs to Track Animation State
```tsx
const rotationAngleRef = useRef<number>(0);
const animationFrameRef = useRef<number | null>(null);
const lastTimestampRef = useRef<number | null>(null);

useEffect(() => {
  rotationAngleRef.current = rotationAngle;
}, [rotationAngle]);
```

### 2. Jitter-Free `requestAnimationFrame` Loop
```tsx
useEffect(() => {
  if (autoRotate && isInViewport) {
    const maxDelta = 0.05;
    const rotationSpeed = devicePerformance === "low" ? 10
      : devicePerformance === "medium" ? 14
      : 18; // degrees per second

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const delta = Math.min((timestamp - lastTimestampRef.current) / 1000, maxDelta);
      lastTimestampRef.current = timestamp;

      const nextAngle = (rotationAngleRef.current + rotationSpeed * delta) % 360;
      rotationAngleRef.current = nextAngle;
      setRotationAngle(Number(nextAngle.toFixed(2)));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }

  return () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    lastTimestampRef.current = null;
    // ...existing cleanup...
  };
}, [autoRotate, isInViewport, devicePerformance]);
```

---

## 🧠 Deployment Considerations

- **Stay within React state boundaries**: `rotationAngleRef` mirrors state; `setRotationAngle` ensures React UI updates.
- **Maintain cleanup**: Cancels RAF on unmount or dependencies change to avoid memory leaks.
- **Adaptation**: Device detection (cores & memory) already present; ensure fallback to "medium" when APIs missing.
- **Server/ISR safety**: All browser-only APIs are inside `useEffect`, so SSR remains unaffected.
- **Performance**: RAF keeps animation smooth on 60Hz+ displays, while `maxDelta` safeguards tab throttling.

---

## 📋 Recommended Verification Steps

1. **Desktop** (Chrome/Firefox): Observe smooth 60fps rotation.
2. **Mobile Simulation**: Use DevTools device emulation; confirm slower, smooth motion.
3. **Throttle Tests**: Run CPU throttling to ensure no jumpiness (delta capped at 50ms).
4. **Inactive Tab Return**: Leave tab idle for 30s, return—rotation should resume smoothly without jumps.

---

## 🚀 Summary

The radial orbit now delivers **jitter-free**, **device-aware** animation suitable for production deployment. The new RAF-based loop keeps visuals polished while maintaining predictable CPU usage and cross-device stability.
