import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface MarkdownGridProps extends ComponentPropsWithoutRef<'div'> {
  items: ReactNode[]
  columnCount: number
}

interface GridItem {
  index: number
  node: ReactNode
}

type GridColumn = GridItem[]

const createGridItems = (items: ReactNode[]): GridItem[] => {
  return items.map((node, index) => ({ index, node }))
}

const distributeItems = (items: GridItem[], columnCount: number): GridColumn[] => {
  const columns = Array.from({ length: columnCount }, () => [] as GridColumn)

  items.forEach((item, index) => {
    columns[index % columnCount].push(item)
  })

  return columns
}

const getColumns = (items: ReactNode[], columnCount: number): {
  columns: GridColumn[]
  layout: 'balanced' | 'balanced-five' | 'featured-three' | 'mixed-two'
} => {
  const gridItems = createGridItems(items)

  if (items.length === 3 && columnCount === 2) {
    return {
      columns: [[gridItems[0]], gridItems.slice(1)],
      layout: 'featured-three',
    }
  }

  if (items.length === 5 && columnCount === 2) {
    return {
      columns: [gridItems.slice(0, 2), gridItems.slice(2)],
      layout: 'balanced-five',
    }
  }

  return {
    columns: distributeItems(gridItems, columnCount),
    layout: items.length === 2 ? 'mixed-two' : 'balanced',
  }
}

export function MarkdownGrid({ items, columnCount, className, ...props }: MarkdownGridProps) {
  const { columns, layout } = getColumns(items, columnCount)

  return (
    <div
      {...props}
      className={['markdown-gallery-grid clear-both my-8 max-w-full', className].filter(Boolean).join(' ')}
      data-gallery-mode="grid"
      data-gallery-columns={columnCount}
      data-gallery-count={items.length}
      data-grid-layout={layout}
    >
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="markdown-gallery-column">
          {column.map(({ index, node }) => (
            <div
              key={index}
              className="markdown-gallery-item [&>p]:m-0!"
              data-gallery-index={index}
            >
              {node}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
