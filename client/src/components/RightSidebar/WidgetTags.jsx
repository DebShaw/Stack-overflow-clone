import React from 'react'

const WidgetTags = () => {
    const tags=['c','css','express','firebase','html','java','javscript','mern','mongodb','mysql','next.js','node.js','php','pyhton','react.js']
  return (
    <div className='widget-tags'>
        <h4>Watched Tags</h4>
        <div className='widget-tags-div'>
            {
                tags.map((tag) => (
                    <p key={tag}>{tag}</p>
                ))
            }
        </div>
    </div>
  )
}

export default WidgetTags