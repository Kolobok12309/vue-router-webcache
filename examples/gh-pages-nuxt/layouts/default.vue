<template>
  <div class="container py-5">
    <h1 class="">
      Vue-router-webcache example page
    </h1>

    <div
      v-show="isCache"
      class="alert alert-primary"
    >
      You see this page from "{{ cacheName }}" cache
    </div>

    <p>
      This example show <i>vue-router</i> bug in caches.
      You can try open Webcache link of <i>vue-router</i>
      <a
        href="http://webcache.googleusercontent.com/search?q=cache:https://router.vuejs.org/"
        target="_blank"
      >
        main page
      </a>,
      open console and try click on some links.
      As second example you can click on links like
      <a
        href="https://webcache.googleusercontent.com/search?q=cache:https://kolobok12309.github.io/vue-router-webcache/"
        target="_blank"
      >
        this
      </a>
      and repeat previous steps
    </p>

    <h3>
      Internal site links
    </h3>

    <div class="row my-3">
      <div class="col-auto">
        <NuxtLink to="/">
          Index
        </NuxtLink>
      </div>

      <div class="col-auto">
        <NuxtLink  to="/about">
          About
        </NuxtLink>
      </div>
    </div>

    <h3>
      Webcache links
    </h3>

    <div class="row my-3">
      <div class="col-auto">
        <a
          href="https://webcache.googleusercontent.com/search?q=cache:https://kolobok12309.github.io/vue-router-webcache/"
          target="_blank"
        >
          Index
        </a>
      </div>

      <div class="col-auto">
        <a
          href="https://webcache.googleusercontent.com/search?q=cache:https://kolobok12309.github.io/vue-router-webcache/about"
          target="_blank"
        >
          About
        </a>
      </div>
    </div>

    <h3>
      VueRouter links
    </h3>

    <div class="row my-3">
      <div class="col-auto">
        <a
          href="https://router.vuejs.org/"
          target="_blank"
        >
          Original
        </a>
      </div>

      <div class="col-auto">
        <a
          href="http://webcache.googleusercontent.com/search?q=cache:https://router.vuejs.org/"
          target="_blank"
        >
          Webcache
        </a>
      </div>
    </div>

    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    isCache() {
      return this.$router.isCache;
    },

    cacheName() {
      if (!this.isCache) return null;

      const { hostname } = this.$router.cache;

      return hostname;
    },
  },
};
</script>
