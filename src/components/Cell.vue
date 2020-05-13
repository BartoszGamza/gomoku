<template>
  <div class="cell" @click="selected">
    <div v-if="isFilled" :class="classes"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    selected () {
      this.$emit('selected')
    }
  },
  computed: {
    isFilled () {
      return this.value !== ''
    },
    classes () {
      return {
        'cell__circle': true,
        'cell__circle--white': this.value === 'W',
        'cell__circle--black': this.value === 'B'
      }
    }
  }
}
</script>

<style>
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
}

.cell__circle {
  width: 100%;
  height: 100%;
  border-radius: 25px;
}

.cell__circle--white {
  background-color: gray;
}

.cell__circle--black {
  background-color: black;
}
</style>
