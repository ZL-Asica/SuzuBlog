import type { ReactElement } from 'react'
import { ArrowBigUp, ArrowRightToLine, ChevronUp, Command, CornerDownLeft, Option, Space, SquareArrowDown, SquareArrowLeft, SquareArrowRight, SquareArrowUp } from 'lucide-react'

export const KEY_ICONS: Record<string, ReactElement> = {
  ctrl: (
    <>
      <ChevronUp className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Ctrl
    </>
  ),
  option: (
    <>
      <Option className="inline-block h-4 w-4 font-semibold -mx-1" />
      {' '}
      Option
    </>
  ),
  command: (
    <>
      <Command className="inline-block h-4 w-4" />
      {' '}
      Command
    </>
  ),
  shift: (
    <>
      <ArrowBigUp className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Shift
    </>
  ),
  alt: (
    <>
      <Option className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Alt
    </>
  ),
  enter: (
    <>
      <CornerDownLeft className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Enter
    </>
  ),
  esc: (
    <>
      <span className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Esc
    </>
  ),
  tab: (
    <>
      <ArrowRightToLine className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Tab
    </>
  ),
  space: (
    <>
      <Space className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Space
    </>
  ),
  arrowup: (
    <>
      <SquareArrowUp className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Arrow Up
    </>
  ),
  arrowdown: (
    <>
      <SquareArrowDown className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Arrow Down
    </>
  ),
  arrowleft: (
    <>
      <SquareArrowLeft className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Arrow Left
    </>
  ),
  arrowright: (
    <>
      <SquareArrowRight className="inline-block h-4 w-4 font-semibold" />
      {' '}
      Arrow Right
    </>
  ),
}
