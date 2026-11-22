<template>
  <div class="page">
    <TheNav />

    <main class="content">
      <div class="column">
        <template v-if="thought">
          <div class="question-block">
            <h1 class="question-title">{{ thought.question }}</h1>
            <p class="meta en">{{ timeAgo(thought.createdAt) }} &nbsp;·&nbsp; {{ commentCount(thought) }} 条评论</p>
          </div>

          <div class="section-divider"></div>

          <h2 class="comments-title">评论 · {{ commentCount(thought) }}</h2>

          <!-- 评论输入框在列表最上方 -->
          <section class="comment-input-section">
            <div class="input-box">
              <textarea
                v-model="draft"
                placeholder="写下你的想法…"
                rows="3"
                @keydown.ctrl.enter="submitComment"
              ></textarea>
            </div>
            <div class="input-bottom">
              <label class="anon-toggle">
                <input type="checkbox" v-model="anonymous" />
                <span class="checkbox"><span class="check" v-if="anonymous">✓</span></span>
                <span class="anon-label">匿名发布</span>
              </label>
              <button class="submit-btn" type="button" @click="submitComment" :disabled="!draft.trim()">发表评论</button>
            </div>
          </section>

          <!-- 评论列表 -->
          <div class="comment-list">
            <article v-for="c in thought.comments" :key="c.id" class="comment">
              <div class="comment-meta">
                <span class="author">{{ c.author }}</span>
                <span class="time en">{{ timeAgo(c.createdAt) }}</span>
              </div>
              <p class="comment-text">{{ c.content }}</p>
            </article>
            <p v-if="thought.comments.length === 0" class="no-comments">还没有评论，来说点什么吧。</p>
          </div>

          <router-link to="/" class="back">← 返回列表</router-link>
        </template>

        <template v-else>
          <p class="not-found">这条思考不存在或已被删除。<router-link to="/">返回首页</router-link></p>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import TheNav from '../components/TheNav.vue'
import { useThoughts } from '../composables/useThoughts'
import { timeAgo } from '../utils/time'

const route = useRoute()
const { getThought, commentCount, addComment } = useThoughts()

const thought = computed(() => getThought(route.params.id))
const draft = ref('')
const anonymous = ref(false)

function submitComment() {
  const content = draft.value.trim()
  if (!content || !thought.value) return
  addComment(thought.value.id, { content, anonymous: anonymous.value })
  draft.value = ''
}
</script>

<style scoped>
.page { min-height: 100vh; background-color: var(--bg); }
.content { padding: 56px 24px 80px; }
.column { max-width: 720px; margin: 0 auto; }

.question-block { display: flex; flex-direction: column; gap: 14px; }
.question-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--text);
  word-break: break-word;
}
.meta { font-size: 13px; color: var(--text-secondary); }

.section-divider { height: 1px; background-color: var(--divider); margin: 28px 0; }
.comments-title { font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 16px; }

.comment-input-section { display: flex; flex-direction: column; gap: 12px; padding-bottom: 28px; }
.input-box {
  border: 1px solid var(--card-border);
  border-radius: 4px;
  background-color: var(--surface);
  padding: 14px;
}
.input-box textarea {
  width: 100%;
  min-height: 66px;
  resize: vertical;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.7;
}
.input-box textarea::placeholder { color: var(--placeholder); }
.input-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.anon-toggle { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.anon-toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
.checkbox {
  width: 16px; height: 16px;
  border: 1px solid var(--checkbox-border);
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--surface);
}
.anon-toggle input:checked + .checkbox { background-color: var(--accent); border-color: var(--accent); }
.check { color: var(--on-accent); font-size: 12px; line-height: 1; }
.anon-label { font-size: 13px; color: var(--text-secondary); }
.submit-btn {
  padding: 9px 20px;
  background-color: var(--accent);
  color: var(--on-accent);
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color 0.15s ease;
}
.submit-btn:hover:not(:disabled) { background-color: var(--accent-hover); }
.submit-btn:disabled { opacity: 0.5; cursor: default; }

.comment-list { display: flex; flex-direction: column; }
.comment { padding: 20px 0; border-bottom: 1px solid var(--divider-soft); }
.comment:last-child { border-bottom: none; }
.comment-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.author { font-size: 13px; font-weight: 500; color: var(--text); }
.time { font-size: 12px; color: var(--text-tertiary); }
.comment-text { font-size: 14px; line-height: 1.7; color: var(--text); word-break: break-word; }
.no-comments { color: var(--text-secondary); font-size: 14px; padding: 24px 0; }

.back { display: inline-block; margin-top: 32px; font-size: 13px; color: var(--text-secondary); }
.back:hover { color: var(--accent); }
.not-found { color: var(--text-secondary); font-size: 15px; }
.not-found a { color: var(--accent); margin-left: 8px; }

@media (max-width: 768px) {
  .content { padding: 32px 20px 60px; }
  .question-title { font-size: 26px; }
}
</style>
