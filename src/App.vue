<script setup>
import { ref } from "vue";

const persons = ref([
  { id: 1, name: "John", age: 35 },
  { id: 2, name: "Jane", age: 33 },
  { id: 3, name: "Helen", age: 31 },
  { id: 4, name: "Peter", age: 40 },
]);

const showList = ref(false);
const showDetails = ref(false);
const color = ref('#000000');
</script>

<template>
  <h1>Persons</h1>

  <button type="button" @click="showList = !showList">
    {{ showList ? "Hide" : "Show" }} All
  </button>

  <div v-if="showList">
    <ol>
      <li v-for="person in persons" :key="person.id">
        {{ person.name }}
        <span v-show="showDetails">({{ person.age }} years)</span>
      </li>
    </ol>

    <div class="settings">
      <span>Color</span>
      <input type="color" v-model="color" />

      <button type="button" @click="showDetails = !showDetails">
        {{ showDetails ? "Hide" : "Show" }} details
      </button>
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  gap: 10px;
}

li:hover {
  color: v-bind(color);
}
</style>
