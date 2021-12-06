<template>
  <div class="alert alert-danger">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },

  computed: {
    message() {
      const { statusCode, message } = this.error;

      if (statusCode === 404) return 'Page not found';

      return message;
    },
  }
}
</script>
