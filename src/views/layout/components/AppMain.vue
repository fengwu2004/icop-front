<template>
  <section class="app-main" style="min-height: 100%">
    <navbar></navbar>
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import { default as Navbar } from './Navbar'

  export default {
    name: 'AppMain',
    components: { Navbar },
  }
</script>
