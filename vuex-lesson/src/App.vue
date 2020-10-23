<template>
  <div id="app">
    <!-- {{$store.state.age}} -->
    {{age}}
    {{myAge}}

    {{$store.state.a.age}}
    {{$store.state.b.age}}
    {{$store.state.b.c.age}}
    <!-- {{$store.state.b.d.age}} -->

    <button @click="syncChange">同步更改属性</button>

    <button @click="asyncChange">异步更改属性</button>

  </div>
</template>

<script>
// import { mapMutations, mapActions } from 'vuex'
import { mapState, mapGetters, mapMutations, mapActions } from './vuex'

// console.log(mapState(['age']))   //  返回的是 {age: fn}

export default {
  name:'app',
  computed: {
    ...mapState(['age']),
    ...mapGetters(['myAge'])
    // age(){
    //   return this.$store.state.age
    // }
  },
  methods: {
    ...mapMutations({aaa:'syncChange'}),
    ...mapActions({bbb:'asyncChange'}),
    syncChange(){
      this.aaa(10)
    },
    asyncChange(){
      // this.$store.dispatch('asyncChange', 5)
      this.bbb(5)
    }
  },
  mounted() {
    // console.log(this.$store)
  },
}
</script>

<style>
</style>
