import React, { useState, useEffect, useRef } from "react"
import { VariableSizeGrid as Grid } from "react-window"
import ResizeObserver from "rc-resize-observer"
import { Table } from "antd"

function ExactVirtualizeTable(props) {
  const { columns, scroll } = props
  const [tableWidth, setTableWidth] = useState(0)
  const widthColumnCount = columns.filter(({ width }) => !width).length
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column
    }

    return { ...column, width: Math.floor(tableWidth / widthColumnCount) }
  })
  const gridRef = useRef()
  const [connectObject] = useState(() => {
    const obj = {}
    Object.defineProperty(obj, "scrollLeft", {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({
            scrollLeft,
          })
        }
      },
    })
    return obj
  })

  const resetVirtualGrid = () => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    })
  }

  useEffect(() => resetVirtualGrid, [tableWidth])

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject
    const totalHeight = rawData.length * 54
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid w-100"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index]
          return totalHeight > scroll.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          })
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={`p-3 ${
              rowIndex % 2 !== 0 && "exact-virtualize-table-stripe-color"
            }`}
            style={{ ...style, borderBottom: "1px solid #f0f0f0" }}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    )
  }

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width)
      }}
    >
      <Table
        {...props}
        className="virtual-table exact-virtualize-table p-4"
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  )
} // Usage

export default ExactVirtualizeTable
