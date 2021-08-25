import { createContext, createElement, VNode } from 'preact'
import { useEffect, useState, useContext, useMemo } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { createLocalizedContext, createLocalizedProvider, createUseLocales, createWithLocales, LocalizedProviderProps, LocalizedContextValue } from 'react-localized-core'

export * from 'react-localized-core'

const localizedContext = createLocalizedContext({
  createContext,
})

export const LocalizedProvider: (props: LocalizedProviderProps) => preact.JSX.Element = (
  createLocalizedProvider({
    localizedContext, createElement, useEffect, useState, useMemo,
  })
)

export const useLocales: () => LocalizedContextValue = (
  createUseLocales({
    localizedContext, useContext,
  })
)

export const withLocales: <ComponentProps = any>() => (Component: any) => (props: ComponentProps) => preact.JSX.Element = (
  createWithLocales({
    createElement, forwardRef, useLocales,
  })
)
