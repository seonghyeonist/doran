import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Flame,
  Heart,
  Menu,
  MessageSquare,
  MoreHorizontal,
  PenTool,
  Search,
  Share2,
  Shield,
  ThumbsDown,
  ThumbsUp,
  User,
  X,
  EyeOff,
} from './icons'

interface UserProfile {
  id: string
  nickname: string
  rank: string
  points: number
  reputation: string
  avatarColor: string
}

interface Topic {
  id: string
  name: string
}

interface Post {
  id: string
  author: string
  isAnonymous: boolean
  topic: string
  title: string
  content: string
  timestamp: string
  empathyCount: number
  upvotes: number
  downvotes: number
  commentCount: number
  hasEmpathized: boolean
}

interface NotificationState {
  message: string
  type: 'purple' | 'success'
}

interface Comment {
  id: string
  author: string
  isAnonymous: boolean
  content: string
  timestamp: string
  resonates: number
}

const MOCK_USER: UserProfile = {
  id: 'u1',
  nickname: '진리를찾는자',
  rank: '청년기 (Youth)',
  points: 1250,
  reputation: '신뢰할 수 있는 시민',
  avatarColor: 'bg-indigo-500',
}

const TOPICS: Topic[] = [
  { id: 'all', name: '전체 마당' },
  { id: 'philosophy', name: '철학/정치' },
  { id: 'humor', name: '유머/풍자' },
  { id: 'writing', name: '창작/에세이' },
]

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: '익명의 사색가',
    isAnonymous: true,
    topic: 'philosophy',
    title: '알고리즘이 우리의 자유 의지를 침해하는가?',
    content:
      '우리가 보는 콘텐츠가 90% 이상 추천 알고리즘에 의해 결정된다면, 우리의 생각은 과연 우리의 것일까요? 도란(Doran)이 추구하는 "보이지 않는 손"의 제거가 필요한 시점입니다.',
    timestamp: '방금 전',
    empathyCount: 42,
    upvotes: 15,
    downvotes: 2,
    commentCount: 2,
    hasEmpathized: false,
  },
  {
    id: 'p2',
    author: '웃음사냥꾼',
    isAnonymous: false,
    topic: 'humor',
    title: '오늘자 회사 부장님 레전드 ㅋㅋ',
    content:
      '회의 시간에 "MZ세대는 메타버스에서 회식하나?" 라고 진지하게 물어보심. 근데 아무도 대답 못함... 다들 줌(Zoom)으로 삼겹살 굽는 상상함.',
    timestamp: '1시간 전',
    empathyCount: 5,
    upvotes: 120,
    downvotes: 0,
    commentCount: 1,
    hasEmpathized: false,
  },
  {
    id: 'p3',
    author: '시민123',
    isAnonymous: false,
    topic: 'writing',
    title: '새벽 2시의 편의점',
    content:
      '도시의 불빛이 모두 꺼져갈 때, 유일하게 깨어있는 등대 같은 곳. 그곳에서 만난 사람들의 표정에는 저마다의 소설이 있다. 컵라면을 먹는 수험생, 퇴근하는 간호사, 그리고 나.',
    timestamp: '3시간 전',
    empathyCount: 89,
    upvotes: 30,
    downvotes: 1,
    commentCount: 3,
    hasEmpathized: true,
  },
]

const EMPATHY_KEYWORDS = [
  { word: '알고리즘 윤리', score: 95 },
  { word: '익명성의 가치', score: 80 },
  { word: '현대인의 고독', score: 75 },
  { word: '디지털 민주주의', score: 60 },
  { word: '직장 생활', score: 45 },
]

const INITIAL_COMMENTS: Record<string, Comment[]> = {
  p1: [
    {
      id: 'c1',
      author: '철학하는고양이',
      isAnonymous: false,
      content: '알고리즘이 아니라 우리가 편한 길만 찾는 게 문제일 수도 있죠.',
      timestamp: '3분 전',
      resonates: 4,
    },
    {
      id: 'c2',
      author: '익명',
      isAnonymous: true,
      content: '그래도 도란처럼 투명한 추천 시스템이 필요하다는 데 동의합니다.',
      timestamp: '1분 전',
      resonates: 7,
    },
  ],
  p2: [
    {
      id: 'c3',
      author: '익명',
      isAnonymous: true,
      content: '부장님들 밈 공부 강제해야 함 ㅋㅋ',
      timestamp: '20분 전',
      resonates: 2,
    },
  ],
  p3: [
    {
      id: 'c4',
      author: '밤산책러',
      isAnonymous: false,
      content: '새벽 편의점 알바 중인데, 진짜 공감됩니다.',
      timestamp: '1시간 전',
      resonates: 10,
    },
  ],
}

const Notification = ({ notification }: { notification: NotificationState | null }) => {
  if (!notification) return null

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-xl z-[110] text-white font-medium flex items-center gap-2 transition-all duration-300 animate-in fade-in slide-in-from-top-5 ${
        notification.type === 'purple' ? 'bg-purple-600' : 'bg-slate-800'
      }`}
    >
      {notification.type === 'purple' && (
        <Heart size={18} className="fill-current text-white" />
      )}
      {notification.message}
    </div>
  )
}

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  setIsWriteModalOpen: (value: boolean) => void
  user: UserProfile
}

const Header = ({ activeTab, setActiveTab, setIsWriteModalOpen, user }: HeaderProps) => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
    <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <button
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setActiveTab('all')}
      >
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
          <span className="text-white font-bold text-lg">D</span>
        </div>
        <span className="text-xl font-bold text-slate-900 hidden sm:block tracking-tight">
          Doran
        </span>
      </button>

      <div className="hidden md:flex items-center flex-1 max-w-md mx-8 bg-slate-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
        <Search size={18} className="text-slate-400 mr-2" />
        <input
          type="text"
          placeholder="주제, 태그, 혹은 가치를 검색하세요..."
          className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md shadow-indigo-200 hover:shadow-indigo-300 active:scale-95"
        >
          <PenTool size={16} />
          <span className="hidden sm:inline">글쓰기</span>
        </button>

        <div className="relative group">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all">
            <User size={20} className="text-slate-600" />
          </div>
          <div className="absolute right-0 top-12 w-72 bg-white shadow-xl rounded-xl p-4 hidden group-hover:block border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-bold shadow-sm`}
              >
                {user.nickname[0]}
              </div>
              <div>
                <p className="font-bold text-slate-800">{user.nickname}</p>
                <p className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1">{user.rank}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm bg-slate-50 p-3 rounded-lg">
              <div className="flex justify-between text-slate-600">
                <span>보유 포인트</span>
                <span className="font-bold text-indigo-600">
                  {user.points.toLocaleString()} P
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>평판 등급</span>
                <span className="text-slate-800 font-medium">{user.reputation}</span>
              </div>
            </div>
            <div className="pt-3 mt-1">
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <EyeOff size={12} /> 팔로워 수는 공개되지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
)

const Sidebar = () => (
  <aside className="hidden lg:block w-80 space-y-6 sticky top-24 h-fit">
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-rose-500 fill-rose-500" size={20} />
        <h3 className="font-bold text-slate-800">실시간 공감 히트맵</h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        지금 마당에서 가장 큰 울림을 주는 주제들입니다.
      </p>
      <div className="flex flex-wrap gap-2">
        {EMPATHY_KEYWORDS.map((item, idx) => (
          <div
            key={item.word}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all hover:scale-105 active:scale-95 ${
              idx === 0
                ? 'bg-indigo-100 text-indigo-700 text-base border border-indigo-200'
                : idx === 1
                ? 'bg-purple-50 text-purple-700 border border-purple-100'
                : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100'
            }`}
          >
            #{item.word}
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <Shield className="text-indigo-400" size={20} />
        <h3 className="font-bold">도란 헌장</h3>
      </div>
      <ul className="text-sm text-slate-300 space-y-3 list-disc pl-4 relative z-10">
        <li>알고리즘은 투명해야 합니다.</li>
        <li>단순한 '좋아요'보다 '공감'을 지향합니다.</li>
        <li>모든 목소리는 동등하게 존중받습니다.</li>
      </ul>
    </div>

    <div className="text-xs text-slate-400 px-2 leading-relaxed">
      © 2025 Doran, Dorania & I-Guild Project.
      <br />
      Decentralized Digital Republic.
    </div>
  </aside>
)

interface PostCardProps {
  post: Post
  onEmpathy: (postId: string) => void
  onVote: (postId: string, type: 'up' | 'down') => void
  onOpenDetail: (post: Post) => void
}

const PostCard = ({ post, onEmpathy, onVote, onOpenDetail }: PostCardProps) => {
  const topic = useMemo(() => TOPICS.find((t) => t.id === post.topic), [post.topic])

  return (
    <article className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-inner ${
              post.isAnonymous
                ? 'bg-slate-100 text-slate-400'
                : 'bg-indigo-100 text-indigo-600'
            }`}
          >
            {post.isAnonymous ? '?' : post.author[0]}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-800 text-sm md:text-base">
                {post.author}
              </span>
              {post.isAnonymous && (
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                  익명
                </span>
              )}
              <span className="text-xs text-slate-400">• {post.timestamp}</span>
            </div>
            {topic && (
              <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                {topic.name}
              </span>
            )}
          </div>
        </div>
        <button
          className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="more options"
          type="button"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div
        onClick={() => onOpenDetail(post)}
        className="text-left w-full cursor-pointer block"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-700 transition-colors">
          {post.title}
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4 whitespace-pre-wrap line-clamp-3">
          {post.content}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEmpathy(post.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium group/btn active:scale-95 ${
              post.hasEmpathized
                ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200'
                : 'bg-slate-50 text-slate-600 hover:bg-purple-50 hover:text-purple-600'
            }`}
            title="깊은 울림을 느낄 때 사용하는 공감 신호입니다."
            type="button"
          >
            <Heart
              size={18}
              className={`transition-transform duration-300 ${post.hasEmpathized ? 'fill-purple-700 scale-110' : 'group-hover/btn:scale-110'}`}
            />
            <span className="text-sm">공감 {post.empathyCount}</span>
          </button>

          <div className="flex items-center bg-slate-50 rounded-full border border-slate-100">
            <button
              onClick={() => onVote(post.id, 'up')}
              className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-l-full transition-colors"
              type="button"
            >
              <ThumbsUp size={16} />
            </button>
            <span className="text-xs font-medium text-slate-500 px-1 min-w-[1.5rem] text-center">
              {post.upvotes}
            </span>
            <div className="w-px h-3 bg-slate-200" />
            <button
              onClick={() => onVote(post.id, 'down')}
              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-r-full transition-colors"
              type="button"
            >
              <ThumbsDown size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <button
            className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors text-sm group/comment"
            onClick={() => onOpenDetail(post)}
            type="button"
          >
            <MessageSquare size={18} className="group-hover/comment:fill-indigo-100" />
            <span>{post.commentCount}</span>
          </button>
          <button
            className="hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
            type="button"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}

interface WriteModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { title: string; content: string; topic: string; isAnonymous: boolean }) => void
  user: UserProfile
}

const WriteModal = ({ isOpen, onClose, onSubmit, user }: WriteModalProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topic, setTopic] = useState('philosophy')
  const [isAnonymous, setIsAnonymous] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return
    onSubmit({ title: title.trim(), content: content.trim(), topic, isAnonymous })
    setTitle('')
    setContent('')
    setTopic('philosophy')
    setIsAnonymous(false)
    onClose()
  }

  const availableTopics = TOPICS.filter((t) => t.id !== 'all')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <PenTool size={20} className="text-indigo-500" />
            새로운 이야기 시작하기
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            >
              {availableTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

            <label className="flex items-center gap-2 cursor-pointer select-none bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 hover:bg-slate-100 transition-colors">
              <span className="text-sm text-slate-600 mr-1">
                {isAnonymous ? '익명 사용 중' : `${user.nickname}(으)로 작성`}
              </span>
              <button
                type="button"
                onClick={() => setIsAnonymous((prev) => !prev)}
                className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out relative ${
                  isAnonymous ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full block shadow-sm transform transition-transform duration-200 absolute top-1 ${
                    isAnonymous ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </label>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-bold placeholder:text-slate-300 border-b border-slate-100 pb-2 focus:border-indigo-500 focus:outline-none transition-colors"
            />

            <textarea
              placeholder="당신의 생각을 자유롭게 펼쳐주세요. (마크다운 지원 예정)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-64 resize-none text-slate-700 placeholder:text-slate-300 border-none focus:outline-none p-0 leading-relaxed"
            />
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-lg transition-colors"
            type="button"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all active:scale-95"
            type="button"
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  )
}

const CommentItem = ({ comment, onResonate }: { comment: Comment; onResonate: (commentId: string) => void }) => {
  const [pressed, setPressed] = useState(false)
  const [count, setCount] = useState(comment.resonates)

  const handleClick = () => {
    if (!pressed) {
      setPressed(true)
      setCount((prev) => prev + 1)
      onResonate(comment.id)
    }
  }

  return (
    <div className="flex gap-3 py-4 group">
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-medium flex-shrink-0 mt-1">
        {comment.isAnonymous ? '?' : comment.author[0]}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span className="font-bold text-slate-700">
            {comment.author}
          </span>
          {comment.isAnonymous && (
            <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px]">
              익명
            </span>
          )}
          <span>• {comment.timestamp}</span>
        </div>
        <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
          {comment.content}
        </p>
        <button
          type="button"
          onClick={handleClick}
          className={`mt-2 inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full transition-colors ${
            pressed
              ? 'text-purple-600 bg-purple-50'
              : 'text-slate-400 hover:text-purple-500 hover:bg-slate-50'
          }`}
        >
          <Heart size={12} className={pressed ? 'fill-purple-600' : ''} />
          <span>공명 {count}</span>
        </button>
      </div>
    </div>
  )
}

interface PostDetailModalProps {
  post: Post | null
  comments: Comment[]
  onClose: () => void
  onAddComment: (postId: string, content: string, isAnonymous: boolean) => void
  onResonateComment: (commentId: string) => void
}

const PostDetailModal = ({
  post,
  comments,
  onClose,
  onAddComment,
  onResonateComment,
}: PostDetailModalProps) => {
  const [commentText, setCommentText] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCommentText('')
    setIsAnonymous(true)
  }, [post])

  if (!post) return null

  const handleSubmit = () => {
    if (!commentText.trim()) return
    onAddComment(post.id, commentText.trim(), isAnonymous)
    setCommentText('')
    setIsAnonymous(true)
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, 100)
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-2xl z-20">
          <h2 className="font-bold text-lg text-slate-800 truncate pr-8">
            {post.title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
            type="button"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar" ref={scrollRef}>
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-sm ${
                  post.isAnonymous
                    ? 'bg-slate-100 text-slate-500'
                    : 'bg-indigo-100 text-indigo-600'
                }`}
              >
                {post.isAnonymous ? '?' : post.author[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 text-lg">
                    {post.author}
                  </span>
                  {post.isAnonymous && (
                    <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                      익명
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  {post.timestamp} • {TOPICS.find((t) => t.id === post.topic)?.name}
                </span>
              </div>
            </div>
            <p className="text-slate-800 whitespace-pre-wrap leading-loose text-base">
              {post.content}
            </p>
          </section>

          <section className="border-t border-slate-100 pt-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-500" />
              댓글 <span className="text-indigo-600">{comments.length}</span>
            </h3>
            <div className="space-y-1 divide-y divide-slate-50">
              {comments.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  onResonate={onResonateComment}
                />
              ))}
              {comments.length === 0 && (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                  <p className="text-sm text-slate-400">
                    아직 달린 댓글이 없습니다.<br />첫 번째 의견을 남겨보세요.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="border-t border-slate-100 p-4 bg-slate-50/50 rounded-b-2xl backdrop-blur-sm">
          <div className="flex flex-col gap-3">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="이 글이 당신에게 어떤 생각을 불러일으켰나요?"
              className="w-full h-20 resize-none text-sm text-slate-800 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition-shadow"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none hover:bg-slate-100 px-2 py-1 rounded-full transition-colors">
                <button
                  type="button"
                  onClick={() => setIsAnonymous((prev) => !prev)}
                  className={`w-8 h-5 rounded-full p-0.5 transition-colors relative ${
                    isAnonymous ? 'bg-slate-700' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`bg-white w-3.5 h-3.5 rounded-full block shadow-sm transform transition-transform absolute top-0.5 ${
                      isAnonymous ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </button>
                <span>{isAnonymous ? '익명 댓글' : '닉네임 공개'}</span>
              </label>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!commentText.trim()}
                className="px-4 py-2 text-sm font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md shadow-indigo-100"
              >
                댓글 등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BottomNav = ({
  onOpenWrite,
  onScrollToTop,
  onOpenProfile,
}: {
  onOpenWrite: () => void
  onScrollToTop: () => void
  onOpenProfile: () => void
}) => (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 px-6 py-3 flex justify-between items-center z-40 pb-safe-area">
    <button
      className="flex flex-col items-center text-slate-900 gap-1 active:scale-90 transition-transform"
      onClick={onScrollToTop}
      type="button"
    >
      <Menu size={24} />
      <span className="text-[10px] font-medium">마당</span>
    </button>
    <button
      className="flex flex-col items-center text-slate-400 gap-1 active:scale-90 transition-transform hover:text-indigo-600"
      onClick={onOpenWrite}
      type="button"
    >
      <PenTool size={24} />
      <span className="text-[10px] font-medium">글쓰기</span>
    </button>
    <button
      className="flex flex-col items-center text-slate-400 gap-1 active:scale-90 transition-transform hover:text-indigo-600"
      onClick={onOpenProfile}
      type="button"
    >
      <User size={24} />
      <span className="text-[10px] font-medium">내 정보</span>
    </button>
  </div>
)

export default function DoranApp() {
  const [activeTab, setActiveTab] = useState('all')
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [notification, setNotification] = useState<NotificationState | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>(INITIAL_COMMENTS)

  const notificationTimeoutRef = useRef<number | null>(null)

  const showNotification = (message: string, type: NotificationState['type'] = 'success') => {
    setNotification({ message, type })
    if (notificationTimeoutRef.current) {
      window.clearTimeout(notificationTimeoutRef.current)
    }
    notificationTimeoutRef.current = window.setTimeout(() => {
      setNotification(null)
      notificationTimeoutRef.current = null
    }, 3000)
  }

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        window.clearTimeout(notificationTimeoutRef.current)
      }
    }
  }, [])

  const handleEmpathy = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newStatus = !post.hasEmpathized
          if (newStatus) {
            showNotification('이 글에 깊이 공감했습니다!', 'purple')
          }
          return {
            ...post,
            empathyCount: post.empathyCount + (newStatus ? 1 : -1),
            hasEmpathized: newStatus,
          }
        }
        return post
      })
    )
  }

  const handleVote = (postId: string, type: 'up' | 'down') => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          if (type === 'up') {
            return { ...post, upvotes: post.upvotes + 1 }
          }
          return { ...post, downvotes: post.downvotes + 1 }
        }
        return post
      })
    )
  }

  const handlePostSubmit = ({ title, content, topic, isAnonymous }: { title: string; content: string; topic: string; isAnonymous: boolean }) => {
    const newId = `p-${Date.now()}`
    const newPost: Post = {
      id: newId,
      author: isAnonymous ? '익명' : MOCK_USER.nickname,
      isAnonymous,
      topic,
      title,
      content,
      timestamp: '방금 전',
      empathyCount: 0,
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      hasEmpathized: false,
    }
    setPosts((prev) => [newPost, ...prev])
    setCommentsByPost((prev) => ({ ...prev, [newId]: [] }))
    showNotification('새로운 이야기가 마당에 공유되었습니다.')
  }

  const handleAddComment = (postId: string, content: string, isAnonymous: boolean) => {
    setCommentsByPost((prev) => {
      const existing = prev[postId] ?? []
      const newComment: Comment = {
        id: `c-${Date.now()}`,
        author: isAnonymous ? '익명' : MOCK_USER.nickname,
        isAnonymous,
        content,
        timestamp: '방금 전',
        resonates: 0,
      }
      return {
        ...prev,
        [postId]: [...existing, newComment],
      }
    })
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p
      )
    )
    showNotification('댓글이 등록되었습니다.', 'success')
  }

  const handleResonateComment = (commentId: string) => {
    setCommentsByPost((prev) => {
      const updated: Record<string, Comment[]> = {}
      for (const [postId, comments] of Object.entries(prev)) {
        updated[postId] = comments.map((c) =>
          c.id === commentId ? { ...c, resonates: c.resonates + 1 } : c
        )
      }
      return updated
    })
  }

  const filteredPosts = activeTab === 'all' ? posts : posts.filter((p) => p.topic === activeTab)

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenProfileFromMobile = () => {
    showNotification('프로필 요약: 1250 포인트 보유 중')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-slate-900">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>

      <Notification notification={notification} />

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsWriteModalOpen={setIsWriteModalOpen}
        user={MOCK_USER}
      />

      <main className="max-w-5xl mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    activeTab === topic.id
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-200 transform scale-105'
                      : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
                  }`}
                  type="button"
                >
                  {topic.name}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed animate-in fade-in">
                  <p className="text-slate-400 mb-4">
                    아직 이 마당에 올라온 이야기가 없습니다.
                  </p>
                  <button
                    onClick={() => setIsWriteModalOpen(true)}
                    className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-2 mx-auto"
                    type="button"
                  >
                    <PenTool size={16} />
                    첫 번째 이야기를 들려주세요
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onEmpathy={handleEmpathy}
                      onVote={handleVote}
                      onOpenDetail={setSelectedPost}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <Sidebar />
        </div>
      </main>

      <WriteModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onSubmit={handlePostSubmit}
        user={MOCK_USER}
      />

      <PostDetailModal
        post={selectedPost}
        comments={selectedPost ? commentsByPost[selectedPost.id] ?? [] : []}
        onClose={() => setSelectedPost(null)}
        onAddComment={handleAddComment}
        onResonateComment={handleResonateComment}
      />

      <BottomNav
        onOpenWrite={() => setIsWriteModalOpen(true)}
        onScrollToTop={handleScrollToTop}
        onOpenProfile={handleOpenProfileFromMobile}
      />
    </div>
  )
}
