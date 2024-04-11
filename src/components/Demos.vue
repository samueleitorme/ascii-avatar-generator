<script setup>
let faces = [";)", ":o", ":v", ":D", ":3", ":P", ":O", ":)", ">.<", "^.^"];
</script>

<template>
  <ul class="demo">
    <li
      class="demo-item"
      v-for="(cabeza, index) of faces"
      :key="index"
      @click="$emit('setAsciiFace', cabeza)"
    >
      {{ cabeza }}
    </li>
  </ul>
</template>

<style scoped>
ul.demo {
  align-items: flex-start;
  display: flex;
  flex-flow: row wrap;
  font-size: 1.5rem;
  gap: 1.5rem;
  justify-content: space-evenly;
  margin: 0;
  padding: 1rem 0;

  li.demo-item {
    background-color: #6f7887;
    border-radius: 0.5rem;
    color: black;
    cursor: pointer;
    display: grid;
    font-family: "Consolas", monospace;
    font-weight: bold;
    height: 4rem;
    list-style-type: none;
    place-items: center;
    width: 4rem;
  }
}
</style>
