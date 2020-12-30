<template>
  <div class="index-container">
      {{msg}}
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
      return {
          msg: "你好啊"
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
