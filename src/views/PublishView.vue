<template>
  <div class="page">
    <TheNav />

    <main class="content">
      <div class="column">
        <h1 class="page-title">写下你的问题</h1>
        <p class="subtitle">不用想好措辞，先把此刻的念头留下来。</p>

        <div class="box-wrap">
          <div class="big-box">
            <textarea
              v-model="question"
              placeholder="你正在思考什么？"
              rows="8"
              @keydown.ctrl.enter="submit"
            ></textarea>
          </div>
        </div>

        <div class="bottom-row">
          <label class="anon-toggle">
            <input type="checkbox" v-model="anonymous" />
            <span class="checkbox"><span class="check" v-if="anonymous">✓</span></span>
            <span class="anon-label">匿名发布</span>
          </label>
          <span class="tag-hint">+ 添加标签（可选）</span>
        </div>

        <button class="submit-btn" type="button" @click="submit" :disabled="!question.trim()">提交</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TheNav from '../components/TheNav.vue'
import { useThoughts } from '../composables/useThoughts'

const router = useRouter()
const { addThought } = useThoughts()

const question = ref('')
const anonymous = ref(false)

function submit() {
  const text = question.value.trim()
  if (!text) return
  const id = addThought({ question: text, tags: [], anonymous: anonymous.value })
  question.value = ''
  router.push(`/thought/${id}`)
}
</script>

<style scoped>
.page { min-height: 100vh; background-color: var(--bg); }
.content { padding: 56px 24px; }
.column { max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }

.page-title { font-size: 24px; font-weight: 700; color: var(--text); }
.subtitle { font-size: 13px; color: var(--text-tertiary); margin-bottom: 20px; }

.box-wrap { padding-bottom: 20px; }
.big-box {
  border: 1px solid var(--card-border);
  border-radius: 4px;
  background-color: var(--surface);
  padding: 20px;
  transition: border-color 0.15s ease;
}
.big-box:focus-within { border-color: var(--accent); }
.big-box textarea {
  width: 100%;
  min-height: 220px;
  resize: vertical;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-family: inherit;
  font-size: 16px;
  line-height: 1.7;
}
.big-box textarea::placeholder { color: var(--placeholder); }

.bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0 16px;
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
.tag-hint { font-size: 13px; color: var(--text-tertiary); }

.submit-btn {
  align-self: flex-start;
  padding: 12px 36px;
  background-color: var(--accent);
  color: var(--on-accent);
  font-size: 15px;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color 0.15s ease;
}
.submit-btn:hover:not(:disabled) { background-color: var(--accent-hover); }
.submit-btn:disabled { opacity: 0.5; cursor: default; }

@media (max-width: 768px) {
  .content { padding: 32px 20px; }
}
</style>
