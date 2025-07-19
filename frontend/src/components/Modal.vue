<script setup>
    const props = defineProps({
        title: String, 
    })
</script>
<template>
    <div class = "modal fade">
        <div class = "modal-dialog">
            <div class = "modal-content px-2">
                <div class = "modal-header">
                    <h3 class="modal-title fs-5">
                        {{ props.title }}
                    </h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class = "modal-body">
                    <slot/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
