import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {
    root: './'
  }
}

export default nextConfig
