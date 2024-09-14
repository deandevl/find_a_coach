<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstNameRef.isValid }">
      <label for="firstname">Firstname</label>
      <input
        id="firstname"
        type="text"
        v-model.trim="firstNameRef.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstNameRef.isValid">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastNameRef.isValid }">
      <label for="lastname">Lastname</label>
      <input
        id="lastname"
        type="text"
        v-model.trim="lastNameRef.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastNameRef.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !descripRef.isValid }">
      <label for="descrip">Description</label>
      <textarea
        id="descrip"
        rows="5"
        v-model.trim="descripRef.val"
        @blur="clearValidity('descrip')"
      ></textarea>
      <p v-if="!descripRef.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rateRef.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        id="rate"
        type="number"
        v-model.number="rateRef.val"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rateRef.isValid">Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areasRef.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          id="frontend"
          type="checkbox"
          value="frontend"
          v-model="areasRef.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          id="backend"
          type="checkbox"
          value="backend"
          v-model="areasRef.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          id="career"
          type="checkbox"
          value="career"
          v-model="areasRef.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areasRef.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValidRef">Please fix the above errors and submit again.</p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';

const firstNameRef = ref({
  val: '',
  isValid: true,
});
const lastNameRef = ref({
  val: '',
  isValid: true,
});
const areasRef = ref({
  val: [],
  isValid: true,
});
const descripRef = ref({
  val: '',
  isValid: true,
});
const rateRef = ref({
  val: null,
  isValid: true,
});
const refs = {
  firstName: firstNameRef,
  lastName: lastNameRef,
  areas: areasRef,
  descrip: descripRef,
  rate: rateRef,
}
const formIsValidRef = ref(true);

const emit = defineEmits(['save-data']);

function clearValidity(input){
 refs[input].value.isValid = true;
}
function validateForm() {
  formIsValidRef.value = true;
  if (firstNameRef.value.val === '') {
    firstNameRef.value.isValid = false;
    formIsValidRef.value = false;
  }
  if (lastNameRef.value.val === '') {
    lastNameRef.value.isValid = false;
    formIsValidRef.value = false;
  }
  if (descripRef.value.val === '') {
    descripRef.value.isValid = false;
    formIsValidRef.value = false;
  }
  if (!rateRef.value.val || rateRef.value.val < 0) {
    rateRef.value.isValid = false;
    formIsValidRef.value = false;
  }
  if (areasRef.value.val.length === 0) {
    areasRef.value.isValid = false;
    formIsValidRef.value = false;
  }
}

function submitForm() {
  validateForm();

  if (!formIsValidRef.value) {
    return;
  }

  const payload = {
    firstName: firstNameRef.value.val,
    lastName: lastNameRef.value.val,
    areas: areasRef.value.val,
    descrip: descripRef.value.val,
    rate: rateRef.value.val,
  };
  emit('save-data', payload);
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
