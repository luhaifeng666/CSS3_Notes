<template>
  <div class="content">
    <div class="box box1" v-if="type === 'type1'"></div>
    <div class="box box2" v-if="type === 'type2'"></div>
    <div class="box box3" v-if="type === 'type3'"></div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'type1'
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  background #409EFF
  width 100px
  height 100px
  margin 0 auto
  &1
    border 10px solid #67C23A
    border-radius 10px
  &2
    outline 10px solid #67c23a
    border-radius 10px
  &3
    outline 10px solid #67C23A
    border-radius 10px
    box-shadow 0 0 0 4px #67C23A
</style>


