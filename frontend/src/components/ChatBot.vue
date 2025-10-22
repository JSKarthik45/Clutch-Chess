<script setup>
    import { ref, onMounted, nextTick } from 'vue'

    const isOpen = ref(false)
    const unread = ref(1)
    const isSending = ref(false)
    const messages = ref([
        { role: 'assistant', content: 'Hi! How can I help you today?' },
        { role: 'user', content: 'What is Clutch Chess?' },
        { role: 'assistant', content: 'Find Chess Coaching Classes And Software To Extend Learning Even After Classes.' },
    ])
    const newMessage = ref('')
    const inputRef = ref(null)

    const PERPLEXITY_MODEL = 'sonar'
    const API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY

    function toggle() {
        isOpen.value = !isOpen.value
        if (isOpen.value) {
            unread.value = 0
        }
        if (isOpen.value) {
            nextTick(() => {
                inputRef.value?.focus()
            })
        }
    }

    function closePanel() {
        isOpen.value = false
    }

    function toChatMessagesPayload() {
        const raw = [
            {
                "role": "system",
                "content": "You are a helpful assistant. Your answers should only be based on the provided website content below. Do not use any external knowledge or outside information if the query has any words related to the content provided."
            },
            {
                "role": "system",
                "content": "Clutch Chess is a software to find chess coaching classes and to extend learning even after classes. It helps players practice, improve, and enjoy online chess games. Import positions using FEN to continue practice from where left off."
            },
            ...messages.value.slice(1, messages.value.length - 1)
        ];
        console.log(raw)
        return raw;
    }
    async function fetchPerplexityReply() {
        if (!API_KEY) {
            return "AI replies are disabled.";
        }
        const payload = toChatMessagesPayload();

        const res = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: PERPLEXITY_MODEL,
                messages: payload,
                max_tokens: 32,
                temperature: 0.0,
            }),
        })
        if (!res.ok) {
            const errText = await res.text().catch(() => res.statusText)
            throw new Error(`Perplexity error ${res.status}: ${errText}`)
        }
        const data = await res.json()
        return data?.choices?.[0]?.message?.content?.trim() || '(no response)'
    }

    async function onSend() {
        const text = newMessage.value.trim()
        if (!text || isSending.value) {
            return
        }

        messages.value.push({ role: 'user', content: text })
        newMessage.value = ''
        isSending.value = true

        const placeholder = { role: 'assistant', content: '…' }
        messages.value.push(placeholder)
        const idx = messages.value.length - 1

        try {
            const reply = await fetchPerplexityReply()
            messages.value[idx] = { role: 'assistant', content: reply }
        } 
        catch (err) {
            messages.value[idx] = { role: 'assistant', content: "No response" }
            console.log("Error occurred while fetching reply:", err)
        } 
        finally {
            isSending.value = false
        }
    }

    function onKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }

    onMounted(() => {
        setTimeout(() => { 
            if (!isOpen.value) unread.value = 1 
        }, 1500)
    })
</script>

<template>
	<div class="chatbot-root" aria-live="polite">
		<div class="chatbot-panel" :class="{ open: isOpen }" role="dialog" aria-modal="false" aria-label="Chat assistant">
			<div class="chatbot-header">
				<div class="chatbot-title">
					<img src="/images/ClutChess.svg" alt="Bot" class="bot-icon"/>
					<span>
                        Chat Assistant
                    </span>
				</div>
				<div class="chatbot-actions">
					<button class="icon-btn" @click="closePanel" aria-label="Minimize chat">
                        ✕
                    </button>
				</div>
			</div>
			<div class="chatbot-body">
				<div v-for="(m, i) in messages" :key="i" class="message" :class="m.role">
					<div class="bubble">
                        {{ m.content }}
                    </div>
				</div>
			</div>
			<div class="chatbot-footer">
				<input ref="inputRef" class="chat-input" type="text" v-model="newMessage" placeholder="Type a message..." @keydown="onKeydown" :disabled="isSending" >
				<button class="send-btn" @click="onSend" :disabled="isSending">
                    {{ isSending ? 'Sending…' : 'Send' }}
                </button>
			</div>
		</div>
		<button class="chatbot-toggle" :class="{ hidden: isOpen }" @click="toggle" aria-label="Open chat">
			<span class="label">
                Chat
            </span>
			<span v-if="unread" class="badge" aria-label="New message">
                {{ unread }}
            </span>
		</button>
	</div>
</template>

<style scoped>
    .chatbot-root {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 10010; /* above navbar (which uses 10000) */
        pointer-events: none; /* allow clicks only on children */
    }

    .chatbot-panel {
        position: absolute;
        right: 0;
        bottom: 56px; /* default position; when open we dock to bottom */
        width: 340px;
        max-height: 64vh;
        height: 0;
        overflow: hidden;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(6px);
        border: 1px solid rgba(0,0,0,0.12);
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        transition: height 220ms ease, opacity 220ms ease;
        opacity: 0;
        pointer-events: auto;
    }
    .chatbot-panel.open {
        bottom: 0; /* dock to bottom when open */
        height: min(70vh, 560px);
        opacity: 1;
    }

    .chatbot-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(0,0,0,0.08);
        background: #fff;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
    .chatbot-title { display: flex; align-items: center; gap: 8px; font-weight: 600; }
    .bot-icon { width: 20px; height: 20px; }
    .icon-btn { border: none; background: transparent; cursor: pointer; font-size: 16px; line-height: 1; padding: 6px; border-radius: 6px; }
    .icon-btn:hover { background: rgba(0,0,0,0.06); }

    .chatbot-body {
        padding: 12px;
        overflow-y: auto;
        height: calc(100% - 60px - 52px); /* header + footer */
    }
    .message { display: flex; margin: 6px 0; }
    .message.user { justify-content: flex-end; }
    .bubble {
        max-width: 80%;
        padding: 8px 10px;
        border-radius: 10px;
        font-size: 14px;
        line-height: 1.35;
    }
    .message.assistant .bubble { background: #f3f4f6; color: #111827; border-top-left-radius: 4px; }
    .message.user .bubble { background: rgb(115, 149, 82); color: white; border-top-right-radius: 4px; }

    .chatbot-footer {
        display: flex;
        gap: 8px;
        padding: 10px 12px;
        border-top: 1px solid rgba(0,0,0,0.08);
        background: #fff;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }
    .chat-input {
        flex: 1;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 8px;
        padding: 8px 10px;
        font-size: 14px;
    }
    .send-btn {
        background: black;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 12px;
        font-weight: 600;
        cursor: pointer;
    }

    .chatbot-toggle {
        position: absolute;
        right: 0;
        bottom: 0;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: black;
        color: white;
        border: none;
        border-radius: 12px;
        padding: 10px 14px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        pointer-events: auto;
    }
    .chatbot-toggle.hidden { display: none; }
    .chatbot-toggle .badge { background: rgb(115, 149, 82); color: #fff; border-radius: 999px; padding: 2px 8px; font-size: 12px; font-weight: 700; }

    @media (max-width: 600px) {
        .chatbot-panel { width: 94vw; right: 3vw; bottom: 64px; }
        .chatbot-panel.open { bottom: 0; height: min(70vh, 560px); }
        .chatbot-toggle { right: 4vw; }
    }
</style>
