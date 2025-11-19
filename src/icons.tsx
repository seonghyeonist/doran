import React from 'react'

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number
}

const IconBase = ({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    focusable="false"
    {...props}
  >
    {children}
  </svg>
)

export const MessageSquare = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </IconBase>
)

export const Heart = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M20.8 4.6c-1.4-1.5-3.8-1.5-5.2 0L12 8.2l-3.6-3.6c-1.4-1.5-3.8-1.5-5.2 0a4 4 0 0 0 0 5.5L12 21l8.8-10.9a4 4 0 0 0 0-5.5z" />
  </IconBase>
)

export const Share2 = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={18} cy={5} r={3} />
    <circle cx={6} cy={12} r={3} />
    <circle cx={18} cy={19} r={3} />
    <line x1={8.6} y1={13.5} x2={15.4} y2={17.5} />
    <line x1={15.4} y1={6.5} x2={8.6} y2={10.5} />
  </IconBase>
)

export const MoreHorizontal = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={6} cy={12} r={1} />
    <circle cx={12} cy={12} r={1} />
    <circle cx={18} cy={12} r={1} />
  </IconBase>
)

export const PenTool = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 19l7-7-5-5-7 7v5h5z" />
    <path d="M18 5l3 3" />
    <path d="M2 22h20" />
  </IconBase>
)

export const User = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={12} cy={7} r={4} />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </IconBase>
)

export const Flame = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 3c2 3 5 5.5 5 9.5S14.5 21 12 21 7 18.5 7 12.5 10 6 12 3z" />
  </IconBase>
)

export const Shield = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7z" />
  </IconBase>
)

export const Menu = (props: IconProps) => (
  <IconBase {...props}>
    <line x1={4} y1={6} x2={20} y2={6} />
    <line x1={4} y1={12} x2={20} y2={12} />
    <line x1={4} y1={18} x2={20} y2={18} />
  </IconBase>
)

export const X = (props: IconProps) => (
  <IconBase {...props}>
    <line x1={6} y1={6} x2={18} y2={18} />
    <line x1={6} y1={18} x2={18} y2={6} />
  </IconBase>
)

export const Search = (props: IconProps) => (
  <IconBase {...props}>
    <circle cx={11} cy={11} r={7} />
    <line x1={21} y1={21} x2={16.5} y2={16.5} />
  </IconBase>
)

export const ThumbsUp = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M7 10v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" />
    <path d="M7 10l4-7 2 1.5V10h6a2 2 0 0 1 2 2l-1 5a3 3 0 0 1-3 3H7" />
  </IconBase>
)

export const ThumbsDown = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M17 14V4h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z" />
    <path d="M17 14l-4 7-2-1.5V14H5a2 2 0 0 1-2-2l1-5a3 3 0 0 1 3-3h10" />
  </IconBase>
)

export const EyeOff = (props: IconProps) => (
  <IconBase {...props}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx={12} cy={12} r={3} />
    <line x1={3} y1={3} x2={21} y2={21} />
  </IconBase>
)
