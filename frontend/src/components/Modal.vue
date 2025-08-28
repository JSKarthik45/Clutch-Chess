<script setup>
    const props = defineProps({
        route: Object, 
    });
    let title = {
        "/": ["Game Settings (Stockfish)", {"colour": "W", "time": 3, "increment": 0, "level": "I"}], 
        "/bot": ["Game Settings (Stockfish)", {"colour": "W", "time": 3, "increment": 0, "level": "I"}], 
        "/play": ["Game Settings", {"colour": "W", "time": 3, "increment": 0, "roomNo": "", "action": ""}], 
        "/openings": ["Select Opening", {}], 
        "/practice": ["FEN", {"fen": ""}],
    }

import { Modal } from "bootstrap";
    import {computed, onMounted, onBeforeUnmount} from "vue";
    const modalId = computed(() => {
        return (props.route.path?.slice(1)) || 'root';
    });
    const returnObj = computed(() => {
        return title[props.route.path][1];
    })

    const emit = defineEmits(['bot', 'play', 'opening', 'practice', "root"]);
    const emitFn = (action = '') => {
        if (props.route.path === '/play') {
            if (action === 'create') {
                const generateRoomNo = () => {
                    return Math.floor(100000 + Math.random() * 900000).toString();
                };
                // Just generate once here, uniqueness check done in parent
                returnObj.value.roomNo = generateRoomNo();
                returnObj.value.action = 'create';
            } else if (action === 'join') {
                returnObj.value.action = 'join';
            }
        }
        emit(modalId.value, returnObj.value)
    }

    onMounted(() => {
        let modal = document.getElementById(modalId.value);
        let modalObj = new Modal(modal);
        setTimeout(() => {
            modalObj.show();
        }, 1000);
    })

onBeforeUnmount(() => {
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
  modalBackdrops.forEach((backdrop) => backdrop.remove());

  // Remove modal-open class and padding-right style from body
  document.body.classList.remove('modal-open');
  document.body.style.removeProperty('padding-right');
  const modalElement = document.getElementById(modalId.value); // Your modal id
  if (modalElement) {
    const modalInstance = Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
});

</script>
<template>
    <div class = "modal fade" :id = "modalId" v-if = "props.route.path != '/play'">
        <div class = "modal-dialog">
            <div class = "modal-content px-2">
                <div class = "modal-header">
                    <h3 class="modal-title fs-5">
                        {{ title[props.route.path][0] }}
                    </h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class = "modal-body">
                    <div v-if = "props.route.path === '/bot' || props.route.path === '/'">
                        <div class = "text-center">
                            <h5 class = "d-inline">
                                Colour
                            </h5>
                            &nbsp;
                            <div class = "d-inline">
                                <input type = "radio" name = "colour" id = "colour1" class = "form-check-input" value = "W" v-model= "returnObj['colour']" checked>
                                <label for = "colour1" class = "form-check-label ms-1">
                                    White
                                </label>
                                &nbsp;
                                <input type = "radio" name = "colour" id = "colour2" class = "form-check-input" value = "B" v-model= "returnObj['colour']">
                                <label for = "colour2" class = "form-check-label ms-1">
                                    Black
                                </label>
                            </div>
                        </div>
                        <br/>
                        <div class = "text-center">
                            <h5 class = "d-inline">
                                Time 
                            </h5>
                            <input type = "number" placeholder = "In Minutes" v-model= "returnObj['time']"/>
                        </div>
                        <br/>
                        <div class = "text-center">
                            <h5 class = "d-inline">
                                Increment
                            </h5>
                            <input type = "number" placeholder = "In Seconds" v-model= "returnObj['increment']"/>
                        </div>
                        <br/>
                        <div class = "text-center">
                            <h5 class = "d-inline">
                                Bot Level
                            </h5>
                            &nbsp;
                            <div class = "d-inline">
                                <input type = "radio" name = "level" id = "level1" class = "form-check-input" checked value = "I" v-model= "returnObj['level']">
                                <label for = "level1" class = "form-check-label ms-1">
                                    Intermediate
                                </label>
                                &nbsp;
                                <input type = "radio" name = "level" id = "level2" class = "form-check-input" value = "A" v-model= "returnObj['level']">
                                <label for = "level2" class = "form-check-label ms-1">
                                    Advanced
                                </label>
                                &nbsp;
                                <input type = "radio" name = "level" id = "level3" class = "form-check-input" value = "E" v-model= "returnObj['level']">
                                <label for = "level3" class = "form-check-label ms-1">
                                    Expert
                                </label>
                            </div>
                        </div>
                    </div>
                    <div v-else-if = "props.route.path === '/openings'">

                    </div>
                    <div v-else-if = "props.route.path === '/practice'">
                        <div class = "text-center">
                            <h5 class = "d-inline">
                                Enter FEN
                            </h5>
                            <input type = "text" v-model= "returnObj['fen']"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click = "emitFn" data-bs-dismiss="modal">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class = "modal fade" :id = "modalId" v-else>
        <div class = "modal-dialog">
            <div class = "modal-content px-2">
                <div class = "modal-header">
                    <h3 class="modal-title fs-5">
                        Actions
                    </h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class = "modal-body">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#createRoom">
                        Create Room
                    </button>
                    &nbsp;
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#joinRoom">
                        Join Room
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class = "modal fade" id = "createRoom">
        <div class = "modal-dialog">
            <div class = "modal-content px-2">
                <div class = "modal-header">
                    <h3 class="modal-title fs-5">
                        Room Settings
                    </h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class = "modal-body">
                    <div class = "text-center">
                        <h5 class = "d-inline">
                            Colour
                        </h5>
                        &nbsp;
                        <div class = "d-inline">
                            <input type = "radio" name = "colour" id = "colour1" class = "form-check-input" checked value = "W" v-model= "returnObj['colour']">
                            <label for = "colour1" class = "form-check-label ms-1">
                                White
                            </label>
                            &nbsp;
                            <input type = "radio" name = "colour" id = "colour2" class = "form-check-input" value = "B" v-model= "returnObj['colour']">
                            <label for = "colour2" class = "form-check-label ms-1">
                                Black
                            </label>
                        </div>
                    </div>
                    <br/>
                    <div class = "text-center">
                        <h5 class = "d-inline">
                            Time 
                        </h5>
                        <input type = "number" placeholder = "In Minutes" v-model= "returnObj['time']"/>
                    </div>
                    <br/>
                    <div class = "text-center">
                        <h5 class = "d-inline">
                            Increment
                        </h5>
                        <input type = "number" placeholder = "In Seconds" v-model= "returnObj['increment']"/>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click = "emitFn('create')" data-bs-dismiss="modal">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class = "modal fade" id = "joinRoom">
        <div class = "modal-dialog">
            <div class = "modal-content px-2">
                <div class = "modal-header">
                    <h3 class="modal-title fs-5">
                        Join Room
                    </h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class = "modal-body">
                    <div class = "text-center">
                        <h5 class = "d-inline">
                            Room No.
                        </h5>
                        <input type = "text" v-model= "returnObj['roomNo']"/>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click = "emitFn('join')" data-bs-dismiss="modal">
                        Join
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
    @media(min-width: 575px) {
    .modal-dialog {
  position: absolute;
  top: 20vh;
  right: 10px;
}
.modal.fade .modal-dialog {
  transform: translateX(50px);
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.modal.fade.show .modal-dialog {
  transform: translateX(0);
  opacity: 1;
}
    }


    @media (max-width: 575px) {
  .modal-dialog {
  position: absolute;
  bottom: 0px;
  left: 0;
    right: 0;
  margin-left: auto;
    margin-right: auto;
    width: 90%
}
.modal.fade .modal-dialog {
  transform: translateY(50px);
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.modal.fade.show .modal-dialog {
  transform: translateY(0);
  opacity: 1;
}
    }
</style>
