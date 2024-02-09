import { DynamicTableProps } from '@/types'
import React from 'react'
import LottieAnimation from '../LottieAnimation'

const DynamicTable: React.FC<DynamicTableProps> = (props) => {
  const {
    data,
    headers,
    options,
    headersCSS,
    CustomRow,
    loading = true,
  } = props

  let fieldOrder: any = []
  if (!Array.isArray(!!headers && headers)) {
    fieldOrder = Object.keys(headers)
  } else {
    fieldOrder = headers
  }

  return (
    <div className='border border-pShadeTwo overflow-auto rounded-2xl [-ms-overflow-style:"none"] [scrollbar-width:"none"]'>
      {CustomRow && <CustomRow />}
      <table className="w-full">
        <thead className="bg-chipColor">
          <tr>
            {fieldOrder.map((e: any, inx: any) => {
              let title
              let css
              if (!Array.isArray(headers)) {
                if (!headers[e]) {
                  return null
                }
                if (typeof headers[e] === 'function') {
                  title = headers[e](data)
                } else {
                  title = headers[e]
                }
                css = headersCSS && headersCSS[e]
              }
              return (
                <th
                  key={inx}
                  className={`p-6 text-sm text-grey ${
                    CustomRow
                      ? !!data?.length
                        ? 'border-y'
                        : 'border-t'
                      : data?.length && 'border-b'
                  } font-medium text-left whitespace-nowrap ${css && css}`}
                >
                  {title}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="divide-y">
          {!!data &&
            !!data.length &&
            data.map((a, i) => {
              return (
                <tr key={i}>
                  {fieldOrder.map((e: any, inx: number) => {
                    let css
                    if (!Array.isArray(headers)) {
                      if (!headers[e]) {
                        return null
                      }
                    }
                    css = headersCSS && headersCSS[e]
                    let rVal = a[e]
                    if (
                      options &&
                      options.fieldFunctions &&
                      options.fieldFunctions[e] &&
                      typeof options.fieldFunctions[e] === 'function'
                    ) {
                      rVal = options.fieldFunctions[e](a, i)
                    } else if (rVal instanceof Object) {
                      rVal = (
                        <div style={{ color: 'black' }}>
                          {JSON.stringify(rVal, null, '\t')}
                        </div>
                      )
                    } else {
                      rVal = rVal
                    }
                    return (
                      <td
                        className={`p-6 text-sm table-cell text-left whitespace-nowrap   ${css}`}
                        key={inx}
                      >
                        {rVal}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      {
       !data.length && !!loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] w-full">
            <LottieAnimation />
          </div>
        ) : !data.length ? (
          <div className="flex flex-col items-center justify-center h-[500px] w-full">
            <div>No Data</div>
          </div> 
        ) : null
      }
    </div>
  )
}

export default DynamicTable
