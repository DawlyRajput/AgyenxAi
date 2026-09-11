import React from 'react'
import { Code2, PanelRightClose } from 'lucide-react'
import { useSelector } from 'react-redux'

const Artifact = () => {
  const { artifacts } = useSelector(state => state.message)

  return (
    <div
      className='hidden lg:flex h-full border border-white/[0.06]
      flex-col overflow-hidden shrink-0 w-[250px]'
    >
      <div className='flex flex-col h-full bg-[#0d0f14]'>

        {/* Header */}
        <div
          className='h-14 px-4 border-b border-white/[0.06]
          flex items-center gap-3 shrink-0'
        >

          <button
            className='flex items-center justify-center
            w-7 h-7 rounded-lg text-slate-500
            hover:text-slate-400
            hover:bg-white/[0.05]
            transition-colors duration-150
            bg-transparent border-none cursor-pointer shrink-0'
          >
            <PanelRightClose size={16} />
          </button>

          <div className='flex items-center gap-2 flex-1 min-w-0'>

            <div>
              <Code2 size={18} />
            </div>

            <div className='truncate'>
              {artifacts[0]?.title}
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Artifact