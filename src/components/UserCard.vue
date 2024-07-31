<script setup>

defineProps(['userData'])
defineEmits(['click-avatar'])

</script>

<template>
  <div class="w-80 relative rounded-xl shadow-2xl bg-neutral-50">
    <div class="w-full h-25 absolute z-0 rounded-t-xl bg-blue"></div>

    <div class="text-center">
      <img
        :src="userData.avatar ? userData.avatar : '/avatar.png'"
        alt="avatar"
        @click="$emit('click-avatar')"
        class="w-25 h-25 m-0 m-auto mt-12 rounded-full relative z-1 hover:cursor-pointer"
      >
    </div>

    <div class="text-2xl my-4 text-center">{{ userData.nickname }}</div>

    <div class="flex justify-around text-center">
      <div>
        <div>{{ userData.nUpvote }}</div>
        <div>获赞数</div>
      </div>
      <div>
        <div>{{ userData.nPost }}</div>
        <div>文章数</div>
      </div>
      <div>
        <div>{{ userData.nComment }}</div>
        <div>评论数</div>
      </div>
    </div>

    <slot></slot>

    <div class="h-4"></div>
  </div>

</template>

<style scoped></style>
