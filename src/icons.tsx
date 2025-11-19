import React from 'react'

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string
}

const IconBase = ({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) => {
  const { width, height, ...other } = rest
  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...other}
    >
      {children}
    </svg>
  )
}

export const Search = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={11} cy={11} r={7} />
    <line x1={16.5} y1={16.5} x2={21} y2={21} />
  </IconBase>
)

export const PenTool = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5l4 4L9 19H5v-4z" />
    <circle cx={12} cy={12} r={1} />
  </IconBase>
)

export const User = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={12} cy={8} r={4} />
    <path d="M5 20c0-3.5 3.5-6 7-6s7 2.5 7 6" />
  </IconBase>
)

export const Menu = (props: IconProps) => (
  <IconBase {...props}>
    <line x1={3} y1={6} x2={21} y2={6} />
    <line x1={3} y1={12} x2={21} y2={12} />
    <line x1={3} y1={18} x2={21} y2={18} />
  </IconBase>
)

export const Flame = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-4 4-8 4-8z" />
    <path d="M12 22a6 6 0 0 1-6-6c0-2.5 1.5-4.5 3-6l3-4 3 4c1.5 1.5 3 3.5 3 6a6 6 0 0 1-6 6z" />
  </IconBase>
)

export const Shield = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 3l8 3v6c0 5.25-3.5 8.5-8 9-4.5-.5-8-3.75-8-9V6z" />
  </IconBase>
)

export const Heart = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M20.5 6.5a4.5 4.5 0 0 0-6.36 0L12 8.64 9.86 6.5a4.5 4.5 0 1 0-6.36 6.36L12 21.36l8.5-8.5a4.5 4.5 0 0 0 0-6.36z" />
  </IconBase>
)

export const MessageSquare = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M4 5h16v11H7l-3 3z" />
  </IconBase>
)

export const Share2 = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={6} cy={12} r={2} />
    <circle cx={18} cy={6} r={2} />
    <circle cx={18} cy={18} r={2} />
    <line x1={8} y1={11} x2={16} y2={7} />
    <line x1={8} y1={13} x2={16} y2={17} />
  </IconBase>
)

export const MoreHorizontal = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={6} cy={12} r={1.5} />
    <circle cx={12} cy={12} r={1.5} />
    <circle cx={18} cy={12} r={1.5} />
  </IconBase>
)

export const ThumbsUp = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M6 21V9H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
    <path d="M6 9l4-6 2 1v4h7a2 2 0 0 1 2 2l-1 5a3 3 0 0 1-3 3H6" />
  </IconBase>
)

export const ThumbsDown = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M18 3v12h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
    <path d="M18 15l-4 6-2-1v-4H5a2 2 0 0 1-2-2l1-5a3 3 0 0 1 3-3h11" />
  </IconBase>
)

export const X = (props: IconProps) => (
  <IconBase {...props}>
    <line x1={5} y1={5} x2={19} y2={19} />
    <line x1={19} y1={5} x2={5} y2={19} />
  </IconBase>
)

export const EyeOff = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M1 1l22 22" />
    <path d="M3 9s3.5-5 9-5 9 5 9 5-3.5 5-9 5c-5.5 0-9-5-9-5z" />
    <path d="M10.58 10.59A2 2 0 0 0 13.41 13.4" />
  </IconBase>
)
