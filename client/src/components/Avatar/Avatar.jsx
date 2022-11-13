import React from 'react'

const Avatar = ({children, backgroundColor, color, borderRadius, px, py, fontSize}) => {
  const style = {
      backgroundColor,
      color: color || "black",
      borderRadius,
      padding: `${py} ${px}`,
      cursor: 'pointer',
      fontSize,
      textAlign: "center",
      marginLeft: "20px"
  }
  return (
    <div style={style}>
        {children}
    </div>
  )
}

export default Avatar