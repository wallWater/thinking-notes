import { computed, ref } from 'vue'
import { initialThoughts } from '../data/thoughts'

const THOUGHTS_KEY = 'thinking-notes:thoughts'
const COMMENTS_KEY = 'thinking-notes:comments'

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

const localThoughts = ref(load(THOUGHTS_KEY, []))
const localComments = ref(load(COMMENTS_KEY, {}))

// 源码里的想法 + 本机新增的想法，合并后按时间倒序
const allThoughts = computed(() => {
  const map = new Map()
  for (const t of [...localThoughts.value, ...initialThoughts]) {
    if (!map.has(String(t.id))) map.set(String(t.id), t)
  }
  return Array.from(map.values())
    .map((t) => ({
      ...t,
      comments: [...(localComments.value[String(t.id)] || []), ...(t.comments || [])]
    }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

function getThought(id) {
  return allThoughts.value.find((t) => String(t.id) === String(id))
}

function commentCount(thought) {
  return thought.comments ? thought.comments.length : 0
}

function addThought({ question, tags = [], anonymous = false }) {
  const id = `local-${Date.now()}`
  const thought = {
    id,
    question,
    createdAt: new Date().toISOString(),
    tags,
    comments: [],
    anonymous
  }
  localThoughts.value = [thought, ...localThoughts.value]
  save(THOUGHTS_KEY, localThoughts.value)
  return id
}

function addComment(thoughtId, { content, anonymous }) {
  const key = String(thoughtId)
  const comment = {
    id: `c-${Date.now()}`,
    author: anonymous ? '匿名访客' : '我',
    content,
    createdAt: new Date().toISOString(),
    anonymous
  }
  const next = { ...localComments.value, [key]: [comment, ...(localComments.value[key] || [])] }
  localComments.value = next
  save(COMMENTS_KEY, next)
  return comment
}

export function useThoughts() {
  return { allThoughts, getThought, commentCount, addThought, addComment }
}
