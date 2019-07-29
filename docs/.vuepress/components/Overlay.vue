<template>
  <div class="overlay" @click="handleClick" v-show="show">
    <template v-if="img">
      <img :src="img" alt="喵酱">
    </template>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String
    },
    show: {
      type: Boolean
    }
  },
  methods: {
    handleClick() {
      this.$emit('handle');
    }
  }
}
</script>

<style lang="stylus" scoped>
.overlay
  position fixed
  width 100%
  height 100%
  left 0
  top 0
  background rgba(0,0,0,.6)
  z-index 999
  display flex
  justify-content center
  align-items center

  img 
    display block
    width 20%
</style>


