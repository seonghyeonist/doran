import React, { useState } from 'react'
import {
  EyeOff,
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
  id: number
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
  type: 'success' | 'purple'
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
    id: 1,
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
    commentCount: 8,
    hasEmpathized: false,
  },
  {
    id: 2,
    author: '웃음사냥꾼',
    isAnonymous: false,
    topic: 'humor',
    title: '오늘자 회사 부장님 레전드 ㅋㅋ',
    content:
      '회의 시간에 "MZ세대는 메타버스에서 회식하나?" 라고 진지하게 물어보심. 근데 아무도 대답 못함...',
    timestamp: '1시간 전',
    empathyCount: 5,
    upvotes: 120,
    downvotes: 0,
    commentCount: 32,
    hasEmpathized: false,
  },
  {
    id: 3,
    author: '시민123',
    isAnonymous: false,
    topic: 'writing',
    title: '새벽 2시의 편의점',
    content:
      '도시의 불빛이 모두 꺼져갈 때, 유일하게 깨어있는 등대 같은 곳. 그곳에서 만난 사람들의 표정에는 저마다의 소설이 있다.',
    timestamp: '3시간 전',
    empathyCount: 89,
    upvotes: 30,
    downvotes: 1,
    commentCount: 12,
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

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  setIsWriteModalOpen: (value: boolean) => void
  user: UserProfile
}

const Header = ({ activeTab, setActiveTab, setIsWriteModalOpen, user }: HeaderProps) => (
  <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
    <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('all')}>
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
        <span className="text-xl font-bold text-slate-900 hidden sm:block">Doran</span>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-md mx-8 bg-slate-100 rounded-full px-4 py-2">
        <Search size={18} className="text-slate-400 mr-2" />
        <input
          type="text"
          placeholder="주제, 태그, 혹은 가치를 검색하세요..."
          className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          <PenTool size={16} />
          <span className="hidden sm:inline">글쓰기</span>
        </button>

        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all relative group">
          <User size={20} className="text-slate-600" />
          <div className="absolute right-0 top-12 w-64 bg-white shadow-xl rounded-xl p-4 hidden group-hover:block border border-slate-100 z-50">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-bold`}>
                {user.nickname[0]}
              </div>
              <div>
                <p className="font-bold text-slate-800">{user.nickname}</p>
                <p className="text-xs text-slate-500">{user.rank}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>보유 포인트</span>
                <span className="font-bold text-indigo-600">{user.points} P</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>평판 등급</span>
                <span className="text-slate-800">{user.reputation}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 mt-2">
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <EyeOff size={12} /> 팔로워 수는 공개되지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
)

const Sidebar = () => (
  <aside className="hidden lg:block w-80 space-y-6">
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-rose-500" size={20} />
        <h3 className="font-bold text-slate-800">실시간 공감 히트맵</h3>
      </div>
      <p className="text-xs text-slate-500 mb-4">지금 마당에서 가장 큰 울림을 주는 주제들입니다.</p>
      <div className="flex flex-wrap gap-2">
        {EMPATHY_KEYWORDS.map((item, idx) => (
          <div
            key={item.word}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all hover:scale-105 ${
              idx === 0
                ? 'bg-indigo-100 text-indigo-700 text-base border border-indigo-200'
                : idx === 1
                ? 'bg-purple-50 text-purple-700 border border-purple-100'
                : 'bg-slate-50 text-slate-600 border border-slate-100'
            }`}
          >
            #{item.word}
          </div>
        ))}
      </div>
    </div>

    <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="text-indigo-400" size={20} />
        <h3 className="font-bold">도란 헌장</h3>
      </div>
      <ul className="text-sm text-slate-300 space-y-3 list-disc pl-4">
        <li>알고리즘은 투명해야 합니다.</li>
        <li>단순한 '좋아요'보다 '공감'을 지향합니다.</li>
        <li>모든 목소리는 동등하게 존중받습니다.</li>
      </ul>
    </div>

    <div className="text-xs text-slate-400 px-2">
      © 2025 Doran, Dorania & I-Guild Project.
      <br />
      Decentralized Digital Republic.
    </div>
  </aside>
)

interface PostCardProps {
  post: Post
  onEmpathy: (id: number) => void
  onVote: (id: number, direction: 'up' | 'down') => void
}

const PostCard = ({ post, onEmpathy, onVote }: PostCardProps) => (
  <article className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
            post.isAnonymous ? 'bg-slate-200 text-slate-500' : 'bg-indigo-100 text-indigo-600'
          }`}
        >
          {post.isAnonymous ? '?' : post.author[0]}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-sm md:text-base">{post.author}</span>
            {post.isAnonymous && <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">익명</span>}
            <span className="text-xs text-slate-400">• {post.timestamp}</span>
          </div>
          <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded-full mt-1 inline-block">
            {TOPICS.find((t) => t.id === post.topic)?.name}
          </span>
        </div>
      </div>
      <button className="text-slate-400 hover:text-slate-600" aria-label="more options">
        <MoreHorizontal size={20} />
      </button>
    </div>

    <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{post.title}</h2>
    <p className="text-slate-600 leading-relaxed mb-4 whitespace-pre-wrap line-clamp-3 cursor-pointer">
      {post.content}
    </p>

    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onEmpathy(post.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${
            post.hasEmpathized ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200' : 'bg-slate-50 text-slate-600 hover:bg-purple-50 hover:text-purple-600'
          }`}
        >
          <Heart size={18} className={post.hasEmpathized ? 'fill-purple-700' : undefined} />
          <span>공감 {post.empathyCount}</span>
        </button>

        <div className="flex items-center bg-slate-50 rounded-full ml-2 border border-slate-100">
          <button onClick={() => onVote(post.id, 'up')} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors" aria-label="up vote">
            <ThumbsUp size={16} />
          </button>
          <span className="text-xs font-medium text-slate-500 px-1">{post.upvotes}</span>
          <div className="w-px h-4 bg-slate-200" />
          <button onClick={() => onVote(post.id, 'down')} className="p-2 text-slate-400 hover:text-rose-500 transition-colors" aria-label="down vote">
            <ThumbsDown size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-slate-400">
        <button className="flex items-center gap-1.5 hover:text-slate-600 transition-colors text-sm">
          <MessageSquare size={18} />
          <span>{post.commentCount}</span>
        </button>
        <button className="hover:text-slate-600 transition-colors" aria-label="share post">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  </article>
)

interface WriteModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (payload: { title: string; content: string; topic: string; isAnonymous: boolean }) => void
  topics: Topic[]
  user: UserProfile
}

const WriteModal = ({ isOpen, onClose, onSubmit, topics, user }: WriteModalProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [topic, setTopic] = useState('philosophy')
  const [isAnonymous, setIsAnonymous] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    onSubmit({ title, content, topic, isAnonymous })
    setTitle('')
    setContent('')
    setTopic('philosophy')
    setIsAnonymous(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">새로운 이야기 시작하기</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="close modal">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {topics
                .filter((t) => t.id !== 'all')
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
            </select>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <button
                type="button"
                onClick={() => setIsAnonymous((prev) => !prev)}
                className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isAnonymous ? 'bg-slate-700' : 'bg-slate-200'}`}
              >
                <span className={`bg-white w-4 h-4 rounded-full block shadow-sm transform transition-transform duration-200 ${isAnonymous ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
              <span className="text-sm text-slate-600">{isAnonymous ? '익명 사용 중' : `${user.nickname} (으)로 작성`}</span>
            </label>
          </div>

          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl font-bold placeholder:text-slate-300 border-none focus:outline-none focus:ring-0 p-0"
          />

          <textarea
            placeholder="당신의 생각을 자유롭게 펼쳐주세요. (마크다운 지원 예정)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 resize-none text-slate-700 placeholder:text-slate-300 border-none focus:outline-none focus:ring-0 p-0 leading-relaxed"
          />
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 text-slate-500 font-medium hover:bg-slate-100 rounded-lg transition-colors">
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title || !content}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  )
}

const DoranApp = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false)
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [notification, setNotification] = useState<NotificationState | null>(null)

  const showNotification = (message: string, type: NotificationState['type'] = 'success') => {
    setNotification({ message, type })
    window.setTimeout(() => setNotification(null), 3000)
  }

  const handleEmpathy = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newStatus = !post.hasEmpathized
          if (newStatus) showNotification('이 글에 깊이 공감했습니다!', 'purple')
          return {
            ...post,
            empathyCount: post.empathyCount + (newStatus ? 1 : -1),
            hasEmpathized: newStatus,
          }
        }
        return post
      }),
    )
  }

  const handleVote = (postId: number, type: 'up' | 'down') => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          if (type === 'up') {
            return { ...post, upvotes: post.upvotes + 1 }
          }
          return { ...post, downvotes: post.downvotes + 1 }
        }
        return post
      }),
    )
  }

  const handlePostSubmit = ({ title, content, topic, isAnonymous }: { title: string; content: string; topic: string; isAnonymous: boolean }) => {
    const newPost: Post = {
      id: Date.now(),
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
    showNotification('새로운 이야기가 마당에 공유되었습니다.')
  }

  const filteredPosts = activeTab === 'all' ? posts : posts.filter((p) => p.topic === activeTab)

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-slate-900">
      {notification && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-xl z-[110] text-white font-medium flex items-center gap-2 ${
            notification.type === 'purple' ? 'bg-purple-600' : 'bg-slate-800'
          }`}
        >
          {notification.type === 'purple' && <Heart size={18} className="fill-current" />}
          {notification.message}
        </div>
      )}

      <Header activeTab={activeTab} setActiveTab={setActiveTab} setIsWriteModalOpen={setIsWriteModalOpen} user={MOCK_USER} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === topic.id ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {topic.name}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                  <p className="text-slate-400">아직 이 마당에 올라온 이야기가 없습니다.</p>
                  <button onClick={() => setIsWriteModalOpen(true)} className="mt-4 text-indigo-600 font-medium hover:underline">
                    첫 번째 이야기를 들려주세요
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => <PostCard key={post.id} post={post} onEmpathy={handleEmpathy} onVote={handleVote} />)
              )}
            </div>
          </div>

          <Sidebar />
        </div>
      </main>

      <WriteModal isOpen={isWriteModalOpen} onClose={() => setIsWriteModalOpen(false)} onSubmit={handlePostSubmit} topics={TOPICS} user={MOCK_USER} />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-40">
        <button className="flex flex-col items-center text-slate-900 gap-1">
          <Menu size={24} />
          <span className="text-[10px] font-medium">마당</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 gap-1">
          <Search size={24} />
          <span className="text-[10px] font-medium">검색</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 gap-1">
          <User size={24} />
          <span className="text-[10px] font-medium">내 정보</span>
        </button>
      </div>
    </div>
  )
}

export default DoranApp
