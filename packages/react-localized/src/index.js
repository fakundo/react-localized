import { createContext, createElement, useEffect, useState, useContext, useMemo, forwardRef } from 'react'
import { createLocalizedContext, createLocalizedProvider, createUseLocales, createWithLocales } from 'react-localized-core'

const LocalizedContext = createLocalizedContext({
  createContext,
})

export const LocalizedProvider = createLocalizedProvider({
  LocalizedContext, createElement, useEffect, useState, useMemo,
})

export const useLocales = createUseLocales({
  LocalizedContext, useContext,
})

export const withLocales = createWithLocales({
  createElement, forwardRef, useLocales,
})

export { createLocale } from 'react-localized-core'
