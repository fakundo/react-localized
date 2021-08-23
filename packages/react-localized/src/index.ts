import { createContext, createElement, useEffect, useState, useContext, useMemo, forwardRef } from 'react'
import { createLocalizedContext, createLocalizedProvider, createUseLocales, createWithLocales, LocalizedContextValue, LocalizedProviderProps } from 'react-localized-core'

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
