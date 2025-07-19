<script setup>
    const props = defineProps({
        message: String,
    });
</script>

<template>
    <div class = "toast position-fixed bottom-0 end-0 bg-secondary p-1 m-2 margin" id = "toast">
        <div class = "toast-header">
            <strong class = "me-auto">
                {{ message }}
            </strong>
            <button type = "button" class = "btn-close" data-bs-dismiss = "toast"></button>
        </div>
    </div>
</template>

<style scoped>
</style>