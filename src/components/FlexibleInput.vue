<template>
  <div class="flex flex-col gap-1">
    <!-- Label -->
    <label v-if="label" :class="['text-sm font-medium px-3', labelClass]">
      {{ label }}
    </label>
    
    <!-- Wrapper -->
    <div :class="['flex items-center border rounded-lg px-3 m-2', wrapperClass]">
      <!-- Textarea -->
      <textarea
        v-if="type === 'textarea'"
        v-model="modelValue"
        :placeholder="placeholder"
        :class="[baseInputClass, height]"
      ></textarea>

      <!-- Input -->
      <input
        v-else-if="type === 'input' || type === 'date'"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :class="[baseInputClass, height]"
      />

      <!-- Select -->
      <select
        v-else-if="type === 'select'"
        v-model="modelValue"
        :class="[baseInputClass, height]"
      >
        <option v-for="(option, index) in options" :key="index" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  label: String, // Flexible value
  labelClass: {
    type: String,
    default: "text-gray-700",
  },
  type: {
    type: String,
    default: "input",
    validator: (value) => ["input", "select", "textarea", "date"].includes(value),
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Enter value...",
  },
  width: {
    type: String,
    default: "w-full",
  },
  height: {
    type: String,
    default: "h-12", // Default height for input/select
  },
  textareaHeight: {
    type: String,
    default: "h-32", // Larger height for textarea
  },
  wrapperClass: {
    type: String,
    default: "border-gray-300 focus-within:border-blue-500",
  },
  inputClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const height = computed(() => (props.type === "textarea" ? props.textareaHeight : props.height));

// Base input class to maintain uniform styling
const baseInputClass = computed(() => 
  "w-full outline-none bg-transparent"
);
</script>
