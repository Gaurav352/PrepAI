import React from 'react'

const Loading = () => {
  return (
    <div>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
    </div>
  )
}

export default Loading
