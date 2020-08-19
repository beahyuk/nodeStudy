<template>
  <a-form-model
    ref="dynamicValidateForm"
    :model="dynamicValidateForm"
    v-bind="formItemLayoutWithOutLabel"
  >
    <a-form-model-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :key="index"
      v-bind="index === 0 ? formItemLayout : {}"
      :label="index === 0 ? 'Domains' : ''"
      :prop="'domains.' + index +'.value' "
       :rules="[
        { required: true, message: '白名单不能为空',trigger: 'blur'},
        {validator:ipValidate,trigger:['blur','change']}
      ]"
    >
      <a-input
        v-model="domain.value"
        placeholder="please input domain"
        style="width: 60%; margin-right: 8px"
      ></a-input>
      <a-icon
        v-if="dynamicValidateForm.domains.length > 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="dynamicValidateForm.domains.length === 1"
        @click="removeDomain(domain)"
      ></a-icon>
    </a-form-model-item>
    <a-form-model-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
        <a-icon type="plus" ></a-icon> Add field
      </a-button>
    </a-form-model-item>
    <a-form-model-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')">
        Submit
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('dynamicValidateForm')">
        Reset
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      dynamicValidateForm: {
        domains: [],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const arr = this.dynamicValidateForm.domains.map((item)=>item.value)
          console.log(arr)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    },
    testIP(str){
      const regex = /^(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\-?)\,?)*$/g;
      return regex.test(str) ? true:false
    },
    ipValidate(rule,value,callback){
      if(typeof(value) === "undefined" || value === ""){
        callback()
      }else{
        // console.log(this.testIP(value));
        if(!this.testIP(value)){
          callback(new Error("请输入白名单格式"))
        }else{
          callback()
        }
       
      }
    }
  },
};
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
