const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')

const plugins = [
  withTM([
    '@stadium/core'
  ])
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  poweredByHeader: false
}

module.exports = withPlugins(plugins, nextConfig)
