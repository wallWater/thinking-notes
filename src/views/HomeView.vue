<template>
  <div class="page">
    <TheNav />

    <main class="content">
      <div class="column">
        <div class="header">
          <h1 class="page-title">最近的思考</h1>
          <router-link to="/publish" class="write-btn">写下问题</router-link>
        </div>

        <div class="card-list">
          <router-link
            v-for="thought in pageThoughts"
            :key="thought.id"
            :to="`/thought/${thought.id}`"
            class="card"
          >
            <p class="question">{{ thought.question }}</p>
            <div class="meta">
              <span class="en time">{{ timeAgo(thought.createdAt) }}</span>
              <span class="dot">·</span>
              <span class="comment-count">{{ commentCount(thought) }} 条评论</span>
            </div>
          </router-link>

          <p v-if="allThoughts.length === 0" class="empty">还没有想法，写下第一个吧。</p>
        </div>

        <div class="pagination" v-if="totalPages > 1">
          <button class="page-btn" :class="{ disabled: currentPage === 1 }" :disabled="currentPage === 1" @click="currentPage--">上一页</button>
          <button
            v-for="n in totalPages"
            :key="n"
            class="page-num en"
            :class="{ active: currentPage === n }"
            @click="currentPage = n"
          >{{ n }}</button>
          <button class="page-btn" :class="{ disabled: currentPage === totalPages }" :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import TheNav from '../components/TheNav.vue'
import { useThoughts } from '../composables/useThoughts'
import { timeAgo } from '../utils/time'

const { allThoughts, commentCount } = useThoughts()
const PAGE_SIZE = 4
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(allThoughts.value.length / PAGE_SIZE)))
const pageThoughts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return allThoughts.value.slice(start, start + PAGE_SIZE)
})

// 新增想法后自动跳到最后一页，确保能看到
watch(() => allThoughts.value.length, (len, old) => {
  if (len > old) currentPage.value = 1
})
</script>

<style scoped>
.page { min-height: 100vh; background-color: var(--bg); }
.content { padding: 56px 24px; }
.column { max-width: 720px; margin: 0 auto; }

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.page-title { font-size: 20px; font-weight: 700; color: var(--text); }
.write-btn {
  display: inline-block;
  padding: 10px 18px;
  background-color: var(--accent);
  color: var(--on-accent);
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color 0.15s ease;
}
.write-btn:hover { background-color: var(--accent-hover); }

.card-list { display: flex; flex-direction: column; gap: 12px; }
.card {
  display: block;
  padding: 22px;
  background-color: var(--surface);
  border: 1px solid var(--card-border);
  border-radius: 4px;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
.card:hover {
  border-color: var(--text-tertiary);
  background-color: var(--bg);
}
.question {
  font-size: 17px;
  font-weight: 500;
  line-height: 1.65;
  color: var(--text);
  margin-bottom: 12px;
}
.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--text-secondary);
}
.dot { color: var(--text-tertiary); }
.empty { color: var(--text-secondary); font-size: 14px; text-align: center; padding: 40px 0; }

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 28px;
}
.page-btn {
  background: transparent;
  color: var(--accent);
  font-size: 13px;
  padding: 4px 8px;
}
.page-btn.disabled { color: var(--text-tertiary); cursor: default; }
.page-num {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
}
.page-num.active { background-color: var(--accent); color: var(--on-accent); }
.page-num:hover:not(.active) { background-color: var(--divider-soft); }

@media (max-width: 768px) {
  .content { padding: 32px 20px; }
  .header { margin-bottom: 20px; }
}
</style>
