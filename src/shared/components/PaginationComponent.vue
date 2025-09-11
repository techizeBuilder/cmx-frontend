
<template>
  <div class="pagination-wrapper">
    <div class="top-bar">
      <label for="itemsPerPage">Items per page:</label>
      <select id="itemsPerPage" v-model="itemsPerPage">
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <span>Showing {{ startItem }} to {{ endItem }} of {{ totalItems }}</span>
    </div>

    <div class="pagination">
      <button @click="goToPage(1)">First</button>
      <button
        v-for="page in visiblePages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <span v-if="shouldShowEllipsis">...</span>
      <button @click="goToPage(totalPages)">{{ totalPages }}</button>
      <button @click="goToPage(totalPages)">Last</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const totalItems = 321
const perPageOptions = [10, 25, 50, 100]
const itemsPerPage = ref(100)
const currentPage = ref(1)

const totalPages = computed(() =>
  Math.ceil(totalItems / itemsPerPage.value)
)

const startItem = computed(() =>
  (currentPage.value - 1) * itemsPerPage.value + 1
)

const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, totalItems)
)

const visiblePages = computed(() => {
  const maxVisible = 4
  const pages = []
  for (let i = 1; i <= Math.min(maxVisible, totalPages.value); i++) {
    pages.push(i)
  }
  return pages
})

const shouldShowEllipsis = computed(() => totalPages.value > 5)

function goToPage(page) {
  currentPage.value = page
}
</script>

<style scoped>
.pagination-wrapper {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 20px;
}

.top-bar label {
  font-size: 14px;
  color: #333;
}

.top-bar select {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: white;
  color: #444;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.pagination button.active {
  background-color: #d1d5db;
  color: #111;
  font-weight: 500;
}

.pagination span {
  padding: 8px 12px;
  color: #888;
}
</style>
