import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';

extend('required', {
...required,
message: 'This field is required'
});

extend('numeric', {
...numeric,
message: 'This field must be numeric'
});

extend('minSuper', {
    validate(value) {
        return value >=10.5;
    },
    message: 'Superannuation should be greater than 10.5'
})

extend('minIncome', {
    validate: value => {
        return value > 0;
    },
    message: 'Income should be greater than 1'
})
extend('numericWithDecimal', {
    validate: value => {
      const numericRegex = /^[0-9.]+$/;
      return numericRegex.test(value);
    },
    message: 'The {_field_} field must contain only numeric characters'
  });
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);