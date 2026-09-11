
// import Markdown from 'react-markdown'
// import { useState } from 'react'
// import { ExternalLink, X } from 'lucide-react'
// import remarkGfm from 'remark-gfm'


// function MessageBubble({role, content, images}) {

//   const isUser=role==="user"
//   const [lightBox, setLightBox] =useState(null)

   

//   return (
//     <div className={`flex  ${isUser?"justify-end":"justify-start"}`}>
//       <div className={` w-fit max-w-[92vw] md:max-w-[72%]
//           px-4 py-2.5 rounded-2xl break-words overflow-hidden leading-relaxed        ${
//           isUser?
//           "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm":
//           " text-slate-200 rounded-tl-sm"
//         }`}>

//           {
//             images.length>0 && (
//               <div className='flex flex-wrap gap-3 mt-4'>
//                 {images.map((img, i)=>(
//                   <img
//                   key={i}
//                   src={img}
//                   onClick={()=>setLightBox(img)}
//                   loading="lazy"
//                   onError={(e)=>e.currentTarget.remove()}
//                   className='w-40 h-28 rounded-xl object-cover border-white/10 cursor-zoom-in
//                   hover:opacity-90 transition'
//                   />
//                 ))}
//                 </div>
//             )
//           }
//           <Markdown remarkPlugins={[remarkGfm]}>

//             components= {
//               {
//                 h1:({children})=>(
//                   <h1 className='text-2xl font-bold mt-5 mb-3'>
//                    {children}
//                   </h1>
//                 ),
//                  h2:({children})=>(
//                   <h2 className='text-xl font-semibold mt-4 mb-2'>
//                    {children}
//                   </h2>
//                 ),
//                  h3:({children})=>(
//                   <h3 className='text-2xl font-bold mt-5 mb-3'>
//                    {children}
//                   </h3>
//                 ),
//                   p:({children})=>(
//                   <p className='whitespace-pre-wrap break-words mb-3'>
//                    {children}
//                   </p>
//                 ),
//                   ul:({children})=>(
//                   <ul className='list-disc pl-5 space-y-1 my-2'>
//                    {children}
//                   </ul>
//                 ),
//                    ol:({children})=>(
//                   <ol className='list-decimal pl-5 space-y-1 my-2'>
//                    {children}
//                   </ol>
//                 ),
//                    table:({children})=>(
//                   <div className='overflow-x-auto my-4'>
//                     <table className='min-w-full border border-white/10'>
//                        {children}
//                     </table>


//                   </div>
//                 ),
//                  th:({children})=>(
              
//                     <th className='border border-white/10 px-3 py-2 text-left'>
//                        {children}
//                     </th>
//                 ),
//                   td:({children})=>(
              
//                     <td className='border border-white/10 px-3 py-2'>
//                        {children}
//                     </td>
//                 ),
//                 a:({href, children})=>(
              
//                     <a
//                      href={href}
//                      target="_blank"
//                      rel="noreferrer"
//                      className='text-indigo-400 underline inline-flex items-center gap-1'
//                      >
//                       {children}
//                       <ExternalLink size={14}/>

//                     </a>
//                 ),
              
//               }
//             }
//            {content}
//           </Markdown>
       

//       </div>
//       {lightBox && 
//       <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6'>
//         <button
//         className='absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 rounded-full p-2'
//         onClick={()=>(setLightBox(null))}>
//           <X/>
//         </button>
//         <img 
//         src={lightBox}
//         className='max-w-[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain'
//         />
//         </div>

//       }
//     </div>
//   )
// }

// export default MessageBubble

import Markdown from 'react-markdown'
import { useState } from 'react'
import { ExternalLink, X } from 'lucide-react'
import remarkGfm from 'remark-gfm'
import { Check, Copy } from 'lucide-react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'


function MessageBubble({role, content, images}) {
  const isUser=role==="user"
  const [lightBox, setLightBox] =useState(null)

  // Filter out any empty strings, nulls, or undefined elements
  const validImages = Array.isArray(images) ? images.filter(Boolean) : []

  return (
    <div className={`flex ${isUser?"justify-end":"justify-start"}`}>
      <div className={` w-fit max-w-[92vw] md:max-w-[72%] px-4 py-2.5 rounded-2xl break-words overflow-hidden leading-relaxed ${ isUser? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm": " text-slate-200 rounded-tl-sm" }`}>
        { validImages.length > 0 && (
          <div className='flex flex-wrap gap-3 mt-4'>
            {validImages.map((img, i)=>{
              return <img key={i} src={img} onClick={()=>setLightBox(img)} loading="lazy" onError={(e)=>e.currentTarget.remove()} className='w-40 h-28 rounded-xl object-cover border-white/10 cursor-zoom-in hover:opacity-90 transition' />
            })}
          </div>
        ) }
        <Markdown 
          remarkPlugins={[remarkGfm]}
          components={ {
            h1:({children})=>( <h1 className='text-2xl font-bold mt-5 mb-3'> {children} </h1> ),
            h2:({children})=>( <h2 className='text-xl font-semibold mt-4 mb-2'> {children} </h2> ),
            h3:({children})=>( <h3 className='text-2xl font-bold mt-5 mb-3'> {children} </h3> ),
            p:({children})=>( <p className='whitespace-pre-wrap break-words mb-3'> {children} </p> ),
            ul:({children})=>( <ul className='list-disc pl-5 space-y-1 my-2'> {children} </ul> ),
            ol:({children})=>( <ol className='list-decimal pl-5 space-y-1 my-2'> {children} </ol> ),
            table:({children})=>(
              <div className='overflow-x-auto my-4'>
                <table className='min-w-full border border-white/10'> {children} </table>
              </div>
            ),
            th:({children})=>( <th className='border border-white/10 px-3 py-2 text-left'> {children} </th> ),
            td:({children})=>( <td className='border border-white/10 px-3 py-2'> {children} </td> ),
            a:({href, children})=>(
              <a href={href} target="_blank" rel="noreferrer" className='text-indigo-400 underline inline-flex items-center gap-1' >
                {children} <ExternalLink size={14}/>
              </a>
            ),
            // Custom handler for inline markdown images to open in lightbox as well
            img:({src, alt})=>(
              <img src={src} alt={alt} onClick={()=>setLightBox(src)} loading="lazy" className='max-w-full h-auto rounded-xl border border-white/10 cursor-zoom-in my-2 hover:opacity-90 transition inline-block' />
            ),
    code: ({ className, children }) => {
  const [copied, setCopied] = useState(false)
  const value = String(children).trim()
  const language = className ? className.replace("language-", "") : "text"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset icon state after 2 seconds
    } catch (err) {
      console.error("Failed to copy code: ", err)
    }
  }

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-white/10 bg-slate-950/40 text-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-slate-900/60 select-none">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        PreTag="div"
        customStyle={{
          margin: 0,
          background: 'transparent',
          padding: '1rem',
          overflowX: 'auto',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

          } }
        >
          {content}
        </Markdown>
      </div>
      {lightBox && (
        <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6' onClick={()=>(setLightBox(null))}>
          <button className='absolute top-5 right-5 text-white/80 hover:text-white bg-white/10 rounded-full p-2' onClick={()=>(setLightBox(null))}>
            <X/>
          </button>
          {/* stopPropagation prevents closing the lightbox when clicking the image itself */}
          <img src={lightBox} onClick={(e)=>e.stopPropagation()} className='max-w-[90vw] max-h-[85vh] rounded-2xl border border-white/10 shadow-2xl object-contain' />
        </div>
      )}
    </div>
  )
}

export default MessageBubble
