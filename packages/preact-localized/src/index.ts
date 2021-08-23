import { createContext, createElement } from 'preact'
import { useEffect, useState, useContext, useMemo } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { createLocalizedContext, createLocalizedProvider, createUseLocales, createWithLocales, LocalizedProviderProps, LocalizedContextValue } from 'react-localized-core'

export * from 'react-localized-core'

// @todo
const localizedContext = createLocalizedContext({
  createContext,
})

// @todo
export const LocalizedProvider: (props: LocalizedProviderProps) => JSX.Element = (
  createLocalizedProvider({
    localizedContext, createElement, useEffect, useState, useMemo,
  })
)

// @todo
export const useLocales: () => LocalizedContextValue = (
  createUseLocales({
    localizedContext, useContext,
  })
)

// @todo
export const withLocales = createWithLocales({
  createElement, forwardRef, useLocales,
})
