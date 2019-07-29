<template>
  <div>
    <div class="box box1" v-if="type === 'demo1'" @click="show = !show">
      <slot></slot>
    </div>
    <div class="box box2" v-if="type === 'demo2'">
      <span>border-box</span>
      <div class="padding-box">
        <span>padding-box</span>
        <div class="content-box">
          <span>content-box</span>
        </div>
      </div>
    </div>
    <Overlay :img="'/Notes/assets/img/orange.5e58830e.jpeg'" :show="show" @handle="handle"></Overlay>
  </div>
</template>

<script>
import Overlay from './Overlay.vue'
export default {
  components: {
    Overlay
  },
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    handle() {
      this.show = false;
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  width 200px
  height 200px
  border-radius 8px
  display flex
  justify-content center
  align-items center
  color #ffffff
  font-size 14px
  margin 0 auto
  cursor pointer

  &1 
    background url(../public/images/orange.jpeg) no-repeat top 10px left 10px / 30%
    background-color #409EFF

  &2
    background-color #67C23A
    position relative
    span {
      position absolute
      left 3px
      top 3px
      font-size 12px
    }
    > .padding-box
      position relative
      background #E6A23C
      width 150px
      height 150px
      display flex
      justify-content center
      align-items center

      > .content-box
        position relative
        background #F56C6C
        width 100px
        height 100px
        display flex
        justify-content center
        align-items center
</style>


