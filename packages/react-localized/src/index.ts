import { createContext, createElement, useEffect, useState, useContext, useMemo, forwardRef } from 'react'
import { createLocalizedContext, createLocalizedProvider, createUseLocales, createWithLocales, LocalizedContextValue, LocalizedProviderProps } from 'react-localized-core'

export * from 'react-localized-core'

const localizedContext = createLocalizedContext({
  createContext,
})

export const LocalizedProvider: (props: LocalizedProviderProps) => JSX.Element = (
  createLocalizedProvider({
    localizedContext, createElement, useEffect, useState, useMemo,
  })
)

export const useLocales: () => LocalizedContextValue = (
  createUseLocales({
    localizedContext, useContext,
  })
)

export const withLocales: <ComponentProps = any>() => (Component: any) => (props: ComponentProps) => JSX.Element = (
  createWithLocales({
    createElement, forwardRef, useLocales,
  })
)
